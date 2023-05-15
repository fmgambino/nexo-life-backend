import { check, param, validationResult } from "express-validator";
import createError from "../errors/createError.js";

const createAndUpdate = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name name can not be empty!")
    .bail(),
  check("address")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Address can not be empty!")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      // return res.status(422).json({ status: "FAILED", errors: errors.array() });
      return next(createError(422, errors.array()));
    next();
  },
];

export default {
  createAndUpdate,
};
