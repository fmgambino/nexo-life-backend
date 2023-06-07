import WeekModel from "../models/weekModel_new.js";
import createError from "./../util/errors/createError.js";

const create = async (req, res, next) => {
  try {
    const { ... all } = req.body;
    const newWeek = await WeekModel.create({ ... all });

    res.status(201).json({ status: true, week: newWeek });
  } catch (error) {
    console.log(error);
    next(createError(500, "Failed to create Week object"));
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedWeek = await WeekModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    res.status(200).json({ status: true, week: updatedWeek });
  } catch (error) {
    console.log(error);
    next(createError(500, "Failed to update Week object"));
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await WeekModel.findByIdAndRemove(id);

    res.status(200).json({status: true, message: "Week Item Removed Successfully" });
  } catch (error) {
    next(createError(500, "Failed to delete Week item"));
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const week = await WeekModel.findById(id);

    if (!week) {
      throw createError(404, "Week not found");
    }

    res.status(200).json({ status: true, week });
  } catch (error) {
    next(createError(500, "Failed to retrieve Week object"));
  }
};

const getAll = async (req, res, next) => {
  try {
    const weeks = await WeekModel.find();

    res.status(200).json({ status: true, weeks });
  } catch (error) {
    next(createError(500, "Failed to retrieve Weeks"));
  }
};

export default {
  create,
  getAll,
  getById,
  remove,
  update,
};
