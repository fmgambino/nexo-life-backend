

import { Router } from "express";

import discipleController from "../../controllers/discipleController.js";
import authMiddleware from "../../middleware/jwt.js";




const router = Router();


/**
 * @swagger
 * tags:
 *   name: Disciple
 *   description: Endpoints for managing direct disciples
 */

/**
 * @swagger
 * definitions:
 *   DirectDiscipleInput:
 *     type: object
 *     properties:
 *       leader:
 *         type: string
 *         format: ObjectId
 *         example: 647748b0b2e9c58a809d8279
 *       age:
 *         type: number
 *         format: int32
 *         example: 22
 *       name:
 *         type: string
 *         example: Dayan Alejandro Barboza
 *       phone:
 *         type: string
 *         example: 800-123-4567
 *       retreat:
 *         type: boolean
 *         example: true
 *       biblical_school:
 *         type: boolean
 *         example: false
 *       observations:
 *         type: string
 *         example: Some observations about the disciple
 *       date:
 *         type: string
 *         format: date-time
 *         example: "2014-06-25T00:00:00.000Z"
 *       network_disciples:
 *         type: array
 *         items:
 *           $ref: '#/definitions/NetworkDiscipleInput'
 *
 *   NetworkDiscipleInput:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Carlos Pereza
 *       weeks:
 *         type: array
 *         items:
 *           $ref: '#/definitions/WeekInput'
 *
 *   WeekInput:
 *     type: object
 *     properties:
 *       presente:
 *         type: string
 *         example: present
 *       fecha:
 *         type: string
 *         format: date-time
 *         example: "2014-06-01T03:00:00.000Z"
 *       donaciones:
 *         type: string
 *         example: Some donations information
 *       observaciones:
 *         type: string
 *         example: Some observations about the week
 *
 *   DirectDiscipleOutput:
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *       direct_disciple:
 *         $ref: '#/definitions/Disciple'
 *
 *   Disciple:
 *     type: object
 *     properties:
 *       leader:
 *         type: string
 *         format: ObjectId
 *         example: 647748b0b2e9c58a809d8279
 *       age:
 *         type: number
 *         format: int32
 *         example: 22
 *       name:
 *         type: string
 *         example: Dayan Alejandro Barboza
 *       phone:
 *         type: string
 *         example: 800-123-4567
 *       retreat:
 *         type: boolean
 *         example: true
 *       biblical_school:
 *         type: boolean
 *         example: false
 *       observations:
 *         type: string
 *         example: Some observations about the disciple
 *       date:
 *         type: string
 *         format: date-time
 *       network_disciples:
 *         type: array
 *         items:
 *           $ref: '#/definitions/NetworkDisciple'
 *       _id:
 *         type: string
 *         example: 6476bb7a506e6096569acaef
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 *
 *   NetworkDisciple:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Carlos Pereza
 *       weeks:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Week'
 *
 *   Week:
 *     type: object
 *     properties:
 *       presente:
 *         type: string
 *         example: present
 *       fecha:
 *         type: string
 *         format: date-time
 *         example: "2014-06-01T03:00:00.000Z"
 *       donaciones:
 *         type: string
 *         example: Some donations information
 *       observaciones:
 *         type: string
 *         example: Some observations about the week
 */

