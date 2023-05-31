

import { Router } from "express";

import leaderController from "../../controllers/leaderController.js";
import authMiddleware from "../../middleware/jwt.js";
import { dataEntry, remove } from "../../util/validations/leaderValidations.js";




const router = Router();



/**
 * @swagger
 * tags:
 *   name: Leader
 *   description: Leader management endpoints
 */

/**
 * @swagger
 * definitions:
 *   LeaderInput:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Dayan Alejandro Barboza
 *       coordinator:
 *         type: string
 *         format: ObjectId
 *         example: 6462c6d259ba42028a3d18ce
 *       discipler:
 *         type: string
 *         example: Roman Benitez
 *       dd:
 *         type: number
 *         format: int32
 *         example: 0
 *       dr:
 *         type: number
 *         format: int32
 *         example: 0
 *       attendance:
 *         type: number
 *         format: int32
 *         example: 0
 *       serviceArea:
 *         type: string
 *         example: Limpieza
 *       phone:
 *         type: string
 *         example: +543489595095
 *       cellAddress:
 *         type: string
 *         example: Granaderos 831, B2804 Campana, Provincia de Buenos Aires
 *
 *   LeaderOutput:
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *       leader:
 *         $ref: '#/definitions/Leader'
 *
 *   Leader:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Dayan Alejandro Barboza
 *       coordinator:
 *         type: string
 *         format: ObjectId
 *         example: 6462c6d259ba42028a3d18ce
 *       discipler:
 *         type: string
 *         example: Roman Benitez
 *       dd:
 *         type: number
 *         format: int32
 *         example: 0
 *       dr:
 *         type: number
 *         format: int32
 *         example: 0
 *       attendance:
 *         type: number
 *         format: int32
 *         example: 0
 *       serviceArea:
 *         type: string
 *         example: Limpieza
 *       phone:
 *         type: string
 *         example: +543489595095
 *       cellAddress:
 *         type: string
 *         example: Granaderos 831, B2804 Campana, Provincia de Buenos Aires
 *       _id:
 *         type: string
 *         example: 6476bb7a506e6096569acaef
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 */

/**
 * @swagger
 * /leader:
 *   post:
 *     summary: Create a leader
 *     tags: [Leader]
 *     description: Creates a new leader.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/LeaderInput'
 *     responses:
 *       200:
 *         description: Leader created successfully.
*         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/LeaderOutput'
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
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
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 */
router.post(
  '/',
  dataEntry,
  authMiddleware.isAuthenticated,
  leaderController.create
);

/**
 * @swagger
 * /leader/{id}:
 *   put:
 *     summary: Update a leader
 *     tags: [Leader]
 *     description: Updates an existing leader.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the leader to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/LeaderInput'
 *     responses:
 *       200:
 *         description: Leader updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/LeaderOutput'
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
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
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 */
router.put(
  '/:id',
  dataEntry,
  authMiddleware.isAuthenticated,
  leaderController.update
);


/**
 * @swagger
 * /leader/{id}:
 *   get:
 *     summary: Get a leader by ID
 *     tags: [Leader]
 *     description: Retrieves a leader by its ID.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the leader to retrieve.
 *     responses:
 *       200:
 *         description: Leader retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/LeaderOutput'
 *       400:
 *         description: Invalid request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
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
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 *       404:
 *         description: Leader not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 */
router.get(
  '/:id',
  remove,
  authMiddleware.isAuthenticated,
  leaderController.getById
);

/**
 * @swagger
 * /leader:
 *   get:
 *     summary: Get all leaders
 *     tags: [Leader]
 *     description: Retrieves all leaders.
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Leaders retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/LeaderOutput'
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 */
router.get(
  '/',
  authMiddleware.isAuthenticated,
  leaderController.getAll
);


/**
 * @swagger
 * /leader/{id}:
 *   delete:
 *     summary: Delete a leader
 *     tags: [Leader]
 *     description: Deletes a leader by its ID.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the leader to delete.
 *     responses:
 *       200:
 *         description: Leader deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Leader Item Removed Successfully
 *       400:
 *         description: Invalid request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
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
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 */
router.delete(
  '/:id',
   remove,
  authMiddleware.isAuthenticated,
  leaderController.remove
);


export default router;
