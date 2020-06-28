const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

/* GET all books */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  console.log(books);
  res.render("books/index", { books, title: "List of Books" });
}));

// GET /books/new Shows the create new book form. 
router.get('/new', asyncHandler(async (req, res) => {
  res.render("books/new-book", { book: {}, title: "New Book"});
}));

// POST /books/new Posts a new book to the database. 
router.post('/new', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect("/books/" + book.id);
}));

// GET /books/:id Shows book detail form.
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("books/show", { book: book, title: book.title});
}));

// POST /books/:id Updates book info in the database.
// POST /books/id/delete Deletes a book.
 
module.exports = router;
