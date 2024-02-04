import fs from 'fs';
import path from 'path';
import { PrismaClient } from "@prisma/client";
import createDebt from "../model/createDebt.js";

const prisma = new PrismaClient();

(async () => {
  try {
    const debtsPath = path.join(process.env.INFOBASE_SOURCE_DIRECTORY, 'debts.json');
    const debtsRaw = fs.readFileSync(debtsPath, 'utf-8');
    const debts = JSON.parse(debtsRaw);

    for (let i = 0; i < debts.length; i += 10) {
      const batch = debts.slice(i, i + 10);
      await Promise.all(
        batch.map(debt =>
          createDebt(prisma, debt)
        )
      );
    }
    console.log('[INFO] Debts successfully recorded');
  } catch (error) {
    console.error('[ERROR] Unrecorded debts:', error);
  } finally {
    await prisma.$disconnect();
  }
})();