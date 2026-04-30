const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publishedYear: Number,
  price: Number,
  image: String,
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);