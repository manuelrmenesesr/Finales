export default async (prisma, debt) => {
  return new Promise(async (resolve, reject) => {
    try {
      const debtCreated = await prisma.debt.create({
        data: debt,
      })
      console.log("[INFO] Debt created: ", debtCreated);
      resolve();
    } catch (error) {
      console.error('[ERROR] Debt not created:', debt, error);
      reject(error);
    }
  });
}