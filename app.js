// NPM modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Internal modules
const { sequelize } = require('./db/models');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newQuestionRouter = require('./routes/newQuestion');
const apiRouter = require('./routes/api');
const questionRouter = require('./routes/questions');
const postRouter = require('./routes/posts');
const { sessionSecret } = require('./config');
const { restoreUser } = require('./utils/server-utils');

const store = new SequelizeStore({ db: sequelize });

const app = express();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser(sessionSecret));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    name: 'javascript_jungle.sid',
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false
  })
);

store.sync();
app.use(restoreUser);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/questions', questionRouter);
app.use('/', newQuestionRouter);
app.use('/posts', postRouter);
app.get('/signup', (req, res) => {
  res.redirect('/users/signup');
});
app.get('/login', (req, res) => {
  res.redirect('/users/login');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  if (error.status !== 404) {
    console.log(error);
  }
  // render the error page
  res.status(error.status || 500);
  res.render('error', { error });
});

module.exports = app;
