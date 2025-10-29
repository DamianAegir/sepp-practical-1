import { PrismaClient } from '../node_modules/@prisma/client/index.js';

const prisma = new PrismaClient();

async function deleteAllProducts() {
  try {
    console.log('🗑️ Starting product deletion...');

    // Delete all product images first (due to foreign key constraints)
    const deletedImages = await prisma.productImage.deleteMany({});
    console.log(`🖼️ Deleted ${deletedImages.count} product images`);

    // Delete all products
    const deletedProducts = await prisma.product.deleteMany({});
    console.log(`📦 Deleted ${deletedProducts.count} products`);

    console.log('✅ All products and images have been deleted successfully!');
  } catch (error) {
    console.error('❌ Error deleting products:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllProducts();