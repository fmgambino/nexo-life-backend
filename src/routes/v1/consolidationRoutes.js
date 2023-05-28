import { Router } from "express";
const router = Router();

import consolidationController from "../../controllers/consolidationController.js";
import authMiddleware from "../../middleware/jwt.js";
import consolidationValidations from "../../util/validations/consolidationValidations.js";

router
  .post(
    "/",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.create
  )
  .get(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.getAll
  )
  .get(
    "/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.getOne
  )
  .put(
    "/:id",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.update
  )
  .put(
    "/:id/comment",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.createComent
  );


 /**
 * @swagger
 * /consolidation/{id}/comments/{commentId}:
 *   put:
 *     summary: Update comment
 *     tags: [Consolidation]
 *     description: Update an existing comment based on its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the consolidation
 *         example: 6473dbf20d2a61c7898adbaf
 *         required: true
 *         schema:
 *           type: string
 *       - name: commentId
 *         in: path
 *         description: ID of the comment to update
 *         required: true
 *         example: 6473dd110d2a61c7898adbb1
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
    consolidationController.updateComment
  );

  router.put(
    "/:id/comment/:commentId",
    //consolidationValidations.create,
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.removeComment
  )
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
  // .put(
  //   "/:id/updateWeek/:weekId",
  //   //consolidationValidations.create,
  //   authMiddleware.isAuthenticated,
  //   authMiddleware.checkRole(["Administrator", "Consolidator"]),
  //   consolidationController.updateWeek
  // )
  .delete(
    "/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.checkRole(["Administrator", "Responsible"]),
    consolidationController.remove
  );

export default router;
