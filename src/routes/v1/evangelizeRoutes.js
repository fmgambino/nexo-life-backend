import { Router } from "express";
const router = Router();

import evangelizationController from "../../controllers/evangelizeController.js";
import authMiddleware from "../../middleware/jwt.js";
import evangelizeValidations from "../../util/validations/evangelizeValidations.js";

/**
 * @swagger
 * /evangelization:
 *   post:
 *     summary: Create a new record.
 *     tags: [Evangelization]
 *     description: Create a new record with unique name and last_name combination.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John 2
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               age:
 *                 type: number
 *                 example: 30
 *               family_status:
 *                 type: string
 *                 enum: [CASADO, SOLTERO]
 *                 example: SOLTERO
 *               address:
 *                 type: string
 *                 example: 123MainSt
 *               location:
 *                 type: string
 *                 example: City
 *               phone:
 *                 type: string
 *                 example: 123456789
 *               another_church:
 *                 type: boolean
 *                 example: false
 *               to_be_visited:
 *                 type: boolean
 *                 example: true
 *               responsible:
 *                 type: string
 *                 format: ObjectId
 *                 example: 615ae7a0644e877d18b6d5e1
 *               church:
 *                 type: string
 *                 format: ObjectId
 *                 example: 615ae7a0644e877d18b6d5e2
 *               destination:
 *                 type: string
 *                 enum: [CONSOLIDADO, EN_ORACIÓN, EN_PROCESO, OTRA_IGLESIA, VISITA]
 *                 example: EN_PROCESO
 *               invited_by:
 *                 type: string
 *                 example: JohnSmith
 *               consolidator:
 *                 type: string
 *                 example: JaneSmith
 *               comments:
 *                 type: string
 *                 format: ObjectId
 *                 example: 615ae7a0644e877d18b6d5e2
 *     responses:
 *       201:
 *         description: Record created successfully.
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
 *                   example: Record created successfully.
 *       401:
 *         description: Not authorized!.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not authorized!.
 *       406:
 *         description: Invalid data or duplicate record.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User already exists!.
 *       500:
 *         description: Internal server error.
 */

router.post(
  "/",
  //consolidationValidations.create,
  evangelizeValidations.create,
  authMiddleware.isAuthenticated,
  // authMiddleware.checkRole(["Administrator", "Responsible"]),
  evangelizationController.create
);

  router.get(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.getAll
  );

  router.get(
    "/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.getOne
  );

  router.put(
    "/promote/:id",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.promote
  );

  router.put(
    "/:id",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.update
  );

  /**
 * @swagger
 * /evangelization/{id}/comments/{commentId}:
 *   put:
 *     summary: Update comment
 *     tags: [Evangelization]
 *     description: Update an existing comment based on its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the evangelization
 *         example: 64741f6d434459353fdd1307
 *         required: true
 *         schema:
 *           type: string
 *       - name: commentId
 *         in: path
 *         description: ID of the comment to update
 *         required: true
 *         example: 64741fe8434459353fdd130b
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: The updated body of the comment
 *                 example: Id dolor consequat amet nostrud in ad Lorem pariatur et non ut qui. 
 *               status:
 *                 type: string
 *                 description: The updated status of the comment
 *                 enum: ["VISITADO","CONTACTO_TELEFONICO","NO_INFORMO","NO_CONSOLIDO","NO_RECIBIO"]
 *                 example: NO_CONSOLIDO
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */
  router.put(
    "/:id/comments/:commentId",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.updateComment
  );

  router.put(
    "/:id/comment",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.createComent
  );

  router.put(
    "/:id/comment/:commentId",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.removeComment
  );
  // .put(
  //   "/:id/week",
  //   //consolidationValidations.create,
  //   authMiddleware.isAuthenticated,
  //   authMiddleware.checkRole(["Administrator", "Consolidator"]),
  //   consolidationController.createWeek
  // )
  // .put(
  //   "/:id/week/:weekId",
  //   //consolidationValidations.create,
  //   authMiddleware.isAuthenticated,
  //   authMiddleware.checkRole(["Administrator", "Consolidator"]),
  //   consolidationController.removeWeek
  // )
  router.put(
    "/:id/updateWeek/:dateId/:weekId",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.updateWeek
  );
  router.put(
    "/insert",
    //authMiddleware.isAuthenticated,
    //authMiddleware.checkRole(["Administrator", "Consolidator"]),
    evangelizationController.insert
  );
  router.delete(
    "/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    evangelizationController.remove
  );

export default router;
