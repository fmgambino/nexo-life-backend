

import { Router } from "express";

import InfocollectorController from "../../controllers/infocollectorController.js";
import authMiddleware from "../../middleware/jwt.js";
import { remove } from "../../util/validations/leaderValidations.js";





const router = Router();
/**
 * @swagger
 * tags:
 *   name: Infocollector
 *   description: Endpoints for managing Infocollector
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NotFoundError:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Infocollector not found
 *
 *     ValidationError:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: false
 *         message:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 example: 64808833146dbda90f5bd6a
 *               msg:
 *                 type: string
 *                 example: Not a valid ID
 *               param:
 *                 type: string
 *                 example: id
 *               location:
 *                 type: string
 *                 example: params
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     ServerError:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Indicates if the request was successful
 *           example: false
 *         message:
 *           type: string
 *           description: Error message
 *           example: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InfocollectorListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         infocollectors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Infocollector'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Infocollector:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the infocollector
 *           example: John Admin dataentry
 *         last_name:
 *           type: string
 *           description: The last name of the infocollector
 *           example: Infocolector 22
 *         age:
 *           type: number
 *           description: The age of the infocollector
 *           example: 31
 *         family_status:
 *           type: string
 *           enum: [SOLTERO, CASADO]
 *           description: The family status of the infocollector
 *           example: SOLTERO
 *         prayer_request:
 *           type: string
 *           description: The prayer request of the infocollector
 *           example: motivo de oracion
 *         address:
 *           type: string
 *           description: The address of the infocollector
 *           example: 123MainSt a
 *         location:
 *           type: string
 *           description: The location of the infocollector
 *           example: City
 *         phone:
 *           type: string
 *           description: The phone number of the infocollector
 *           example: 123456789
 *         occupation:
 *           type: string
 *           description: The occupation of the infocollector
 *           example: Ing
 *         another_church:
 *           type: boolean
 *           description: Indicates if the infocollector belongs to another church
 *           example: false
 *         to_be_visited:
 *           type: boolean
 *           description: Indicates if the infocollector is to be visited
 *           example: true
 *         responsible:
 *           type: string
 *           description: The ID of the responsible user
 *           example: 615ae7a0644e877d18b6d5e1
 *         church:
 *           type: string
 *           description: The ID of the church
 *           example: 615ae7a0644e877d18b6d5e2
 *         destination:
 *           type: string
 *           enum: [EVANGELIZAR, POR_DEFINIR, DE_BAJA]
 *           description: The destination of the infocollector
 *           example: POR_DEFINIR
 *         invited_by:
 *           type: string
 *           description: The name of the person who invited the infocollector
 *           example: JohnSmith
 *         coordinador:
 *           type: string
 *           description: The name of the coordinator
 *           example: JaneSmith coordinador
 *         double:
 *           type: string
 *           description: The name of the double
 *           example: dupla
 *         dataGral:
 *           type: string
 *           description: General information about the infocollector
 *           example: información extra
 *         otherInputs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OtherInput'
 *           description: Additional inputs with name and value
 *         inputSelect:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/InputSelect'
 *           description: Select inputs with name and value options
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OtherInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the input
 *           example: Other Input
 *         value:
 *           type: string | number
 *           description: The value of the input
 *           example: text
 *
 *     InputSelect:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the input
 *           example: Other Input
 *         value:
 *           type: array
 *           description: The value options for the input
 *           items:
 *             type: string
 *           example: ["Option 1", "Option 2"]
 *
 *     InfocollectorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *           example: true
 *         infocollector:
 *           $ref: '#/components/schemas/Infocollector'
 *
 *     UnauthorizedError:
 *       description: Unauthorized error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Error message
 *                 example: Unauthorized access
 */

