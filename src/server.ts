import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
