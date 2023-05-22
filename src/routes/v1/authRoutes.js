

import { Router } from "express";
import { check } from'express-validator';


const router = Router();

import authController from "../../controllers/authController.js";
import authMiddleware from "../../middleware/jwt.js";
import authValidations from "../../util/validations/authRouteValidations.js";

/**
 * @swagger
 * /auth/update-password:
 *   put:
 *     summary: Update user password
 *     description: Updates a user's password based on their email address.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
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
 *                 error:
 *                   type: string
 *       422:
 *         description: Missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put("/update-password",  authController.updatePassword);


/**
 * @swagger
 * /auth:
 *   post:
 *     summary: User authentication
 *     tags: [Auth]
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
 *       422:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       value:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
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


 /**
 * @swagger
 * /auth/request-password-change:
 *   post:
 *     summary: Request password change
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: An email has been sent with password reset instructions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: No user was found with the provided email address.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       422:
 *         description: The email field cannot be empty.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: An error occurred while sending the email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
 router.post("/request-password-change", authController.requestPasswordChange);
  
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
    [
      check('id', 'Not a valid ID').isMongoId(),
      authValidations.update,
      authMiddleware.isAuthenticated
  ],
    authController.update
  );



 /**
 * @swagger
 * /auth/{id}:
 *   get:
 *     summary: Get user information
 *     description: Retrieves information of a user.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       406:
 *         description: Request error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
 router.get(
    "/:id", 
    [
      check('id').isMongoId().withMessage('Not a valid ID'),
      authMiddleware.isAuthenticated
  ],
    authController.getUserById
  );

 router.delete("/:id", authMiddleware.isAuthenticated, authController.remove);

export default router;
