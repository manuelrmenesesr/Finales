export default async (prisma, debt) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await prisma.debt.create({
        data: debt,
      }));
    } catch (error) {
      reject(error);
    }
  });
}