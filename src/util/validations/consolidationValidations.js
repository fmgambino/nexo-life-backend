import { check, validationResult } from "express-validator";
import createError from "../errors/createError.js";

const create = [
  check("full_name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Full Name can not be empty!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Full Name minimum 3 characters required!")
    .bail(),
  check("destination")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Destination can not be empty!")
    .bail(),
  check("invited_by")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Invited By can not be empty!")
    .bail(),
  check("consolidator")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Consolidator By can not be empty!")
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
};
