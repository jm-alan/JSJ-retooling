// NPM modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Internal modules
const { sequelize } = require('./db/models');
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const questionRouter = require('./routes/questions');
const postRouter = require('./routes/posts');
const { sessionSecret } = require('./config');
const { restoreUser } = require('./utils');

const app = express();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser(sessionSecret));
app.use(express.urlencoded({ extended: false }));

const store = new SequelizeStore({ db: sequelize });

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
app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/questions', questionRouter);
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
  if (error.status === 404) {
    res.render('error', { error });
  } else {
    res.status(error.status || 500);
    res.render('error', { error });
  }
});

module.exports = app;
