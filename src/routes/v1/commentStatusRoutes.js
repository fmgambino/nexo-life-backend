

import { Router } from "express";

const router = Router();

import commentStatus from "../../controllers/commetStatusController.js";
import authMiddleware from "../../middleware/jwt.js";

/**
 * Get all comment status.
 *
 * @swagger
 * /comment-status:
 *   get:
 *     summary: Get all comment status.
 *     tags: [Comment Status]
 *     responses:
 *       '200':
 *         description: OK. Comment status retrieved successfully.
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
 *                   items:
 *                     $ref: '#/components/schemas/CommentStatus'
 *             example:
 *               status: true
 *               data: [
 *                 {
 *                   "_id": "646e0f25b458d9a4fc518b11",
 *                   "status": "Visitado",
 *                   "color": "#00ff00",
 *                   "__v": 0,
 *                   "createdAt": "2023-05-24T13:20:37.816Z",
 *                   "updatedAt": "2023-05-24T13:20:37.816Z"
 *                 },
 *                 {
 *                   "_id": "646e0f25b458d9a4fc518b12",
 *                   "status": "Contacto teléfonico",
 *                   "color": "#FFA500",
 *                   "__v": 0,
 *                   "createdAt": "2023-05-24T13:20:37.816Z",
 *                   "updatedAt": "2023-05-24T13:20:37.816Z"
 *                 },
 *                 {
 *                   "_id": "646e0f25b458d9a4fc518b13",
 *                   "status": "No informo",
 *                   "color": "#FF7700",
 *                   "__v": 0,
 *                   "createdAt": "2023-05-24T13:20:37.816Z",
 *                   "updatedAt": "2023-05-24T13:20:37.816Z"
 *                 },
 *                 {
 *                   "_id": "646e0f25b458d9a4fc518b14",
 *                   "status": "No consolidado",
 *                   "color": "#FF0000",
 *                   "__v": 0,
 *                   "createdAt": "2023-05-24T13:20:37.816Z",
 *                   "updatedAt": "2023-05-24T13:20:37.816Z"
 *                 },
 *                 {
 *                   "_id": "646e0f25b458d9a4fc518b15",
 *                   "status": "No recibió",
 *                   "color": "#0000ff",
 *                   "__v": 0,
 *                   "createdAt": "2023-05-24T13:20:37.817Z",
 *                   "updatedAt": "2023-05-24T13:20:37.817Z"
 *                 }
 *               ]
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
 *         description: Internal Server Error. An error occurred while retrieving comment status.
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
router.get("/", authMiddleware.isAuthenticated, commentStatus.getAllCommentStatus);

export default router;
