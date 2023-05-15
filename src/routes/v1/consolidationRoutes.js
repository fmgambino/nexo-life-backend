import { Router } from "express";
const router = Router();

import consolidationController from "../../controllers/consolidationController.js";
import authMiddleware from "../../middleware/jwt.js";
import consolidationValidations from "../../util/validations/consolidationValidations.js";

router
  .post(
    "/",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.create
  )
  .get(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.getAll
  )
  .get(
    "/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.getOne
  )
  .put(
    "/:id",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.update
  )
  .put(
    "/:id/comment",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.createComent
  )
  .put(
    "/:id/comment/:commentId",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.removeComment
  )
  // .put(
  //   "/:id/week",
  //   //consolidationValidations.create,
  //   authMiddleware.isAuthenticated,
  //   authMiddleware.checkRole(["Administrator", "Consolidator"]),
  //   consolidationController.createWeek
  // )
  // .put(
  //   "/:id/week/:weekId",
  //   //consolidationValidations.create,
  //   authMiddleware.isAuthenticated,
  //   authMiddleware.checkRole(["Administrator", "Consolidator"]),
  //   consolidationController.removeWeek
  // )
  // .put(
  //   "/:id/updateWeek/:weekId",
  //   //consolidationValidations.create,
  //   authMiddleware.isAuthenticated,
  //   authMiddleware.checkRole(["Administrator", "Consolidator"]),
  //   consolidationController.updateWeek
  // )
  .delete(
    "/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.remove
  );

export default router;
