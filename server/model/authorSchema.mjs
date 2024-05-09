import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const authorSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Nationality: String,
  BirthYear: Number,
});

const Author = model('Author', authorSchema);

export default Author;
