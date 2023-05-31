

import { Router } from "express";

import discipleshipController from "../../controllers/discipleshipController.js";
import authMiddleware from "../../middleware/jwt.js";
import { dataEntry, remove } from "../../util/validations/discipleshipValidations.js";




const router = Router();



/**
 * @swagger
 * tags:
 *   name: Discipleship
 *   description: Discipleship management endpoints
 */

/**
 * @swagger
 * definitions:
 *   DiscipleshipInput:
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
 *   DiscipleshipOutput:
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *       discipleship:
 *         $ref: '#/definitions/Discipleship'
 *
 *   Discipleship:
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
 * /discipleship:
 *   post:
 *     summary: Create a discipleship
 *     tags: [Discipleship]
 *     description: Creates a new discipleship.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/DiscipleshipInput'
 *     responses:
 *       200:
 *         description: Discipleship created successfully.
*         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/DiscipleshipOutput'
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
  discipleshipController.create
);

/**
 * @swagger
 * /discipleship/{id}:
 *   put:
 *     summary: Update a discipleship
 *     tags: [Discipleship]
 *     description: Updates an existing discipleship.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the discipleship to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/DiscipleshipInput'
 *     responses:
 *       200:
 *         description: Discipleship updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/DiscipleshipOutput'
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
  discipleshipController.update
);


/**
 * @swagger
 * /discipleship/{id}:
 *   get:
 *     summary: Get a discipleship by ID
 *     tags: [Discipleship]
 *     description: Retrieves a discipleship by its ID.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the discipleship to retrieve.
 *     responses:
 *       200:
 *         description: Discipleship retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/DiscipleshipOutput'
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
 *         description: Discipleship not found.
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
  discipleshipController.getById
);

/**
 * @swagger
 * /discipleship:
 *   get:
 *     summary: Get all discipleships
 *     tags: [Discipleship]
 *     description: Retrieves all discipleships.
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Discipleships retrieved successfully.
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
 *                     $ref: '#/definitions/DiscipleshipOutput'
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
  discipleshipController.getAll
);


/**
 * @swagger
 * /discipleship/{id}:
 *   delete:
 *     summary: Delete a discipleship
 *     tags: [Discipleship]
 *     description: Deletes a discipleship by its ID.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the discipleship to delete.
 *     responses:
 *       200:
 *         description: Discipleship deleted successfully.
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
 *                   example: Discipleship Item Removed Successfully
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
  discipleshipController.remove
);


export default router;
