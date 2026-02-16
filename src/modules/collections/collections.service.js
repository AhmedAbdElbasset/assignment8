import { bookModle } from "../../DB/index.js";
import mongoose from "mongoose";

export const createBooksCollection = async () => {
  const db = mongoose.connection.db;

  const result = await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
          },
        },
      },
    },
  });
  return result;
};
//  Create an implicit collection
export const insertAuthor = async (authorData) => {
  const db = mongoose.connection.db;
  const result = await db.collection("authors").insertOne(authorData);
  return result;
};

export const createCappedLogsCollection = async () => {
  const db = mongoose.connection.db;

  await db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024 
  });

  return "logs";
};
export const createTitleIndex = async () => {
  const result = await bookModle.collection.createIndex({ title: 1 });
  return result;
};
