import { db } from "../../DB/connection.js";

export const createBooksCollection = async () => {
  const bookSchema = {
    bsonType: "object",
    required: ["title", "author", "year", "genres"],
    properties: {
      title: { bsonType: "string", minLength: 1 },
      author: { bsonType: "string" },
      year: { bsonType: "number" },
      genres: { bsonType: 'array',items:{bsonType:"string"} },
    },
  };
  const bookModle = await db.createCollection("book", {
    validator: { $jsonSchema: bookSchema },
  });

  return bookModle;
};
//  Create an implicit collection
export const insertAuthor = async (authorData) => {
  const result = await db.collection("authors").insertOne(authorData);
  return result;
};

export const createCappedLogsCollection = async () => {
  const logSchema = {
    bsonType: "object",
    required: ["action", "bookId"],
    properties: {
      action: { bsonType: "string" },
      bookId: { bsonType: "objectId", },
    },
  };

  const logModel = await db.createCollection("log", {
    capped: true,
    size: 1024 * 1024,
    validator: { $jsonSchema: logSchema },
  });

  return {message:"log model created"};
};
export const createTitleIndex = async () => {
  const result = await bookModle.collection.createIndex({ title: 1 });
  return result;
};
