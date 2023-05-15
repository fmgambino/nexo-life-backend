import { Router } from "express";
// const { Router } = require('express');

const router = Router();

import authController from "../../controllers/authController.js";
import authMiddleware from "../../middleware/jwt.js";
import authValidations from "../../util/validations/authRouteValidations.js";

router
  .post("/", authValidations.auth, authController.authUser)
  .get("/", authMiddleware.isAuthenticated, authController.getAll)
  .get(
    "/responsibles",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator"]),
    authController.getAllResponsibles
  )
  .post(
    "/create",
    authValidations.create,
    authMiddleware.isAuthenticated,
    authController.authCreateUser
  )
  .put(
    "/:id",
    authValidations.update,
    authMiddleware.isAuthenticated,
    authController.update
  )
  .delete("/:id", authMiddleware.isAuthenticated, authController.remove);

export default router;
