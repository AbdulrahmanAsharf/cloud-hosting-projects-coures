/*
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
*/




import { PrismaClient } from '@prisma/client';

// Singleton function for PrismaClient
const prismaClientSingleton = () => {
    return new PrismaClient();
};

// Check if globalThis has a Prisma instance or create a new one
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Store the instance in globalThis in development mode
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
