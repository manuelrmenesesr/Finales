export default async (prisma, transaction) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transactionCreated = await prisma.movement.create({
        data: transaction,
      })
      console.log("[INFO] Transaction created: ", transactionCreated);
      resolve();
    } catch (error) {
      console.error('[ERROR] Transaction not created:', transaction, error);
      reject(error);
    }
  });
}