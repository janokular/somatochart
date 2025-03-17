import * as mongodb from "mongodb";
import { Athlete } from "./athlete";

export const collections: {
  athletes?: mongodb.Collection<Athlete>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("meanStackExample");
  await applySchemaValidation(db);

  const athletesCollection = db.collection<Athlete>("athletes");
  collections.athletes = athletesCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Athlete model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "endo", "mezo", "ecto", "seriesSymbol", "seriesColor"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        endo: {
          bsonType: "number",
          description: "'endo' is required and is a number",
        },
        mezo: {
          bsonType: "number",
          description: "'mezo' is required and is a number",
        },
        ecto: {
          bsonType: "number",
          description: "'ecto' is required and is a number",
        },
        seriesSymbol: {
          bsonType: "string",
          description:
            "'seriesSymbol' is required and is one of 'circle', 'triangle', or 'square'",
          enum: ["circle", "triangle", "square"],
        },
        seriesColor: {
          bsonType: "string",
          description:
            "'seriesColor' is required and is one of 'blue', 'orange', or 'purple'",
          enum: ["blue", "orange", "purple"],
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: "athletes",
      validator: jsonSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("athletes", { validator: jsonSchema });
      }
    });
}
