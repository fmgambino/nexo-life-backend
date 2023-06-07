

// import { Router } from "express";

// import AttendanceController from "../../controllers/weekController.js";
// import authMiddleware from "../../middleware/jwt.js";
// // import { dataEntry, remove } from "../../util/validations/discipleshipValidations.js";




// const router = Router();



// /**
//  * @swagger
//  * tags:
//  *   name: Attendance
//  *   description: Attendance management endpoints
//  */

// /**
//  * @swagger
//  * definitions:
//  *   AttendanceSchema:
//  *     type: object
//  *     properties:
//  *       lider:
//  *         type: string
//  *         format: ObjectId
//  *         example: 6476bb7a506e6096569acaef
//  *       year:
//  *         type: number
//  *         example: 2023
//  *       month:
//  *         type: string
//  *         example: May
//  *       weeks:
//  *         type: array
//  *         items:
//  *           $ref: '#/definitions/Week'
//  *     required:
//  *       - lider
//  *       - year
//  *       - month
//  *       - weeks
//  *
//  *   Week:
//  *     type: object
//  *     properties:
//  *       weekNumber:
//  *         type: number
//  *       status:
//  *         type: string
//  */

// /**
//  * @swagger
//  * /attendance:
//  *   post:
//  *     summary: Create a attendance
//  *     tags: [Attendance]
//  *     description: Creates a new attendance.
//  *     security:
//  *       - Authorization: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/definitions/DiscipleshipInput'
//  *     responses:
//  *       200:
//  *         description: Discipleship created successfully.
// *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/definitions/DiscipleshipOutput'
//  *       400:
//  *         description: Invalid request body.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 400
//  *                 message:
//  *                   type: string
//  *       401:
//  *         description: Unauthorized. Authentication token is missing or invalid.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 401
//  *                 message:
//  *                   type: string
//  */
// router.post(
//   '/',
//   dataEntry,
//   authMiddleware.isAuthenticated,
//   discipleshipController.create
// );

// /**
//  * @swagger
//  * /discipleship/{id}:
//  *   put:
//  *     summary: Update a discipleship
//  *     tags: [Discipleship]
//  *     description: Updates an existing discipleship.
//  *     security:
//  *       - Authorization: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID of the discipleship to update.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/definitions/DiscipleshipInput'
//  *     responses:
//  *       200:
//  *         description: Discipleship updated successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/definitions/DiscipleshipOutput'
//  *       400:
//  *         description: Invalid request body.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 400
//  *                 message:
//  *                   type: string
//  *       401:
//  *         description: Unauthorized. Authentication token is missing or invalid.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 401
//  *                 message:
//  *                   type: string
//  */
// router.put(
//   '/:id',
//   dataEntry,
//   authMiddleware.isAuthenticated,
//   discipleshipController.update
// );


// /**
//  * @swagger
//  * /discipleship/{id}:
//  *   get:
//  *     summary: Get a discipleship by ID
//  *     tags: [Discipleship]
//  *     description: Retrieves a discipleship by its ID.
//  *     security:
//  *       - Authorization: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID of the discipleship to retrieve.
//  *     responses:
//  *       200:
//  *         description: Discipleship retrieved successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/definitions/DiscipleshipOutput'
//  *       400:
//  *         description: Invalid request parameters.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 400
//  *                 message:
//  *                   type: string
//  *       401:
//  *         description: Unauthorized. Authentication token is missing or invalid.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 401
//  *                 message:
//  *                   type: string
//  *       404:
//  *         description: Discipleship not found.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 404
//  *                 message:
//  *                   type: string
//  */
// router.get(
//   '/:id',
//   remove,
//   authMiddleware.isAuthenticated,
//   discipleshipController.getById
// );

// /**
//  * @swagger
//  * /discipleship:
//  *   get:
//  *     summary: Get all discipleships
//  *     tags: [Discipleship]
//  *     description: Retrieves all discipleships.
//  *     security:
//  *       - Authorization: []
//  *     responses:
//  *       200:
//  *         description: Discipleships retrieved successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: boolean
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/definitions/DiscipleshipOutput'
//  *       401:
//  *         description: Unauthorized. Authentication token is missing or invalid.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 401
//  *                 message:
//  *                   type: string
//  */
// router.get(
//   '/',
//   authMiddleware.isAuthenticated,
//   discipleshipController.getAll
// );


// /**
//  * @swagger
//  * /discipleship/{id}:
//  *   delete:
//  *     summary: Delete a discipleship
//  *     tags: [Discipleship]
//  *     description: Deletes a discipleship by its ID.
//  *     security:
//  *       - Authorization: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID of the discipleship to delete.
//  *     responses:
//  *       200:
//  *         description: Discipleship deleted successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: Discipleship Item Removed Successfully
//  *       400:
//  *         description: Invalid request parameters.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 400
//  *                 message:
//  *                   type: string
//  *       401:
//  *         description: Unauthorized. Authentication token is missing or invalid.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 401
//  *                 message:
//  *                   type: string
//  */
// router.delete(
//   '/:id',
//    remove,
//   authMiddleware.isAuthenticated,
//   discipleshipController.remove
// );


// export default router;
