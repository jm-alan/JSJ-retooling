const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  asyncHandler,
  handleValidationErrors,
  getUserToken,
  requireAuth,
} = require("../utils/server-utils.js");
const { check } = require("express-validator");
const { User } = require("../db/models");
const crsf = require("csurf");
const { db } = require("../config/index.js");
const crsfProtection = crsf({ cookie: true });

const userValidator = [
  check("userName")
    .exists({ checkFalsy: true })
    .custom(async (value) => {
      if (await User.findOne({ where: { userName: value } }))
        throw new Error("The provided user name is already in use.");
      else return true;
    }),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email.")
    .custom(async (value) => {
      if (await User.findOne({ where: { email: value } }))
        throw new Error("The provided email is already in use.");
      else return true;
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please confirm password.")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Confirm Password does not match Password");
      else return true;
    }),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name"),
];
/* GET users listing. */

router.get("/", crsfProtection, (req, res) => {
  // login pug file
  res.render("sign-up", { csrfToken: req.csrfToken() });
});

router.post(
  "/",
  // crsfProtection,
  userValidator,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    // sign up function
    const { userName, email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      hashedPassword,
      firstName,
      lastName,
    });
    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

module.exports = router;