/**
 * @swagger
 * /disciple:
 *   post:
 *     summary: Create a direct disciple
 *     tags: [Disciple]
 *     description: Creates a new direct disciple.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/DirectDiscipleInput'
 *     responses:
 *       200:
 *         description: Direct disciple created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/DirectDiscipleOutput'
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
  authMiddleware.isAuthenticated,
  discipleController.create
);

/**
 * @swagger
 * /api/disciple/{id}/add-dr:
 *   post:
 *     summary: Add a Network Disciple to a Direct Disciple
 *     tags: [Disciple]
 *     description: Adds a Network Disciple to a Direct Disciple by their ID.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Direct Disciple.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Carlos Pereza
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Network Disciple added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request body or invalid Direct Disciple ID.
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
  '/:id/add-dr',
  authMiddleware.isAuthenticated,
  discipleController.addDR
);


/**
 * @swagger
 * /disciple/{directDiscipleId}/add-week/{networkDiscipleId}:
 *   post:
 *     summary: Add a week to a network disciple of a direct disciple
 *     tags: [Disciple]
 *     description: Adds a new week to the specified network disciple of a direct disciple.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: directDiscipleId
 *         required: true
 *         description: The ID of the direct disciple.
 *         schema:
 *           type: string
 *       - in: path
 *         name: networkDiscipleId
 *         required: true
 *         description: The ID of the network disciple.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WeekInput'
 *     responses:
 *       200:
 *         description: Week added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NetworkDisciple'
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
  '/:directDiscipleId/add-week/:networkDiscipleId',
  authMiddleware.isAuthenticated,
  discipleController.addWeek
);

/**
 * @swagger
 * /disciple/{id}:
 *   put:
 *     summary: Update a direct disciple
 *     tags: [Disciple]
 *     description: Updates an existing direct disciple.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the direct disciple
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/DirectDiscipleInput'
 *     responses:
 *       200:
 *         description: Direct disciple updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/DirectDiscipleOutput'
 *       400:
 *         description: Invalid request body or direct disciple ID.
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
 *         description: Direct disciple not found.
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
router.put(
  '/:id',
  authMiddleware.isAuthenticated,
  discipleController.update
);
/**
 * @swagger
* /disciple/{id}:
*   get:
*     summary: Get a direct disciple by ID
*     tags: [Disciple]
*     description: Retrieves a direct disciple by ID.
*     security:
*       - Authorization: []
*     parameters:
*       - name: id
*         in: path
*         description: ID of the direct disciple
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Direct disciple retrieved successfully.
*         content:
*           application/json:
*             schema:
*               $ref: '#/definitions/DirectDiscipleOutput'
*       400:
*         description: Invalid direct disciple ID.
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
*         description: Direct disciple not found.
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
  authMiddleware.isAuthenticated,
  discipleController.getById
);
/**
* @swagger
* /disciple:
*   get:
*     summary: Get all direct disciples
*     tags: [Disciple]
*     description: Retrieves a list of all direct disciples.
*     security:
*       - Authorization: []
*     responses:
*       200:
*         description: Direct disciples retrieved successfully.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: boolean
*                   example: true
*                 direct_disciples:
*                   type: array
*                   items:
*                     $ref: '#/definitions/Disciple'
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
*         description: No direct disciples found.
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
  '/',
  authMiddleware.isAuthenticated,
  discipleController.getAll
);

/**
* @swagger
* /disciple/{id}:
*   delete:
 *     summary: Delete a direct disciple
 *     tags: [Disciple]
 *     description: Deletes an existing direct disciple.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the direct disciple
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Direct disciple deleted successfully.
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
 *       400:
 *         description: Invalid direct disciple ID.
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
 *         description: Direct disciple not found.
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
router.delete(
  '/:id',
  authMiddleware.isAuthenticated,
  discipleController.remove
);

/**
 * @swagger
 * /disciple/{directDiscipleId}/{networkDiscipleId}/{weekId}:
 *   delete:
 *     summary: Remove a week from a network disciple in a direct disciple
 *     tags: [Disciple]
 *     description: Removes a week from a network disciple in a direct disciple.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: directDiscipleId
 *         required: true
 *         description: ID of the direct disciple.
 *         schema:
 *           type: string
 *       - in: path
 *         name: networkDiscipleId
 *         required: true
 *         description: ID of the network disciple.
 *         schema:
 *           type: string
 *       - in: path
 *         name: weekId
 *         required: true
 *         description: ID of the week to remove.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Week removed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request parameters or body.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized. Authentication token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Direct disciple, network disciple, or week not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


router.delete(
  '/:directDiscipleId/:networkDiscipleId/:weekId',
  authMiddleware.isAuthenticated,
  discipleController.removeWeek
);


export default router;
