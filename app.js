var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

// Forward 404 errors to approprate pug template
app.use((req, res, next) => {
  res.status(404).render("books/page-not-found");
});

// error handler
app.use((err, req, res, next) => {
  if (err) 
    console.log(res.status)
    console.log('Global error handler called', err);
  if (err.status === 404) {
    console.log(err.message);
    res.status(404).render('books/page-not-found',  { err } ); 
  } else {
    err.message = err.message || `Oops!  It looks like something went wrong on the server.`;
    res.status(err.status || 500).render("books/global-error", { err }); 
  }
});

module.exports = app;
