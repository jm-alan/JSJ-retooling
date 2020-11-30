const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const routes = require('./routes.js');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/utils/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.use((req, res, next) => {
  const error = new Error('The requested page could not be found.');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // TODO Log the error to the database.
  } else {
    console.error(err);
  }
  next(err);
});

// Error handler for 404 errors.
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      title: 'Page Not Found'
    });
  } else {
    next(err);
  }
});

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === 'production';
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
