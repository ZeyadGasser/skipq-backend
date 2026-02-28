import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { initConnectDb } from "./config/db.js";
import { corsMiddleware } from "./middlewares/cors.middleware.js";
import { mapRoutes } from "./routes/index.js";
import cookieParser from 'cookie-parser';
main();

async function main() {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(corsMiddleware);

  const statusDbCode = await initConnectDb();
  if (statusDbCode === parseInt(process.env.SUCCESS)) {
    mapRoutes(app);

    app.listen(process.env.PORT, "0.0.0.0", () => {
      console.log(`Start listen on port ${process.env.PORT}`);
    });
  } else {
    console.log("send email to devolper");
    process.exit(process.env.FAILURE);
  }
}
