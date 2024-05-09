import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  Genre: String,
  PublicationYear: Number,
  Publisher: String,
  language: String,
});

const Book = model('Book', bookSchema);

export default Book;
