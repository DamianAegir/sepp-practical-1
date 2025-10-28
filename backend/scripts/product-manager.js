import { PrismaClient } from '../node_modules/@prisma/client/index.js';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';
import mime from 'mime-types';

const prisma = new PrismaClient();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to prompt for input
const prompt = (question) => new Promise((resolve) => rl.question(question, resolve));

// Helper function to generate a random filename
const generateFilename = (originalName) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  const extension = path.extname(originalName);
  return `${timestamp}-${randomString}${extension}`;
};

// Function to get all available images from public/images directory
const getAvailableImages = () => {
  const imagesDir = path.join(process.cwd(), '..', 'public', 'images');
  try {
    const files = fs.readdirSync(imagesDir);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return [];
  }
};

// Function to optimize and copy image to uploads directory
const processImage = async (imagePath, targetDir) => {
  try {
    const filename = generateFilename(path.basename(imagePath));
    const targetPath = path.join(targetDir, filename);
    
    // Ensure uploads directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Optimize image using Sharp
    await sharp(imagePath)
      .resize(800, 600, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality: 85 })
      .toFile(targetPath);
    
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Error processing image:', error);
    return null;
  }
};

// Function to automatically assign images to products
const autoAssignImages = async (productId, productName, category) => {
  const availableImages = getAvailableImages();
  const imagesDir = path.join(process.cwd(), '..', 'public', 'images');
  const uploadsDir = path.join(process.cwd(), '..', 'backend', 'uploads');
  
  if (availableImages.length === 0) {
    console.log('No images available for auto-assignment.');
    return [];
  }
  
  // Simple logic to assign images based on category or random selection
  let selectedImages = [];
  
  // For demo purposes, we'll assign 1-3 random images
  const numImages = Math.min(Math.floor(Math.random() * 3) + 1, availableImages.length);
  const shuffled = availableImages.sort(() => 0.5 - Math.random());
  selectedImages = shuffled.slice(0, numImages);
  
  const processedImages = [];
  
  for (const imageName of selectedImages) {
    const imagePath = path.join(imagesDir, imageName);
    const processedUrl = await processImage(imagePath, uploadsDir);
    
    if (processedUrl) {
      try {
        const productImage = await prisma.productImage.create({
          data: {
            productId,
            url: processedUrl,
            alt: `${productName} - Product Image`
          }
        });
        processedImages.push(productImage);
        console.log(`✓ Added image: ${processedUrl}`);
      } catch (error) {
        console.error('Error saving image to database:', error);
      }
    }
  }
  
  return processedImages;
};

// Function to authenticate admin
async function authenticateAdmin() {
  console.log('=== Admin Authentication ===');
  const email = await prompt('Email: ');
  const password = await prompt('Password: ');

  try {
    // In a real app, you would verify the password with bcrypt
    // For this demo, we'll just check if an admin with this email exists
    const admin = await prisma.user.findFirst({
      where: {
        email,
        role: 'ADMIN'
      }
    });

    if (!admin) {
      console.log('Authentication failed. Please make sure you have admin privileges.');
      return null;
    }

    console.log(`Welcome, ${admin.name}!`);
    return admin;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

// Function to add a new product
async function addProduct(adminId) {
  console.log('\n=== Add New Product ===');
  
  try {
    // Get product details
    const name = await prompt('Product Name: ');
    const description = await prompt('Description: ');
    const price = parseFloat(await prompt('Price: '));
    
    // Get category
    console.log('\nAvailable Categories:');
    console.log('1. ELECTRONICS');
    console.log('2. CLOTHING');
    console.log('3. BOOKS');
    console.log('4. HOME');
    console.log('5. SPORTS');
    console.log('6. OTHER');
    
    const categoryChoice = parseInt(await prompt('Select Category (1-6): '));
    const categories = ['ELECTRONICS', 'CLOTHING', 'BOOKS', 'HOME', 'SPORTS', 'OTHER'];
    const category = categories[categoryChoice - 1] || 'OTHER';
    
    const brand = await prompt('Brand (optional): ');
    const stock = parseInt(await prompt('Stock Quantity: '));
    
    // Create the product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        brand: brand || null,
        stock,
        createdBy: adminId,
      }
    });
    
    // Ask for image handling preference
    console.log('\n=== Image Options ===');
    console.log('1. Auto-assign images from available collection');
    console.log('2. Manually add image URL');
    console.log('3. Skip images');
    
    const imageChoice = await prompt('Select option (1-3): ');
    
    switch (imageChoice) {
      case '1':
        console.log('\n🔄 Auto-assigning images...');
        const assignedImages = await autoAssignImages(product.id, product.name, category);
        console.log(`✅ Successfully assigned ${assignedImages.length} images to the product.`);
        break;
        
      case '2':
        const imageUrl = await prompt('Image URL: ');
        const imageAlt = await prompt('Image Alt Text: ');
        
        await prisma.productImage.create({
          data: {
            productId: product.id,
            url: imageUrl,
            alt: imageAlt
          }
        });
        console.log('✅ Image added successfully.');
        break;
        
      case '3':
        console.log('⏭️ Skipping images.');
        break;
        
      default:
        console.log('Invalid choice. Skipping images.');
    }
    
    console.log(`\n🎉 Product "${name}" added successfully with ID: ${product.id}`);
    return product;
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
}

