// // prisma.config.ts
// import { defineConfig } from "@prisma/config";

// export default defineConfig({
//   datasource: {
//     url: process.env.DATABASE_URL,
//   },
// });

// prisma.config.ts
import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

// .env файлыг хүчээр ачаална
dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
