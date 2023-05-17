

import { Router } from "express";


const router = Router();

import authController from "../../controllers/authController.js";
import authMiddleware from "../../middleware/jwt.js";
import authValidations from "../../util/validations/authRouteValidations.js";

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: user authentication
 *     tags: [AuthUser]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success. Returns the requested user with its respective token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     profile:
 *                       type: string
 *                     rol:
 *                       type: string
 *                     address:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     status:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                 token:
 *                   type: string
 *       401:
 *         description: Incorrect password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error.
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
