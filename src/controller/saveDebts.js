import fs from 'fs';
import path from 'path';
import { PrismaClient } from "@prisma/client";
import createDebt from "../model/createDebt.js";

const prisma = new PrismaClient();

(async () => {
  const debtsPath = path.join(process.env.INFOBASE_SOURCE_DIRECTORY, 'debts.json');
  const debtsRaw = fs.readFileSync(debtsPath, 'utf-8');
  const debts = JSON.parse(debtsRaw);

  for (let i = 0; i < debts.length; i += 10) {
    const batch = debts.slice(i, i + 10);
    await Promise.all(
      batch.map(async debt => {
        try {
          console.log("[INFO] Debt:", debt);
          console.log("[INFO] Debt created: ", await createDebt(prisma, debt));
        } catch (error) {
          console.error('[ERROR] Debt not created:', error);
        }
      })
    );
  }
  await prisma.$disconnect();
})();