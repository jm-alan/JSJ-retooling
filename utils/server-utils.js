const { validationResult } = require("express-validator");
const { User } = require("../db/models");

function asyncHandler (handler) {
  return function (req, res, next) {
    return handler(req, res, next).catch(next);
  }
}

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    return next(err);
  }
  next();
};

const loginUser = (req, res, user) => {
  req.session.auth = { userId: user.id };
};

const restoreUser = async (req, res, next) => {
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

const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login');
  }
  return next();
};

module.exports = {
  restoreUser,
  requireAuth,
  asyncHandler,
  handleValidationErrors,
  loginUser,
  logoutUser
};
