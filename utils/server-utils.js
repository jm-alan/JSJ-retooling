const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const bearerToken = require('express-bearer-token');
const { User } = require('../db/models');
const { secret, expiresIn } = jwtConfig;

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    return next(err);
  }
  next();
};

const getUserToken = (user) => {
  const userDataForToken = {
    id: user.id,
    email: user.email
  };

  const token = jwt.sign({ data: userDataForToken }, secret, {
    expiresIn: parseInt(expiresIn, 10)
  });

  return token;
};

const loginUser = (req, res, user) => {
  req.session.auth = { userId: user.id };
};

const restoreUser = async (req, res, next) => {
  console.log(req.session);

  if (req.session.auth) {
    const { userId } = req.session.auth;

    try {
      const user = await User.findByPk(userId);

      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
};

const logoutUser = (req, res) => {
  delete req.session.auth;
};

const requireAuth = [bearerToken(), restoreUser];
module.exports = {
  getUserToken,
  restoreUser,
  requireAuth,
  asyncHandler,
  handleValidationErrors,
  loginUser
};
