const asyncHandler = require('./asyncHandler');
const handleValidationErrors = require('./handleValidationErrors');
const restoreUser = require('./restoreUser');
const loginUser = require('./loginUser');
const logoutUser = require('./logoutUser');
const requireAuth = require('./requireAuth');
const mostPopular = require('./mostPopular');
const mostRecent = require('./mostRecent');
const searchThreads = require('./searchThreads');
const getThreadsByIds = require('./getThreadsByIds');
const userValidator = require('./userValidator');
const loginValidator = require('./loginValidator');
const sanitizeOptions = require('./sanitizeOptions');

module.exports = {
  restoreUser,
  requireAuth,
  asyncHandler,
  handleValidationErrors,
  loginUser,
  logoutUser,
  mostPopular,
  mostRecent,
  searchThreads,
  getThreadsByIds,
  userValidator,
  loginValidator
};
