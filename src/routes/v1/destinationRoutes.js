

import { Router } from "express";

const router = Router();

import destination from "../../controllers/destinationController.js";
import authMiddleware from "../../middleware/jwt.js";

/**
 * Get all destinations.
 *
 * @swagger
 * /destinations:
 *   get:
 *     summary: Get all destinations.
 *     tags: [Destination]
 *     responses:
 *       '200':
 *         description: OK. Destinations retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: true
 *                 data:
 *                   type: array
 *                   
 *                     
 *             example:
 *               status: true
 *               data:
 *                 - _id: "646e03ef9c2c3a572b3b8d9c"
 *                   destination: "Consolidado"
 *                   color: "#008000"
 *                   __v: 0
 *                   createdAt: "2023-05-24T12:32:47.072Z"
 *                   updatedAt: "2023-05-24T12:32:47.072Z"
 *                 - _id: "646e03ef9c2c3a572b3b8d9d"
 *                   destination: "En oración/baa"
 *                   color: "#FF0000"
 *                   __v: 0
 *                   createdAt: "2023-05-24T12:32:47.072Z"
 *                   updatedAt: "2023-05-24T12:32:47.072Z"
 *                 - _id: "646e03ef9c2c3a572b3b8d9e"
 *                   destination: "Otra iglesia"
 *                   color: "#0000FF"
 *                   __v: 0
 *                   createdAt: "2023-05-24T12:32:47.072Z"
 *                   updatedAt: "2023-05-24T12:32:47.072Z"
 *                 - _id: "646e03ef9c2c3a572b3b8d9f"
 *                   destination: "Visita"
 *                   color: "#FFA500"
 *                   __v: 0
 *                   createdAt: "2023-05-24T12:32:47.073Z"
 *                   updatedAt: "2023-05-24T12:32:47.073Z"
 *                 - _id: "646e03ef9c2c3a572b3b8da0"
 *                   destination: "En proceso"
 *                   color: "#808080"
 *                   __v: 0
 *                   createdAt: "2023-05-24T12:32:47.073Z"
 *                   updatedAt: "2023-05-24T12:32:47.073Z"
 *       '401':
 *         description: Unauthorized. User is not authorized to access this endpoint.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 *                   example: Not authorized!
 *       '500':
 *         description: Internal Server Error. An error occurred while retrieving destinations.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 *                   example: Internal Server Error.
 */

router.get("/", authMiddleware.isAuthenticated, destination.getAllDestinations);

export default router;
