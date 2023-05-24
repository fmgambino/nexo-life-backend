import { body, validationResult } from "express-validator";
import createError from "../errors/createError.js";

const create = [
  body("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Name is required!")
    .bail(),
  body("last_name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Last name is required!")
    .bail(),
  body("address")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Address is required!")
    .bail(),
  body("location")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Locality is required!")
    .bail(),
  body("phone")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Phone is required!")
    .bail(),
  body("another_church")
    .notEmpty()
    .withMessage("Field is required!")
    .bail(),
  body("to_be_visited")
    .notEmpty()
    .withMessage("Field is required!")
    .bail(),
  body("responsible")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Responsible is required!")
    .bail(),
  body("family_status")
    .optional()
    .isIn(["CASADO", "SOLTERO"])
    .withMessage("Invalid family status!")
    .bail(),
  body("destination")
    .optional()
    .isIn(["CONSOLIDADO", "EN_ORACIÓN", "EN_PROCESO", "OTRA_IGLESIA", "VISITA"])
    .withMessage("Invalid destination!")
    .bail(),
  body("comments.*.status")
    .optional()
    .isIn([
      "VISITADO",
      "CONTACTO_TELEFONICO",
      "NO_INFORMO",
      "NO_CONSOLIDO",
      "NO_RECIBIO",
    ])
    .withMessage("Invalid comment status!")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return next(createError(422, errors.array()));
    next();
  },
];

export default {create};
