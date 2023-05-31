import DirectDisciple from '../models/discipleModel.js';
import createError from "./../util/errors/createError.js";

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
};
