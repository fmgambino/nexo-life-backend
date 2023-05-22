import { body, validationResult } from "express-validator";
// const { body, validationResult } = require('express-validator');
import createError from "../errors/createError.js";
import User from "../../models/userModel.js";


const allowedRoles = ["SuperAdministrator", "Administrator", "Responsible"];

const auth = [
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email name can not be empty!")
    .bail()
    .isEmail()
    .withMessage("Invalid email address!")
    .bail(),
  body("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Password can not be empty!")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password minimum 8 characters required!")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      // return res.status(422).json({ status: "FAILED", errors: errors.array() });
      return next(createError(422, errors.array()));
    next();
  },
];

const create = [
  body("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name minimum 3 characters required!")
    .bail(),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email name can not be empty!")
    .isEmail()
    .withMessage("Invalid email address!")
    .bail(),
  body("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Password can not be empty!")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password minimum 8 characters required!")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      //return res.status(422).json({ status: "FAILED", errors: errors.array() });
      return next(createError(422, errors.array()));
    next();
  },
];

const update = [
  body("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name minimum 3 characters required!")
    .bail(),
  body("email")
    .if((value, { req }) => req.body.email)
    .isEmail()
    .withMessage("Invalid email!")
    .bail()
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already exists!");
        }
      });
    }),
  body("password")
    .if((value, { req }) => req.body.password)
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Password can not be empty!")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password minimum 8 characters required!")
    .bail(),
  body("rol")
    .if((value, { req }) => req.body.rol)
    .isIn(allowedRoles)
    .withMessage("Invalid rol!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      //return res.status(422).json({ status: "FAILED", errors: errors.array() });
      return next(createError(422, errors.array()));
    next();
  },
];

export default {
  create,
  update,
  auth,
};
