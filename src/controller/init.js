import fs from 'fs';
import path from 'path';
import { PrismaClient } from "@prisma/client";
import createAccount from "../model/createAccount.js";
import createCategory from "../model/createCategory.js";

const prisma = new PrismaClient();

(async () => {
  try {
    const accountsPath = path.join(process.env.INFOBASE_SOURCE_DIRECTORY, 'accounts.json');
    const accountsRaw = fs.readFileSync(accountsPath, 'utf-8');
    const accounts = JSON.parse(accountsRaw);
    const categoriesPath = path.join(process.env.INFOBASE_SOURCE_DIRECTORY, 'categories.json');
    const categoriesRaw = fs.readFileSync(categoriesPath, 'utf-8');
    const categories = JSON.parse(categoriesRaw);
    
    for (let i = 0; i < accounts.length; i += 10) {
      const batch = accounts.slice(i, i + 10);
      await Promise.all(
        batch.map(account =>
          createAccount(prisma, account)
        )
      );
    }
    for (let i = 0; i < categories.length; i += 10) {
      const batch = categories.slice(i, i + 10);
      await Promise.all(
        batch.map(category =>
          createCategory(prisma, category)
        )
      );
    }
    console.log('[INFO] Init completed successfully');
  } catch (error) {
    console.error('[ERROR] Failed Init:', error);
  } finally {
    await prisma.$disconnect();
  }
})();