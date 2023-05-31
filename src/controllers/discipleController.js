import DirectDisciple from '../models/discipleModel.js';
import createError from "./../util/errors/createError.js";


const removeWeek = async (req, res, next) => {
  try {
    const { directDiscipleId, networkDiscipleId, weekId } = req.params;

    const directDisciple = await DirectDisciple.findById(directDiscipleId);

    if (!directDisciple) {
      return res.status(404).json({ message: 'Direct disciple not found' });
    }

    const networkDisciple = directDisciple.network_disciples.id(networkDiscipleId);

    if (!networkDisciple) {
      return res.status(404).json({ message: 'Network disciple not found' });
    }

    const week = networkDisciple.weeks.id(weekId);

    if (!week) {
      return res.status(404).json({ message: 'Week not found' });
    }

    week.remove();

    await directDisciple.save();

    res.status(200).json({ message: 'Week removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};


const addWeek = async (req, res, next) => {

  try {
    const directDiscipleId = req.params.directDiscipleId;
    const networkDiscipleId = req.params.networkDiscipleId;
    const weekData = req.body;

    const directDisciple = await DirectDisciple.findById(directDiscipleId);
    if (!directDisciple) {
      return res.status(404).json({ message: 'Direct Disciple not found' });
    }

    const networkDisciple = directDisciple.network_disciples.find(
      (disciple) => disciple._id.toString() === networkDiscipleId
    );
    if (!networkDisciple) {
      return res.status(404).json({ message: 'Network Disciple not found' });
    }

    const newWeek = {
      presente: weekData.presente,
      fecha: weekData.fecha,
      donaciones: weekData.donaciones,
      observaciones: weekData.observaciones
    };

    networkDisciple.weeks.push(newWeek);

    await directDisciple.save();

    res.status(200).json({ message: 'Week added successfully', networkDisciple });
  } catch (error) {
    res.status(500).json({ message: `Failed to add week to Network Disciple: ${error.message}` });
  }


}


const addDR = async (req, res, next) => {
  try {
    const directDiscipleId = req.params.id;
    const {name} = req.body;

    const directDisciple = await DirectDisciple.findByIdAndUpdate(
      directDiscipleId,
      { $push: { network_disciples: { name } } },
      { new: true, useFindAndModify: false }
    );

    if (!directDisciple) {
      return res.status(404).json({ message: 'DirectDisciple not found' });
    }

    res.status(200).json({ status: true, directDisciple });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const create = async (req, res, next) => {
  try {
    const { ... all } = req.body;
    const directDisciple  = await DirectDisciple.create({ ... all });
    if (!directDisciple) {
      throw createError(400, "Failed to create direct disciple");
    }
    res.status(201).json({ status: true, directDisciple });
  } catch (error) {
    console.log(error);
    next(createError(500, "Failed to create direct disciple"));
  }
};


const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedDD = await DirectDisciple.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedDD) {
      throw createError(404, "Direct disciple not found");
    }
    res.status(200).json({ status: true, directDisciple: updatedDD });
  } catch (error) {
    console.log(error);
    next(createError(500, "Failed to update direct disciple"));
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const directDisciple  = await DirectDisciple.findByIdAndRemove(id);
    if (!directDisciple ) {
      throw createError(404, "Direct disciple not found");
    }
    res.status(200).json({status: true, message: "Direct disciple removed" });
  } catch (error) {
    next(createError(500, "Failed to remove direct disciple"));
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const directDisciple  = await DirectDisciple.findById(id);

    if (!directDisciple ) {
      throw createError(404, "Direct disciple not found");
    }

    res.status(200).json({ status: true, directDisciple  });
  } catch (error) {
    next(createError(500, "Failed to get direct disciple"));
  }
};

const getAll = async (req, res, next) => {
  try {
    const directDisciples  = await DirectDisciple.find();

    res.status(200).json({ status: true, directDisciples  });
  } catch (error) {
    next(createError(500, "Failed to get direct disciples"));
  }
};

export default {
  create,
  getAll,
  getById,
  remove,
  update,
  addDR,
  addWeek,
  removeWeek
};
