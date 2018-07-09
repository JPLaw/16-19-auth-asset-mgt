'use strict';

import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
}, { timestamps: true });

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('books', bookSchema, 'books', skipInit);
