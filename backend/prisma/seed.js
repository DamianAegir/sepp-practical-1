import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  // Create admin user
  const adminExists = await prisma.user.findUnique({
    where: { email: 'admin@example.com' }
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN',
        phone: '1234567890'
      }
    });
    
    console.log(`Created admin user with id: ${admin.id}`);
  } else {
    console.log('Admin user already exists');
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });