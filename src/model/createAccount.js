export default async (prisma, account) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await prisma.account.create({
        data: account,
      }));
    } catch (error) {
      reject(error);
    }
  });
}