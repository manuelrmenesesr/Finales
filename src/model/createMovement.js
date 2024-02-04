export default async (prisma, movement) => {
  return new Promise(async (resolve, reject) => {
    try {
      const movementCreated = await prisma.movement.create({
        data: movement,
      })
      console.log("[INFO] Movement created: ", movementCreated);
      resolve();
    } catch (error) {
      console.error('[ERROR] Movement not created:', movement, error);
      reject(error);
    }
  });
}