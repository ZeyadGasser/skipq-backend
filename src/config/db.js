import { Sequelize } from "sequelize";
import { setTimeout } from "timers/promises";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  },
);

const initConnectDb = async (retries = parseInt(process.env.MAX_ATTEMPS)) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      return parseInt(process.env.SUCCESS);
    } catch (error) {
      retries--;
      console.error(
        `Unable to connect to the database. Retries left: ${retries}`,
      );
      console.log(error);

      if (retries === 0) {
        console.error("All retry attempts failed. Exiting...");
        console.log("Please try again later.");
        return parseInt(process.env.DB_CONNECTION_ERROR_CODE);
      }

      console.log("Reconnecting in 1s...");
      await setTimeout(1000);
    }
  }
};

export { initConnectDb, sequelize };
