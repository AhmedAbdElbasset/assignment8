import mongoose, { model, Schema } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim:true
  },
  author: String,
  year: Number,
  genres: [String],
});

export const bookModle=model('Book',bookSchema)
