import { expect, test } from "@jest/globals";
import { groupByColumn, readFile } from "./functions";

test("readFile should read all contents of CSV", async () => {
  const results = await readFile("data/Projection2021.csv");
  expect(results.length).toBe(2928);
});

test.each([
  "Year",
  "Attribute",
  "Units",
  "YearType",
  "Commodity",
  "CommodityType",
])("groupByColumn should succeed with column from CSV", async (column) => {
  expect(async () =>
    groupByColumn(column, "data/Projection2021.csv"),
  ).not.toThrowError();
});

test.each(["year", "YEAR", "yEAR"])(
  "groupByColumn should succeed with column from CSV with mismatched casing",
  async (column) => {
    expect(async () =>
      groupByColumn(column, "data/Projection2021.csv"),
    ).not.toThrowError();
  },
);

test.each(["test", "123", "true"])(
  "groupByColumn should throw an error with column not found",
  async (column) => {
    expect(async () =>
      groupByColumn(column, "data/Projection2021.csv"),
    ).toThrowError();
  },
);
