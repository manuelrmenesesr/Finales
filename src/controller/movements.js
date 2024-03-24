import { PrismaClient } from "@prisma/client";
import readMovements from "../model/readMovements.js";
import printMovements from "../view/printMovements.js";

const prisma = new PrismaClient();

(async (args) => {
  const regexDate = /^\d{4}-\d{2}-\d{2}$/;
  if (args.length < 2 || args.length > 3) {
    console.error("The start date, end date and account name (otional) are expected");
    return;
  } if (!regexDate.test(args[0]) || !regexDate.test(args[1])) {
    console.error("One or both dates are not correct, yyyy-MM-dd is expected");
    return;
  }

  const where = {
    date: {
      gte: new Date(args[0]),
      lte: new Date(args[1])
    }
  }
  if (args.length == 3) where.Account = { name: { contains: args[2] } };

  try {
    printMovements(await readMovements(prisma, where));
  } catch (error) { console.log(error); } finally { prisma.$disconnect(); }
})(process.argv.slice(2));