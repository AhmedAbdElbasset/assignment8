import { Schema } from "mongoose";

import mongoose from "mongoose";

const logSchema = new Schema({
  action: String,
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  }
}, { capped: { size: 1024 * 1024 } });

export const Log = model("Log", logSchema);