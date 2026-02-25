import { db } from "../../DB/connection.js";

export const createBook = async (inputs) => {
  const book= await db.collection('book').insertOne(inputs);
  return book
};



export const createManyBooks = async (inputs) => {
  
  return await db.collection('book').insertMany(inputs);
};



export const updateBook = async () => {
  
  return await db.collection('book').updateOne(
    { title: "Future" },
    {$set:{ year: 2022 }}
  );
};

export const getOneBook = async (inputs) => {
  
  return await db.collection('book').findOne({ title:inputs });
};

export const getBooksInRange = async (from,to) => {
  
  return await db.collection('book').find({
    year: { $gt: Number(from), $lt: Number(to) }
  }).toArray()
};

export const getBooksByGenre = async (genre) => {
  
  return await db.collection('book').find({
    genres: genre
  }).toArray()
};

export const getPaginatedBooks = async () => {
  
  return await db.collection('book').find()
    .sort({ year: -1 })
    .skip(2)
    .limit(3).toArray()
};

export const getBooksByType = async () => {
  
  return await db.collection('book').find({
    year: { $type: "number" }
  }).toArray()
};

export const getExcludedGenres = async () => {
  
  return await db.collection('book').find({
    genres: { $nin: ["Horror", "science fiction"] }
  }).toArray()
};

export const deleteOldBooks = async (year) => {
  
  return await db.collection('book').deleteMany({
    year: { $lt: Number(year) }
  });
};

export const aggSortBooks = async () => {
  
  return await db.collection('book').aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } }
  ]).toArray()
};

export const aggProjectBooks = async () => {
  
  return await db.collection('book').aggregate([
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
  
  return await db.collection('book').aggregate([
    { $unwind: "$genres" }
  ]).toArray()
};

export const joinBooksWithLogs = async () => {
  
  return await db.collection('book').aggregate([
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
