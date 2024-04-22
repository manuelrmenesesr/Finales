import fs from 'fs/promises';
import path from 'path';

(async (args) => {
  if (args.length != 1) {
    console.error("Document name is expected");
    return;
  }

  try {
    const movements = [];
    let header = null;
    const originFilePath = path.join(process.env.INFOBASE_SOURCE_DIRECTORY, args[0]);
    const fileContent = await fs.readFile(originFilePath, { encoding: 'utf8' });

    fileContent.trim().split('\n').forEach((line, lineIndex) => {
      const columns = line.split(',');
      if (lineIndex === 0) {
        header = columns;
      } else {
        const movement = {
          concept: null,
          amount: 0,
          date: null,
          accountId: 0,
          categoriesOnMovements: {
            create: {
              categoryId: 0,
              amount: 0
            }
          }
        }
        header.forEach((columnName, columnIndex) => {
          if (columnName === "Fecha") {
            const date = new Date(columns[columnIndex]);
            movement.date = date.toISOString();
          }
          else if (columnName === "Descripción")
            movement.concept = columns[columnIndex];
          else if (columnName === "Importe") {
            movement.amount = columns[columnIndex] * -1;
            movement.categoriesOnMovements.create.amount = columns[columnIndex] * -1;
          }
        });
        movements.push(movement);
      }
    });

    const destinationFilePath = path.join(process.env.INFOBASE_SOURCE_DIRECTORY, "movements.json");
    await fs.writeFile(destinationFilePath, JSON.stringify(movements, null, 2));
  } catch (error) {
    console.error("Save movements.json error", error);
  }
})(process.argv.slice(2));
