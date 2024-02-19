import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
try {
  const result = await prisma.movement.findMany({
    select: {
      id: true,
      concept: true,
      amount: true,
      Account: {
        select: {
          name: true,
          entity: true
        }
      },
      date: true,
      categoriesOnMovements: {
        select: {
          id: true,
          amount: true,
          Category: {
            select: {
              category: true,
              subcategory: true
            }
          }
        }
      }
    },
    where: {
      date: {
        gte: new Date('2024-01-01'),
        lte: new Date('2024-02-01')
      }
    },
    orderBy: {
      date: 'asc'
    }
  });
  result.forEach(movement => {
    console.log("Movement ID:", movement.id);
    console.log("Concept:", movement.concept);
    console.log("Amount:", movement.amount);
    console.log("Account:", movement.Account.name);
    if (movement.Account.entity) console.log("Account entity:", movement.Account.entity);
    console.log("Date:", movement.date.toISOString().split('T')[0]);
    console.log("Categories On Movements:");
    movement.categoriesOnMovements.forEach(category => {
      console.log("  - Category ID:", category.id);
      console.log("    Amount:", category.amount);
      console.log("    Category:", category.Category.category);
      console.log("    Subcategory:", category.Category.subcategory);
    });
    console.log("\n");
  });
}
catch (error) { console.log(error); }
finally { await prisma.$disconnect(); }