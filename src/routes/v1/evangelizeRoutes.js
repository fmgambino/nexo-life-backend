import { Router } from "express";
const router = Router();

import evangelizationController from "../../controllers/evangelizeController.js";
import authMiddleware from "../../middleware/jwt.js";
router
  .post(
    "/",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.create
  )
  .get(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.getAll
  )
  .get(
    "/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.getOne
  )
  .put(
    "/promote/:id",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.promote
  )
  .put(
    "/:id",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.update
  )
  .put(
    "/:id/comment",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.createComent
  )
  .put(
    "/:id/comment/:commentId",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.removeComment
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
  .put(
    "/:id/updateWeek/:dateId/:weekId",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.updateWeek
  )
  .put(
    "/insert",
    //authMiddleware.isAuthenticated,
    //authMiddleware.checkRole(["Administrator", "Consolidator"]),
    evangelizationController.insert
  )
  .delete(
    "/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.remove
  );

export default router;
