import express from "express";
import { router } from "./router";
import { pool } from "./db";
import { seedData } from "./seed";

const app = express();

app.use(express.json());

app.use(router);

const port = 8000;

const start = async () => {
  await pool.query("SELECT 1");

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  await seedData();
};

start();
