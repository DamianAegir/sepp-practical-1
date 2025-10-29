import { PrismaClient } from '../node_modules/@prisma/client/index.js';

const prisma = new PrismaClient();

// Sports Shoes Products
const sportsShoes = [
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max technology for superior cushioning and style.",
    price: 150.00,
    category: "SPORTS",
    brand: "Nike",
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Adidas Ultraboost 22",
    description: "Premium running shoes with Boost midsole technology for energy return.",
    price: 180.00,
    category: "SPORTS",
    brand: "Adidas",
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Puma RS-X Sneakers",
    description: "Retro-inspired sneakers with bold design and comfortable cushioning.",
    price: 110.00,
    category: "SPORTS",
    brand: "Puma",
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "New Balance 990v5",
    description: "Classic American-made sneakers with premium materials and comfort.",
    price: 175.00,
    category: "SPORTS",
    brand: "New Balance",
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Jordan Air Jordan 1",
    description: "Iconic basketball shoes with classic design and premium leather construction.",
    price: 170.00,
    category: "SPORTS",
    brand: "Jordan",
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Converse Chuck Taylor All Star",
    description: "Classic canvas sneakers with timeless design and versatile style.",
    price: 65.00,
    category: "SPORTS",
    brand: "Converse",
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Vans Old Skool",
    description: "Skateboarding shoes with durable construction and iconic side stripe.",
    price: 60.00,
    category: "SPORTS",
    brand: "Vans",
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Reebok Classic Leather",
    description: "Retro leather sneakers with clean lines and comfortable fit.",
    price: 75.00,
    category: "SPORTS",
    brand: "Reebok",
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Under Armour HOVR Phantom",
    description: "Connected running shoes with energy return and smart coaching features.",
    price: 140.00,
    category: "SPORTS",
    brand: "Under Armour",
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1544966503-7ad5ac882d5d?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "ASICS Gel-Kayano 28",
    description: "Stability running shoes with gel cushioning and support for overpronation.",
    price: 160.00,
    category: "SPORTS",
    brand: "ASICS",
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop&q=80"
    ]
  }
];

// Electronics products
const electronics = [
  {
    name: "iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.",
    price: 999.00,
    category: "ELECTRONICS",
    brand: "Apple",
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Premium Android smartphone with S Pen, 200MP camera, and AI features.",
    price: 1199.00,
    category: "ELECTRONICS",
    brand: "Samsung",
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "MacBook Air M3",
    description: "Ultra-thin laptop with M3 chip, 18-hour battery life, and Liquid Retina display.",
    price: 1099.00,
    category: "ELECTRONICS",
    brand: "Apple",
    stock: 10,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Sony WH-1000XM5",
    description: "Premium noise-canceling headphones with 30-hour battery and superior sound quality.",
    price: 399.00,
    category: "ELECTRONICS",
    brand: "Sony",
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "iPad Pro 12.9-inch",
    description: "Professional tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
    price: 1099.00,
    category: "ELECTRONICS",
    brand: "Apple",
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Nintendo Switch OLED",
    description: "Portable gaming console with vibrant OLED screen and enhanced audio.",
    price: 349.00,
    category: "ELECTRONICS",
    brand: "Nintendo",
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Dell XPS 13",
    description: "Premium ultrabook with Intel Core i7, 13.4-inch InfinityEdge display.",
    price: 1299.00,
    category: "ELECTRONICS",
    brand: "Dell",
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Canon EOS R6 Mark II",
    description: "Full-frame mirrorless camera with 24.2MP sensor and advanced autofocus.",
    price: 2499.00,
    category: "ELECTRONICS",
    brand: "Canon",
    stock: 5,
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Apple Watch Series 9",
    description: "Advanced smartwatch with health monitoring, GPS, and cellular connectivity.",
    price: 399.00,
    category: "ELECTRONICS",
    brand: "Apple",
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Bose QuietComfort Earbuds",
    description: "True wireless earbuds with world-class noise cancellation and premium sound.",
    price: 279.00,
    category: "ELECTRONICS",
    brand: "Bose",
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop&q=80"
    ]
  }
];

