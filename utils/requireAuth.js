module.exports = (req, res, next) => {
  if (!res.locals.authenticated) return res.redirect('/users/login');
  return next();
};
