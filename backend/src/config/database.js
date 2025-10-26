import { PrismaClient } from '@prisma/client';

// Singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

const globalForPrisma = global;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Test database connection
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('PostgreSQL Connected via Prisma (Neon)');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('PostgreSQL connection closed through app termination');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  console.log('PostgreSQL connection closed through app termination');
  process.exit(0);
});

export default prisma;
