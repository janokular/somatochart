import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { athletesRouter } from "./athlete.routes";

// Load environment variables from the .env file, where the DB_URI is configured
dotenv.config();

const { DB_URI: DB_URI } = process.env;

if (!DB_URI) {
  console.error(
    "No DB_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(DB_URI)
  .then(() => {
    const app = express();
    app.use(cors());

    app.use("/athletes", athletesRouter);

    // start the Express server
    app.listen(5200, () => {
      console.log(`Server running at http://10.23.45.30:5200...`);
    });
  })
  .catch((error) => console.error(error));
