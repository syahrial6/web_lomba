// This file is used to create a new PrismaClient instance and store it in the global object. This way, the client can be reused across all the requests in the serverless function. This is important because creating a new client for each request can lead to performance issues and memory leaks. The global object is used to store the client instance so that it can be reused across all the requests. This is done by checking if the client instance is already stored in the global object. If it is, then it is reused; otherwise, a new client instance is created and stored in the global object.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;