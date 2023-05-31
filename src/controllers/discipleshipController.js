import DiscipleshipModel from "../models/discipleshipModel.js";
import createError from "./../util/errors/createError.js";

const create = async (req, res, next) => {
  try {
    const { ... all } = req.body;
    const newDiscipleship = await DiscipleshipModel.create({ ... all });

    res.status(201).json({ status: true, discipleship: newDiscipleship });
  } catch (error) {
    console.log(error);
    next(createError(500, "Failed to create Discipleship object"));
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedDiscipleship = await DiscipleshipModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    res.status(200).json({ status: true, discipleship: updatedDiscipleship });
  } catch (error) {
    console.log(error);
    next(createError(500, "Failed to update Discipleship object"));
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await DiscipleshipModel.findByIdAndRemove(id);

    res.status(200).json({status: true, message: "Discipleship Item Removed Successfully" });
  } catch (error) {
    next(createError(500, "Failed to delete Discipleship item"));
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const discipleship = await DiscipleshipModel.findById(id);

    if (!discipleship) {
      throw createError(404, "Discipleship not found");
    }

    res.status(200).json({ status: true, discipleship });
  } catch (error) {
    next(createError(500, "Failed to retrieve Discipleship object"));
  }
};

const getAll = async (req, res, next) => {
  try {
    const discipleships = await DiscipleshipModel.find();

    res.status(200).json({ status: true, discipleships });
  } catch (error) {
    next(createError(500, "Failed to retrieve Discipleships"));
  }
};

export default {
  create,
  getAll,
  getById,
  remove,
  update,
};
