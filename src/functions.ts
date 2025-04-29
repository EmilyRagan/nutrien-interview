import csv from "csv-parser";
import { createReadStream } from "fs";
import { groupBy, mapKeys, mapValues } from "lodash-es";

export async function readFile(
  filePath: string,
): Promise<Record<string, unknown>[]> {
  // https://github.com/mafintosh/csv-parser/issues/192#issuecomment-769922825
  return await new Promise((resolve, reject) => {
    const results: Record<string, unknown>[] = [];

    createReadStream(filePath, { autoClose: true })
      .on("error", (err) => reject(err))
      .pipe(csv())
      .on("data", (data) => {
        results.push(
          mapKeys(data, (value, key) => {
            return key.trim().toLowerCase();
          }),
        );
      })
      .on("end", () => {
        resolve(results);
      });
  });
}

export class UnexpectedPropertyError extends Error {}

export async function groupByColumn(columnName: string, filePath: string) {
  const property = columnName.toLowerCase();
  const results = await readFile(filePath);
  // assuming all properties/columns are expected to exist on all rows from csv
  if (!(property in results[0])) {
    throw new UnexpectedPropertyError(`unexpected property '${property}'`);
  }

  const commodities = mapValues(
    groupBy(results, (r) => r[property]),
    "length",
  );
  return commodities;
}