// Accessories products
const accessories = [
  {
    name: "Ray-Ban Aviator Sunglasses",
    description: "Classic aviator sunglasses with polarized lenses and gold-tone frame.",
    price: 154.00,
    category: "OTHER",
    brand: "Ray-Ban",
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Michael Kors Leather Handbag",
    description: "Premium leather handbag with multiple compartments and elegant design.",
    price: 298.00,
    category: "OTHER",
    brand: "Michael Kors",
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Rolex Submariner Watch",
    description: "Luxury diving watch with automatic movement and water resistance to 300m.",
    price: 8100.00,
    category: "OTHER",
    brand: "Rolex",
    stock: 3,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Gucci Leather Belt",
    description: "Designer leather belt with iconic GG buckle and premium Italian craftsmanship.",
    price: 420.00,
    category: "OTHER",
    brand: "Gucci",
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Tiffany & Co. Silver Necklace",
    description: "Elegant sterling silver necklace with heart pendant and signature Tiffany design.",
    price: 195.00,
    category: "OTHER",
    brand: "Tiffany & Co.",
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Louis Vuitton Wallet",
    description: "Luxury leather wallet with monogram canvas and multiple card slots.",
    price: 485.00,
    category: "OTHER",
    brand: "Louis Vuitton",
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Hermès Silk Scarf",
    description: "Premium silk scarf with hand-rolled edges and iconic Hermès pattern.",
    price: 395.00,
    category: "OTHER",
    brand: "Hermès",
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Oakley Sports Sunglasses",
    description: "High-performance sports sunglasses with impact-resistant lenses and secure fit.",
    price: 178.00,
    category: "OTHER",
    brand: "Oakley",
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Pandora Charm Bracelet",
    description: "Sterling silver charm bracelet with customizable charms and elegant design.",
    price: 65.00,
    category: "OTHER",
    brand: "Pandora",
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=600&fit=crop&q=80"
    ]
  },
  {
    name: "Coach Leather Backpack",
    description: "Premium leather backpack with laptop compartment and signature Coach craftsmanship.",
    price: 350.00,
    category: "OTHER",
    brand: "Coach",
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=600&fit=crop&q=80"
    ]
  }
];

async function createProduct(productData, adminId) {
  try {
    // Create the product
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        brand: productData.brand,
        stock: productData.stock,
        createdBy: adminId,
      }
    });

    // Create product images
    if (productData.images && productData.images.length > 0) {
      const imagePromises = productData.images.map((imageUrl) =>
        prisma.productImage.create({
          data: {
            productId: product.id,
            url: imageUrl,
          }
        })
      );
      
      await Promise.all(imagePromises);
    }

    console.log(`✅ Created product: ${product.name}`);
    return product;
  } catch (error) {
    console.error(`❌ Error creating product ${productData.name}:`, error.message);
    return null;
  }
}

async function main() {
  try {
    console.log('🚀 Starting bulk product creation...');

    // Find admin user
    const admin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!admin) {
      console.error('❌ No admin user found. Please run the seed script first.');
      return;
    }

    console.log(`👤 Using admin: ${admin.name} (${admin.email})`);

    // Create all products
    const allProducts = [...sportsShoes, ...electronics, ...accessories];
    let successCount = 0;
    let errorCount = 0;

    console.log(`📦 Creating ${allProducts.length} products...`);

    for (const productData of allProducts) {
      const result = await createProduct(productData, admin.id);
      if (result) {
        successCount++;
      } else {
        errorCount++;
      }
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Successfully created: ${successCount} products`);
    console.log(`❌ Failed to create: ${errorCount} products`);
    console.log(`📈 Sports Shoes: ${sportsShoes.length} products`);
    console.log(`💻 Electronics: ${electronics.length} products`);
    console.log(`👜 Accessories: ${accessories.length} products`);

  } catch (error) {
    console.error('❌ Error in bulk product creation:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();