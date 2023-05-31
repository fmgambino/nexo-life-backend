import { body, validationResult, param } from "express-validator";
import createError from "../errors/createError.js";

const dataEntry = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required!")
    .isLength({ min: 3 })
    .withMessage("Name must have at least 3 characters")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Name must contain only alphabetic characters"),
  body("coordinator")
    .isMongoId()
    .withMessage("Coordinator is required"),
  body("discipler")
    .not()
    .isEmpty()
    .withMessage("Discipler is required!")
    .isLength({ min: 3 })
    .withMessage("Discipler must have at least 3 characters")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Discipler must contain only alphabetic characters"),
  body("dd")
    .optional({ nullable: true })
    .isNumeric()
    .withMessage("dd must be a numeric value"),
  body("dr")
    .optional({ nullable: true })
    .isNumeric()
    .withMessage("dr must be a numeric value"),
  body("attendance")
    .optional({ nullable: true })
    .isNumeric()
    .withMessage("attendance must be a numeric value"),
  body("serviceArea")
    .not()
    .isEmpty()
    .withMessage("Service area is required!")
    .isLength({ min: 3 })
    .withMessage("Service area must have at least 3 characters"),
  body("phone")
    .not()
    .isEmpty()
    .withMessage("Phone is required!")
    .isLength({ min: 6, max: 13 })
    .withMessage("Phone must have a length between 6 and 12 characters")
    .matches(/^\+[\d]+$/)
    .withMessage("Phone must start with '+' and contain only digits"),
  body("cellAddress")
    .not()
    .isEmpty()
    .withMessage("Cell address is required"),
    (req, res, next) => {
      if (req.params.id) {
        param('id')
          .isMongoId()
          .withMessage('Not a valid ID')
          .run(req);
      }
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(createError(422, errors.array()));
      }
  
      next();
    },
];

const remove = [
  param('id').isMongoId().withMessage('Not a valid ID'),
  (req, res, next) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(422, errors.array()));
    }

    next();
  },
];

export {dataEntry, remove};
