import express from "express";
import { groupByColumn, UnexpectedPropertyError } from "./functions.ts";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/:property/histogram", async (req, res) => {
  // return list of all commodities with number of appearances in the csv
  try {
    res.send(
      await groupByColumn(req.params.property, "data/Projection2021.csv"),
    );
  } catch (e) {
    if (e instanceof UnexpectedPropertyError) {
      res.status(404).send({ error: e.message });
    } else {
      res.status(400);
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
