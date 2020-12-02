<<<<<<< HEAD
// NPM modules
=======
>>>>>>> 6e10c1584b65c2f60e23444c6b4fde6684ba565d
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
<<<<<<< HEAD
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Internal modules
const { sequelize } = require('./db/models');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { sessionSecret } = require('./config');
const { restoreUser } = require('./utils/server-utils');

const store = new SequelizeStore({ db: sequelize });

const app = express();

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
=======
const { sequelize } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const expressSession = require('express-session');
const { sessionSecret } = require('./config');
const { restoreUser } = require('./utils/server-utils');

const app = express();

// view engine setup
app.set('view engine', 'pug');

>>>>>>> 6e10c1584b65c2f60e23444c6b4fde6684ba565d
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser(sessionSecret));
<<<<<<< HEAD
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: sessionSecret,
=======
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  expressSession({
    name: 'javascript_jungle.sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
  })
);

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: 'superSecret',
>>>>>>> 6e10c1584b65c2f60e23444c6b4fde6684ba565d
    store,
    saveUninitialized: false,
    resave: false
  })
);

store.sync();
app.use(restoreUser);
app.use('/', indexRouter);
app.use('/users', usersRouter);

<<<<<<< HEAD
app.get('/signup', (req, res) => {
  res.redirect('/users/signup');
});
app.get('/login', (req, res) => {
  res.redirect('/users/login');
});
=======
app.use('/', indexRouter);
app.use('/users', usersRouter);
>>>>>>> 6e10c1584b65c2f60e23444c6b4fde6684ba565d

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (error, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
<<<<<<< HEAD
  if (error.status !== 404) {
    console.log(error);
  }
=======
  console.log(error);
>>>>>>> 6e10c1584b65c2f60e23444c6b4fde6684ba565d
  // render the error page
  res.status(error.status || 500);
  res.render('error', { error });
});

module.exports = app;
