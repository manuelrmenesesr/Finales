export default async (prisma, category) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await prisma.category.create({
        data: category,
      }));
    } catch (error) {
      reject(error);
    }
  });
}