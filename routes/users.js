const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
  asyncHandler,
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
      if (value !== req.body.password) { throw new Error('Confirm Password does not match Password'); } else return true;
    }),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name')
];

const loginValidator = [
  check('identification')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username or email.')
    .custom(async (value, {req}) => {
      // If the identification entered scans as an email address
      if (String(value).match(/@/g)) {
        // but lookup returns null
        const user = await User.findOne({ where: { email: value } })
        if (!(user)) {
          throw new Error('Invalid login.');
        } else if (user) {
            if (!bcrypt.compareSync(req.body.password, user.hashedPassword.toString())) {
                  throw new Error('Invalid login.');
            }
        } else return true;
      } else {
        // If the identification scans as a regular username, but lookup
        // still returns null
        const user = await User.findOne({ where: { userName: value } });
        if (!(user)) {
          throw new Error('Invalid login.');
          // otherwise this error validation is complete.
        } else if (user) {
          if (!bcrypt.compareSync(req.body.password, user.hashedPassword.toString())) {
                throw new Error('Invalid login.');
          }
      } else return true;
      }
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
];

router.get('/signup', crsfProtection, (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
    csrfToken: req.csrfToken()
  });
});

router.get('/', (req, res) => {
  res.redirect('/users/signup');
});

router.get('/login', crsfProtection, (req, res) => {
  res.render('login', {
    title: 'Login',
    csrfToken: req.csrfToken()
  });
});

router.post('/login',
  crsfProtection,
  loginValidator,
  (req, res, next) => {
    // We arrive here in one of two states; either the validation was
    // successful, and req.special.user exists, or it failed, and
    // not only does user not exist, but we also have a bundle of
    // errors on our request.
    const { body: { emailAddress }, user } = req;
    const validatorErrors = validationResult(req);
    // If we both have no errors AND successfully found a user in
    // the validation step, then and only then can we log the user in.
    // In fact, it'd be literally impossible otherwise, since the login
    // function has to take a user as an argument to correctly configure
    // req.session.auth
    if (validatorErrors.isEmpty() && user) {
      // Set req.session.auth to the users' id, which will also store that
      // session in our database thanks to the session store function in
      // app.js
      loginUser(req, res, user);
      // And redirect to home, with the user now logged in.
      res.redirect('/');
    } else {
      // Otherwise, we must have errors (or an empty user object, if somehow
      // some malicious actor managed to circumvent our server-side error
      // validation, but they weren't able to successfully guess a correct
      // email or username.)
      const errors = validatorErrors.array().map(err => err.msg);
      res.render('login', {
        title: 'Login',
        emailAddress,
        errors,
        csrfToken: req.csrfToken()
      });
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
      res.render('signup', {
        title: 'Sign Up',
        ...req.body,
        csrfToken: req.csrfToken(),
        errors
      });
    }
  })
);

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/login');
});

module.exports = router;
