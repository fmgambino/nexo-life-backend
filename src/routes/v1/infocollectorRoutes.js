

import { Router } from "express";

import InfocollectorController from "../../controllers/infocollectorController.js";
import authMiddleware from "../../middleware/jwt.js";




const router = Router();

router.post(
  '/',
  authMiddleware.isAuthenticated,
  InfocollectorController.create
);


// router.put(
//   '/:id',
//   dataEntry,
//   authMiddleware.isAuthenticated,
//   discipleshipController.update
// );



// router.get(
//   '/:id',
//   remove,
//   authMiddleware.isAuthenticated,
//   discipleshipController.getById
// );


// router.get(
//   '/',
//   authMiddleware.isAuthenticated,
//   discipleshipController.getAll
// );



// router.delete(
//   '/:id',
//    remove,
//   authMiddleware.isAuthenticated,
//   discipleshipController.remove
// );


export default router;
