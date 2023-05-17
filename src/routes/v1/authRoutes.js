

import { Router } from "express";


const router = Router();

import authController from "../../controllers/authController.js";
import authMiddleware from "../../middleware/jwt.js";
import authValidations from "../../util/validations/authRouteValidations.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: here you will find all respect to the user
 * /auth:
 *   post:
 *     summary: user authentication
 *     tags: [AuthUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/userModel'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */

  router.post("/", authValidations.auth, authController.authUser);
  
  router.get("/", authMiddleware.isAuthenticated, authController.getAll);
  router.get(
    "/responsibles",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator"]),
    authController.getAllResponsibles
  );
  router.post(
    "/create",
    authValidations.create,
    authMiddleware.isAuthenticated,
    authController.authCreateUser
  );
  router.put(
    "/:id",
    authValidations.update,
    authMiddleware.isAuthenticated,
    authController.update
  );
  router.delete("/:id", authMiddleware.isAuthenticated, authController.remove);

export default router;
