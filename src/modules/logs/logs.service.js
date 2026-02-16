import mongoose from "mongoose";
import { ObjectId } from "mongodb";
export const createLog = async (inputs) => {
  const db = mongoose.connection.db;
  const { book_id, action } = inputs;
  const result = db
    .collection("logs")
    .insertOne({ book_id: new ObjectId(book_id), action });
  return result;
};
