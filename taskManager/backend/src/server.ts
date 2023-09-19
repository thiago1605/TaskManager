import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import "./shared/container";

import { db } from "./dataBase";
import { router } from "./routes";
import { verifyErrors } from "./middlewares/verifyErrors";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);
app.use(verifyErrors);

app.get("/", (_req, res) => {
  res.send(
    `<div style="background-color: #ffcc00; color: #333; font-size: 20px; padding: 10px; text-align: center">Hello World!</div>`
  );
});

db.then(async (connection) => {
  app.listen(PORT, () => {
    console.log(
      `-----------------   Listening on port ${PORT}   -----------------`
    );
  });

  process.on("SIGINT", async () => {
    await connection.$pool.end();
    process.exit(0);
  });
}).catch((error: Error) => console.error(`Error: ${error.message}`));
