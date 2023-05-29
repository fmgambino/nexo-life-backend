

import { Router } from "express";
import { check } from'express-validator';

import discipleshipController from "../../controllers/discipleshipController.js";
import authMiddleware from "../../middleware/jwt.js";



const router = Router();



/**
 * @swagger
 * tags:
 *   name: Discipleship
 *   description: Discipleship management endpoints
 */

/**
 * @swagger
 * /api/v1/discipleships:
 *   post:
 *     summary: Create a discipleship
 *     tags: [Discipleship]
 *     description: Creates a new discipleship.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DiscipleshipInput'
 *     responses:
 *       200:
 *         description: Discipleship created successfully.
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
 *                     coordinator:
 *                       type: string
 *                     discipler:
 *                       type: string
 *                     serviceArea:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     cellAddress:
 *                       type: string
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post(
  "/",
  [
    check("name", "Name is required").notEmpty(),
    check("coordinator", "Coordinator is required").notEmpty(),
    check("discipler", "Discipler is required").notEmpty(),
    check("serviceArea", "Service area is required").notEmpty(),
    check("phone", "Phone is required").notEmpty(),
    check("cellAddress", "Cell address is required").notEmpty(),
  ],
  authMiddleware.isAuthenticated,
  discipleshipController.create
);

router.put(
  "/:id",
  [
    check("id", "Not a valid ID").isMongoId(),
    check("name", "Name is required").notEmpty(),
    check("coordinator", "Coordinator is required").notEmpty(),
    check("discipler", "Discipler is required").notEmpty(),
    check("serviceArea", "Service area is required").notEmpty(),
    check("phone", "Phone is required").notEmpty(),
    check("cellAddress", "Cell address is required").notEmpty(),
  ],
  authMiddleware.isAuthenticated,
  discipleshipController.update
);

router.delete("/:id", authMiddleware.isAuthenticated, discipleshipController.remove);


export default router;
