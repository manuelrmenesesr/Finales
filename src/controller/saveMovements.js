import fs from 'fs';
import path from 'path';
import { PrismaClient } from "@prisma/client";
import createMovement from '../model/createMovement.js';

const prisma = new PrismaClient();

(async () => {
  const movementsPath = path.join(process.env.INFOBASE_SOURCE_DIRECTORY, 'movements.json');
  const movementsRaw = fs.readFileSync(movementsPath, 'utf-8');
  const movements = JSON.parse(movementsRaw);

  for (let i = 0; i < movements.length; i += 10) {
    const batch = movements.slice(i, i + 10);
    await Promise.all(
      batch.map(async movement => {
        try {
          console.log("[INFO] Movement:", movement);
          console.log("[INFO] Movement created: ", await createMovement(prisma, movement));
        } catch (error) {
          console.error('[ERROR] Movement not created:', error);
        }
      })
    );
  }
  await prisma.$disconnect();
})();