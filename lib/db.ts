// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const db =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     ...({
//       _customDatasources: {
//         db: {
//           url: process.env.DATABASE_URL,
//         },
//       },
//     } as any),
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

import { PrismaClient } from "@prisma/client";

// 1. Next.js runtime-д DATABASE_URL-ийг систем түвшинд хүчээр тулгаж өгөх
if (!process.env.DATABASE_URL) {
  // Хэрэв Next.js уншиж чадахгүй байвал энэ нь аврах цагираг болно
  process.env.DATABASE_URL =
    "postgres://avnadmin:AVNS_wV3pGvPZ_pEw-eCenYm@pg-2b47b4d1-ireeduii-c94d.h.aivencloud.com:26197/defaultdb?sslmode=require";
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// 2. PrismaClient-ийг ямар ч хориотой параметр үггүйгээр, цэвэрхэн хоосон үүсгэнэ
export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
