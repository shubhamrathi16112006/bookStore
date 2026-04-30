const Book = require("../model/Book");
const path = require('path');
const fs = require('fs');

exports.getBook = async (req, res) => {
  const books = await Book.find();
  res.render("index", { books });
};

exports.addBook = (req, res) => {
  res.render("add");
};

exports.createBook = async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
      price: req.body.price,
      image: req.file ? req.file.filename : null,
    });
    await book.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.editBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("edit", { book });
};

exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  let data = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publishedYear: req.body.publishedYear,
    price: req.body.price,
  };

  if (req.file) {
    if (book.image) {
      const oldPath = path.join(__dirname, "../public/uploads/", book.image);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    data.image = req.file.filename;
  }

  await Book.findByIdAndUpdate(req.params.id, data);
  res.redirect("/");
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect("/");
};