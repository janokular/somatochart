import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const athletesRouter = express.Router();
athletesRouter.use(express.json());

athletesRouter.get("/", async (_req, res) => {
  try {
    const athletes = await collections?.athletes?.find({}).toArray();
    res.status(200).send(athletes);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

athletesRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const athlete = await collections?.athletes?.findOne(query);

    if (athlete) {
      res.status(200).send(athlete);
    } else {
      res.status(404).send(`Failed to find an athlete: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an athlete: ID ${req?.params?.id}`);
  }
});

athletesRouter.post("/", async (req, res) => {
  try {
    const athlete = req.body;
    const result = await collections?.athletes?.insertOne(athlete);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new athlete: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new athlete.");
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

athletesRouter.put("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const athlete = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.athletes?.updateOne(query, {
      $set: athlete,
    });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an athlete: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an athlete: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an athlete: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

athletesRouter.delete("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.athletes?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an athlete: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an athlete: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an athlete: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});
