import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import pg from "pg";

const app = express();
const port = process.env.PORT || 3333;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "hello from node" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
