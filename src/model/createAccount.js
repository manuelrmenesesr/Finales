export default async (prisma, account) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accountCreated = await prisma.accounts.create({
        data: account,
      })
      console.log("[INFO] Account created: ", accountCreated);
      resolve();
    } catch (error) {
      console.error('[ERROR] Account not created:', account, error);
      reject(error);
    }
  });
}