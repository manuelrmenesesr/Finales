export default async (prisma, movement) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await prisma.movement.create({
        data: movement,
      }));
    } catch (error) {
      reject(error);
    }
  });
}