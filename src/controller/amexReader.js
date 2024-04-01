import dotenv from 'dotenv'
import fs from "fs/promises";
import path from 'path';
import { PdfReader } from "pdfreader";

dotenv.config();

(async (args) => {
  if (args.length != 1) {
    console.error("Document name is expected");
    return;
  }

  const movements = await new Promise((resolve, reject) => {
    let day = null;
    let month = null;
    let concept = null;
    let conceptCounter = 0;
    let movements = [];

    new PdfReader().parseFileItems(path.join(process.env.INFOBASE_SOURCE_DIRECTORY, args[0]), (err, item) => {
      if (err) {
        reject(err);
        return;
      }

      if (!item) {
        resolve(movements);
        return;
      }

      if (item.text) {
        const text = item.text.trim();
        // Day
        if (text.match(/^(0?[1-9]|[12]\d|3[01])$/)) {
          // New movement
          if (day != null && month != null && concept != null) {
            movements.push({
              "concept": concept,
              "amount": 0,
              "date": `${new Date().getFullYear()}-${month}-${day.padStart(2, '0')}T00:00:00.000Z`,
              "accountId": 0,
              "categoriesOnMovements": {
                "create": {
                  "categoryId": 0,
                  "amount": 0
                }
              }
            });
          }
          day = text;
        }
        // Month
        else if (text.match(/(Enero|Febrero|Marzo|Abril|Mayo|Junio|Julio|Agosto|Septiembre|Octubre|Noviembre|Diciembre)/) && day != null && month === null) {
          const months = {
            "Enero": "01",
            "Febrero": "02",
            "Marzo": "03",
            "Abril": "04",
            "Mayo": "05",
            "Junio": "06",
            "Julio": "07",
            "Agosto": "08",
            "Septiembre": "09",
            "Octubre": "10",
            "Noviembre": "11",
            "Diciembre": "12"
          };
          month = months[text];
        }
        // Concept
        else if (text.match(/[a-zA-Z]/) && day != null && month != null && conceptCounter < 3) {
          concept = concept ? concept + " " + text : text;
          conceptCounter++;
        }
        // Exclude movement unless the text corresponds to the 'de' in the date
        else if (!(text === "de" && day != null && month === null)) {
          day = null;
          month = null;
          concept = null;
          conceptCounter = 0;
        }
      }
    });
  });

  const jsonContent = JSON.stringify(movements, null, 2);
  try {
    await fs.writeFile(path.join(process.env.INFOBASE_SOURCE_DIRECTORY, "movements.json"), jsonContent);
  } catch (error) {
    console.error("Save movements.json error", error);
  }
})(process.argv.slice(2));