/**
 * @swagger
 * /infocollector:
 *   post:
 *     summary: Create Infocollector
 *     description: Creates a new Infocollector entry
 *     tags:
 *       - Infocollector
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the infocollector
 *                 example: John Admin dataentry
 *               last_name:
 *                 type: string
 *                 description: The last name of the infocollector
 *                 example: Infocolector 22
 *               age:
 *                 type: integer
 *                 description: The age of the infocollector
 *                 example: 31
 *               family_status:
 *                 type: string
 *                 description: The family status of the infocollector
 *                 enum: [SOLTERO, CASADO]
 *                 example: SOLTERO
 *               prayer_request:
 *                 type: string
 *                 description: The prayer request of the infocollector
 *                 example: motivo de oracion
 *               address:
 *                 type: string
 *                 description: The address of the infocollector
 *                 example: 123MainSt a
 *               location:
 *                 type: string
 *                 description: The location of the infocollector
 *                 example: City
 *               phone:
 *                 type: string
 *                 description: The phone number of the infocollector
 *                 example: 123456789
 *               occupation:
 *                 type: string
 *                 description: The occupation of the infocollector
 *                 example: Ing
 *               another_church:
 *                 type: boolean
 *                 description: Indicates if the infocollector belongs to another church
 *                 example: false
 *               to_be_visited:
 *                 type: boolean
 *                 description: Indicates if the infocollector is to be visited
 *                 example: true
 *               responsible:
 *                 type: string
 *                 description: The ID of the responsible user
 *                 example: 615ae7a0644e877d18b6d5e1
 *               church:
 *                 type: string
 *                 description: The ID of the church
 *                 example: 615ae7a0644e877d18b6d5e2
 *               destination:
 *                 type: string
 *                 description: The destination of the infocollector
 *                 enum: [EVANGELIZAR, POR_DEFINIR, DE_BAJA]
 *                 example: POR_DEFINIR
 *               invited_by:
 *                 type: string
 *                 description: The name of the person who invited the infocollector
 *                 example: JohnSmith
 *               coordinador:
 *                 type: string
 *                 description: The name of the coordinator
 *                 example: JaneSmith coordinador
 *               double:
 *                 type: string
 *                 description: The name of the double
 *                 example: dupla
 *               dataGral:
 *                 type: string
 *                 description: General information about the infocollector
 *                 example: información extra
 *               otherInputs:
 *                 type: array
 *                 description: Additional inputs with name and value
 *                 items:
 *                   $ref: '#/components/schemas/OtherInput'
 *               inputSelect:
 *                 type: array
 *                 description: Select inputs with name and value options
 *                 items:
 *                   $ref: '#/components/schemas/InputSelect'
 *     responses:
 *       '201':
 *         description: Infocollector created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InfocollectorResponse'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '500':
 *         description: Failed to create Infocollector object
 */


router.post(
  '/',
  authMiddleware.isAuthenticated,
  InfocollectorController.create
);

/**
 * @swagger
 * /infocollector/{id}:
 *   delete:
 *     summary: Remove an Infocollector item
 *     description: Removes an Infocollector item from the database.
 *     tags:
 *       - Infocollector
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Infocollector item to be removed
 *     responses:
 *       200:
 *         description: Infocollector item removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InfocollectorResponse'
 *       403:
 *         description: Cannot delete an Infocollector with destination 'EVANGELIZAR'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: Failed to delete Infocollector item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */

router.delete(
    '/:id',
    remove,
    authMiddleware.isAuthenticated,
    InfocollectorController.remove
  );

/**
 * @swagger
 * /infocollector:
 *   get:
 *     summary: Get all Infocollector items
 *     description: Retrieves all Infocollector items from the database.
 *     tags:
 *       - Infocollector
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: List of Infocollector items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InfocollectorListResponse'
 *       401:
 *         description: Unauthorized request, missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: Failed to retrieve Infocollector items
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.get(
    '/',
    authMiddleware.isAuthenticated,
    InfocollectorController.getAll
);

/**
 * @swagger
 * /infocollector/{id}:
 *   get:
 *     summary: Get Infocollector by ID
 *     description: Retrieve an Infocollector by its ID
 *     tags:
 *       - Infocollector
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Infocollector
 *         schema:
 *           type: string
 *         example: 64808833146dbda90f5bd6a3
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InfocollectorResponse'
 *       '404':
 *         description: Infocollector not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *       '422':
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.get(
'/:id',
    remove,
    authMiddleware.isAuthenticated,
    InfocollectorController.getById
);

/**
 * @swagger
 * /update-destination/{id}:
 *   put:
 *     summary: Update Infocollector destination
 *     description: Update the destination of an Infocollector item. If the destination is set to "EVANGELIZAR", a new Evangelize item will be created.
 *     tags:
 *       - Infocollector
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the Infocollector item to update
 *         schema:
 *           type: string
 *       - in: header
 *         name: Authorization
 *         description: Access token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated destination
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destination:
 *                 type: string
 *                 description: New destination value
 *     responses:
 *       '200':
 *         description: Successful operation. Infocollector destination updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 infocollector:
 *                   $ref: '#/components/schemas/Infocollector'
 *                 changed:
 *                   type: boolean
 *                   example: true
 *       '404':
 *         description: Infocollector not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *       '422':
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       '403':
 *         description: Invalid ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */

router.put(
  '/update-destination/:id',
  authMiddleware.isAuthenticated,
  InfocollectorController.updateDestination
);

/**
 * @swagger
 * /infocollector/{id}:
 *   put:
 *     summary: Update Infocollector
 *     description: Updates an existing Infocollector with the new data provided.
 *     tags:
 *       - Infocollector
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Infocollector a actualizar
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Infocollector updated data
 *         schema:
 *           $ref: '#/components/schemas/InfocollectorUpdateInput'
 *     responses:
 *       200:
 *         description: Infocollector updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InfocollectorResponse'
 *       403:
 *         description: Cannot update an Infocollector with target 'EVANGELIZE'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenError'
 *       404:
 *         description: Infocollector not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */


router.put(
  '/:id',
  authMiddleware.isAuthenticated,
  InfocollectorController.update
);


export default router;
