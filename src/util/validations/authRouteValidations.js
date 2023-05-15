import { check, validationResult } from "express-validator";
import createError from "../errors/createError.js";

const auth = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email name can not be empty!")
    .bail()
    .isEmail()
    .withMessage("Invalid email address!")
    .bail(),
  check("password")
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
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name minimum 3 characters required!")
    .bail(),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email name can not be empty!")
    .isEmail()
    .withMessage("Invalid email address!")
    .bail(),
  check("password")
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
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name minimum 3 characters required!")
    .bail(),
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
