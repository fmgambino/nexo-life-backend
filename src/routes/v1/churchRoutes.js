import { Router } from "express";
const router = Router();

import churchController from "../../controllers/churchController.js";
import authMiddleware from "../../middleware/jwt.js";
import churchValidations from "../../util/validations/churchValidations.js";

router
  .post(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["SuperAdministrator"]),
    churchValidations.createAndUpdate,
    churchController.create
  )
  .get(
    "/",
    //churchValidations.updateAndDelete,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["SuperAdministrator"]),
    churchController.getAll
  )
  .put(
    "/:id",
    churchValidations.createAndUpdate,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["SuperAdministrator"]),
    churchController.update
  )
  .delete(
    "/:id",
    //churchValidations.updateAndDelete,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["SuperAdministrator"]),
    churchController.remove
  );

export default router;
