import mongoose from "mongoose";

export const createBook = async (inputs) => {
  const db=mongoose.connection.db
  const book= await db.collection('books').insertOne(inputs);
  return book
};



export const createManyBooks = async (inputs) => {
  const db=mongoose.connection.db
  return await db.collection('books').insertMany(inputs);
};



export const updateBook = async () => {
  const db=mongoose.connection.db
  return await db.collection('books').updateOne(
    { title: "Future" },
    {$set:{ year: 2022 }}
  );
};

export const getOneBook = async (inputs) => {
  const db=mongoose.connection.db
  return await db.collection('books').findOne({ title:inputs });
};

export const getBooksInRange = async (from,to) => {
  const db=mongoose.connection.db
  return await db.collection('books').find({
    year: { $gt: Number(from), $lt: Number(to) }
  }).toArray()
};

export const getBooksByGenre = async (genre) => {
  const db=mongoose.connection.db
  return await db.collection('books').find({
    genres: genre
  }).toArray()
};

export const getPaginatedBooks = async () => {
  const db=mongoose.connection.db
  return await db.collection('books').find()
    .sort({ year: -1 })
    .skip(2)
    .limit(3).toArray()
};

export const getBooksByType = async () => {
  const db=mongoose.connection.db
  return await db.collection('books').find({
    year: { $type: "number" }
  }).toArray()
};

export const getExcludedGenres = async () => {
  const db=mongoose.connection.db
  return await db.collection('books').find({
    genres: { $nin: ["Horror", "science fiction"] }
  }).toArray()
};

export const deleteOldBooks = async (year) => {
  const db=mongoose.connection.db
  return await db.collection('books').deleteMany({
    year: { $lt: Number(year) }
  });
};

export const aggSortBooks = async () => {
  const db=mongoose.connection.db
  return await db.collection('books').aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } }
  ]).toArray()
};

export const aggProjectBooks = async () => {
  const db=mongoose.connection.db
  return await db.collection('books').aggregate([
    { $match: { year: { $gt: 2000 } } },
    {
      $project: {
        title: 1,
        author: 1,
        year: 1,
        _id: 0
      }
    }
  ]).toArray()
};

export const unwindGenres = async () => {
  const db=mongoose.connection.db
  return await db.collection('books').aggregate([
    { $unwind: "$genres" }
  ]).toArray()
};

export const joinBooksWithLogs = async () => {
  const db=mongoose.connection.db
  return await db.collection('books').aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "_id",
        foreignField: "book_id",
        as: "logs"
      }
    }
  ]).toArray()
};
