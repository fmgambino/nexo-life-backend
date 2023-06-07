import Infocollector from "../models/infocollectorModel.js";
import Evangelize from "../models/evangelizeModel.js";
import createError from "./../util/errors/createError.js";


const getAll = async (req, res) => {
    try {
        const infocollectors = await Infocollector.find();
    
        res.status(200).json({ status: true, infocollectors });
    } catch (error) {
        next(createError(500, "Failed to retrieve Infocollector object"));
    }
};

const create = async (req, res) => {

  const { profile } = req.user;

    try {
        let data;
        if (profile === "Administrator") {
            data = req.body;
        } else {
          const {otherInputs, inputSelect, ...resto } = req.body;
          data = resto;
        }
        const infocollector = await Infocollector.create({ ... data});
    
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
      const { status,  message } = error;
      next(createError(status, message));
    }
  };

  const updateDestination = async (req, res, next) => {
    let changed = false;
    try {
      const { id } = req.params;
      const { destination } = req.body;

      const infocollector = await Infocollector.findById(id);

      if (!infocollector) {
        throw createError(404, "Infocollector not found");
      }
      if (infocollector.destination === "EVANGELIZAR") {
        throw createError(403, "Cannot update an Infocollector with destination 'EVANGELIZAR'");
      }
      
      const updatedInfocollector = await Infocollector.findByIdAndUpdate(
        id,
        {destination: destination},
        { new: true }
      );

      if (!updatedInfocollector) {
        throw createError(404, "Infocollector not found");
      }

      if (destination === "EVANGELIZAR") {
        const { 
          name,
          last_name,
          age,
          family_status,
          address,
          location,
          phone,
          another_church,
          to_be_visited,
          responsible,
          church,
          invited_by,
          coordinador,
         } = updatedInfocollector;
        

        const evangelize = await Evangelize.create({ name, last_name, age, family_status, address, location, phone, another_church, to_be_visited, responsible, church, invited_by, consolidator: coordinador });
        const res = await evangelize.save();
        if (res) {
          changed = true;
        }
      }
  
      res.status(200).json({ status: true, infocollector: updatedInfocollector, changed });
    } catch (error) {
      console.log(error);
      const { status,  message } = error;
      next(createError(status, message));
    }
  };

  const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const infocollector = await Infocollector.findById(id);
      if (!infocollector) {
        throw createError(404, "Infocollector not found");
      }
      if (infocollector.destination === "EVANGELIZAR") {
        throw createError(403, "Cannot delete an Infocollector with destination 'EVANGELIZAR'");
      }
  
      const item = await Infocollector.findByIdAndRemove(id);
  
      res.status(200).json({ status: true, item });
    } catch (error) {
      const { status,  message } = error;
      next(createError(status, message));
    }
  };
  
  const update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedInfocollector = req.body;
  
      const infocollector = await Infocollector.findById(id);
      if (!infocollector) {
        throw createError(404, "Infocollector not found");
      }
      if (infocollector.destination === "EVANGELIZAR") {
        throw createError(403, "Cannot update an Infocollector with destination 'EVANGELIZAR'");
      }
  
      const updatedItem = await Infocollector.findByIdAndUpdate(id, updatedInfocollector, { new: true });
  
      res.status(200).json({ status: true, item: updatedItem });
    } catch (error) {
      const { status, message } = error;
      next(createError(status, message));
    }
  };
  

  export default {
    create,
    getAll,
    getById,
    remove,
    updateDestination,
    update,
  };