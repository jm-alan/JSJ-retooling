const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
  asyncHandler,
  handleValidationErrors,
  getUserToken,
  requireAuth,
  loginUser,
  logoutUser
} = require('../utils/server-utils.js');
const { check, validationResult } = require('express-validator');
const { User } = require('../db/models');
const crsf = require('csurf');
const crsfProtection = crsf({ cookie: true });

const userValidator = [
  check('userName')
    .exists({ checkFalsy: true })
    .custom(async (value) => {
      if (await User.findOne({ where: { userName: value } })) { throw new Error('The provided user name is already in use.'); } else {
        const invalidCharacters = '!?~`@#$%^&*(){}\\/<>,[]|';
        for (const letter of value) {
          if (invalidCharacters.includes(letter)) { throw new Error('User name contains invalid character.'); }
        }
        return true;
      }
    }),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.')
    .custom(async (value) => {
      if (await User.findOne({ where: { email: value } })) { throw new Error('The provided email is already in use.'); } else return true;
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please confirm password.')
    .custom((value, { req }) => {
      if (value !== req.body.password) { throw new Error('Confirm Password does not match Password.'); } else return true;
    }),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name.')
];

const loginValidator = [
  check('identification')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username or email.')
    .custom(async (value) => {
      if (value) {
        if (String(value).match(/@/g)) {
          if (!(await User.findOne({ where: { email: value } }))) {
            throw new Error('Invalid login.');
          } else return true;
        } else {
          if (!(await User.findOne({ where: { userName: value } }))) {
            throw new Error('Invalid login.');
          } else return true;
        }
      }
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
    .custom(async (value, { req }) => {
      if (value) {
        if (String(value).match(/@/g)) {
          const user = await User.findOne({
            where: { email: req.body.identification }
          });
          if (!user) throw new Error('Invalid login.');
          else if (
            !bcrypt.compareSync(req.body.password, user.hashedPassword.toString())
          ) { throw new Error('Invalid login.'); }
        } else {
          const user = await User.findOne({
            where: { userName: req.body.identification }
          });
          if (!user) throw new Error('Invalid login.');
          else if (
            !bcrypt.compareSync(req.body.password, user.hashedPassword.toString())
          ) { throw new Error('Invalid login.'); }
        }
      }
    })
];

router.get('/', crsfProtection, (req, res) => {
  // login pug file
  res.render('signup', { title: 'Login', errors: ['this is messed up', 'test error'], csrfToken: req.csrfToken() });
});

router.get('/login', crsfProtection, (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
});

router.post(
  '/login',
  crsfProtection,
  loginValidator,

  (req, res) => {
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      loginUser(req, res, user);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map(err => err.msg);
      res.render('login', { errors, csrfToken: req.csrfToken() });
    }
  }
);

router.post(
  '/',
  crsfProtection,
  userValidator,
  asyncHandler(async (req, res, next) => {
    // sign up function
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      const { userName, email, password, firstName, lastName } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        userName,
        email,
        hashedPassword,
        firstName,
        lastName
      });
      loginUser(req, res, user);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map(err => err.msg);
      res.render('signup', { title: 'Login', errors, csrfToken: req.csrfToken() });
    }
  })
);

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/login');
});

module.exports = router;