// Function to bulk add products with auto-assigned images
async function bulkAddProducts(adminId) {
  console.log('\n=== Bulk Add Products with Auto Images ===');
  
  const numProducts = parseInt(await prompt('How many products to add? '));
  
  if (isNaN(numProducts) || numProducts <= 0) {
    console.log('Invalid number. Please enter a positive number.');
    return;
  }
  
  const categories = ['ELECTRONICS', 'CLOTHING', 'BOOKS', 'HOME', 'SPORTS', 'OTHER'];
  const sampleProducts = [
    { name: 'Wireless Headphones', description: 'High-quality wireless headphones with noise cancellation', price: 199.99, category: 'ELECTRONICS' },
    { name: 'Cotton T-Shirt', description: 'Comfortable 100% cotton t-shirt', price: 29.99, category: 'CLOTHING' },
    { name: 'Programming Book', description: 'Learn modern programming techniques', price: 49.99, category: 'BOOKS' },
    { name: 'Coffee Mug', description: 'Ceramic coffee mug with elegant design', price: 15.99, category: 'HOME' },
    { name: 'Yoga Mat', description: 'Non-slip yoga mat for all fitness levels', price: 39.99, category: 'SPORTS' },
    { name: 'Desk Organizer', description: 'Keep your workspace tidy', price: 24.99, category: 'OTHER' }
  ];
  
  console.log('\n🔄 Creating products with auto-assigned images...\n');
  
  for (let i = 0; i < numProducts; i++) {
    const productTemplate = sampleProducts[i % sampleProducts.length];
    const productName = `${productTemplate.name} ${i + 1}`;
    
    try {
      // Create product
      const product = await prisma.product.create({
        data: {
          name: productName,
          description: productTemplate.description,
          price: productTemplate.price + (Math.random() * 20 - 10), // Add some price variation
          category: productTemplate.category,
          brand: `Brand ${String.fromCharCode(65 + (i % 26))}`, // Generate brand names A, B, C, etc.
          stock: Math.floor(Math.random() * 100) + 10,
          createdBy: adminId,
        }
      });
      
      // Auto-assign images
      const assignedImages = await autoAssignImages(product.id, product.name, product.category);
      
      console.log(`✅ Created "${productName}" with ${assignedImages.length} images`);
      
      // Small delay to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Error creating product ${i + 1}:`, error);
    }
  }
  
  console.log(`\n🎉 Bulk creation completed! Attempted to create ${numProducts} products.`);
}

// Function to list all products
async function listProducts() {
  console.log('\n=== Product List ===');
  
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        creator: {
          select: {
            name: true
          }
        }
      }
    });
    
    if (products.length === 0) {
      console.log('No products found.');
      return;
    }
    
    products.forEach(product => {
      console.log(`\nID: ${product.id}`);
      console.log(`Name: ${product.name}`);
      console.log(`Category: ${product.category}`);
      console.log(`Price: $${product.price}`);
      console.log(`Stock: ${product.stock}`);
      console.log(`Created By: ${product.creator.name}`);
      console.log(`Images: ${product.images.length > 0 ? product.images.map(img => img.url).join(', ') : 'None'}`);
    });
  } catch (error) {
    console.error('Error listing products:', error);
  }
}

// Main function
async function main() {
  console.log('=== Product Management System ===');
  
  // Authenticate admin
  const admin = await authenticateAdmin();
  if (!admin) {
    rl.close();
    await prisma.$disconnect();
    return;
  }
  
  let running = true;
  
  while (running) {
    console.log('\n=== Menu ===');
    console.log('1. Add New Product');
    console.log('2. Bulk Add Products with Auto Images');
    console.log('3. List All Products');
    console.log('4. Show Available Images');
    console.log('5. Exit');
    
    const choice = await prompt('Select an option (1-5): ');
    
    switch (choice) {
      case '1':
        await addProduct(admin.id);
        break;
      case '2':
        await bulkAddProducts(admin.id);
        break;
      case '3':
        await listProducts();
        break;
      case '4':
        await showAvailableImages();
        break;
      case '5':
        running = false;
        console.log('Exiting...');
        break;
      default:
        console.log('Invalid option. Please try again.');
    }
  }
  
  rl.close();
  await prisma.$disconnect();
}

// Function to show available images
async function showAvailableImages() {
  console.log('\n=== Available Images ===');
  
  const availableImages = getAvailableImages();
  
  if (availableImages.length === 0) {
    console.log('No images found in the public/images directory.');
    return;
  }
  
  console.log(`Found ${availableImages.length} images:`);
  availableImages.forEach((image, index) => {
    console.log(`${index + 1}. ${image}`);
  });
}

// Run the program
main().catch(e => {
  console.error(e);
  process.exit(1);
});