import fs from 'fs';
import path from 'path';
import { PrismaClient } from "@prisma/client";
import createTransaction from "../model/createTransaction.js";

const prisma = new PrismaClient();

(async () => {
  try {
    const transactionsPath = path.join(process.env.INFOBASE_SOURCE_DIRECTORY, 'transactions.json');
    const transactionsRaw = fs.readFileSync(transactionsPath, 'utf-8');
    const transactions = JSON.parse(transactionsRaw);

    for (let i = 0; i < transactions.length; i += 10) {
      const batch = transactions.slice(i, i + 10);
      await Promise.all(
        batch.map(transaction =>
          createTransaction(prisma, transaction)
        )
      );
    }
    console.log('[INFO] Transactions successfully recorded');
  } catch (error) {
    console.error('[ERROR] Unrecorded transactions:', error);
  } finally {
    await prisma.$disconnect();
  }
})();