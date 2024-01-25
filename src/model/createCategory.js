export default async (prisma, category) => {
  return new Promise(async (resolve, reject) => {
    try {
      const categoryCreated = await prisma.category.create({
        data: category,
      })
      console.log("[INFO] Category created: ", categoryCreated);
      resolve();
    } catch (error) {
      console.error('[ERROR] Category not created:', category, error);
      reject(error);
    }
  });
}