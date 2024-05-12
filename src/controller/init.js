import fs from 'fs';
import path from 'path';
import { PrismaClient } from "@prisma/client";
import createAccount from "../model/createAccount.js";
import createCategory from "../model/createCategory.js";

const prisma = new PrismaClient();

(async () => {
  const accountsPath = path.join(process.env.INFOBASE_SOURCE_DIRECTORY, 'accounts.json');
  const accountsRaw = fs.readFileSync(accountsPath, 'utf-8');
  const accounts = JSON.parse(accountsRaw);
  const categoriesPath = path.join(process.env.INFOBASE_SOURCE_DIRECTORY, 'categories.json');
  const categoriesRaw = fs.readFileSync(categoriesPath, 'utf-8');
  const categories = JSON.parse(categoriesRaw);

  for (let i = 0; i < accounts.length; i += 10) {
    const batch = accounts.slice(i, i + 10);
    await Promise.all(
      batch.map(async account => {
        try {
          console.log("[INFO] Sending Account:", debt);
          console.log("[INFO] Account created: ", await createAccount(prisma, account));
        } catch (error) {
          console.error('[ERROR] Account not created:', error);
        }
      })
    );
  }
  for (let i = 0; i < categories.length; i += 10) {
    const batch = categories.slice(i, i + 10);
    await Promise.all(
      batch.map(async category => {
        try {
          console.log("[INFO] Sending category:", debt);
          console.log("[INFO] Category created: ", await createCategory(prisma, category));
        } catch (error) {
          console.error('[ERROR] Category not created:', error);
        }
      })
    );
  }
  await prisma.$disconnect();
})();