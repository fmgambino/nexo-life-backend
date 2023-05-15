import { Router } from "express";
const router = Router();

import commentController from "../../controllers/commentController.js";
import authMiddleware from "../../middleware/jwt.js";
import consolidationValidations from "../../util/validations/consolidationValidations.js";

router
  .post(
    "/:id",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    commentController.create
  )
  .delete("/:id", authMiddleware.isAuthenticated, commentController.remove);

export default router;
