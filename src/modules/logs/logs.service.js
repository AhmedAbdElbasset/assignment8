import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { db } from "../../DB/connection.js";
export const createLog = async (inputs) => {
  const { book_id, action } = inputs;
  const result = db
    .collection("log")
    .insertOne({ bookId: new ObjectId(book_id), action });
  return result;
};
