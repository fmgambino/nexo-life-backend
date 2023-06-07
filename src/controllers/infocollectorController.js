import Infocollector from "../models/infocollectorModel.js";
import createError from "./../util/errors/createError.js";


const getAll = async (req, res) => {
    try {
        const infocollector = await Infocollector.find();
    
        res.status(200).json({ status: true, infocollector });
    } catch (error) {
        next(createError(500, "Failed to retrieve Infocollector object"));
    }
};

const create = async (req, res) => {

  const { ... resto } = req.user;
  console.log(resto); return;
    try {
        const { ... all } = req.body;
        const infocollector = await Infocollector.create({ ... all});
    
        res.status(201).json({ status: true, infocollector });
    } catch (error) {
        next(createError(500, "Failed to create Infocollector object"));
    }
};

const getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const infocollector = await Infocollector.findById(id);
  
      if (!infocollector) {
        throw createError(404, "Infocollector not found");
      }
  
      res.status(200).json({ status: true, infocollector });
    } catch (error) {
      next(createError(500, "Failed to retrieve infocollector object"));
    }
  };

  const update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedInfocollector = await Infocollector.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
  
      res.status(200).json({ status: true, week: updatedInfocollector });
    } catch (error) {
      console.log(error);
      next(createError(500, "Failed to update updatedInfocollector object"));
    }
  };

  const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      await Infocollector.findByIdAndRemove(id);
  
      res.status(200).json({status: true, message: "Infocollector Item Removed Successfully" });
    } catch (error) {
      next(createError(500, "Failed to delete Infocollector item"));
    }
  };

  export default {
    create,
    getAll,
    getById,
    remove,
    update,
  };