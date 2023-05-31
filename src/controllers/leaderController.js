import LeaderModel from "../models/leaderModel.js";
import createError from "./../util/errors/createError.js";

const create = async (req, res, next) => {
  try {
    const { ... all } = req.body;
    const newLeader = await LeaderModel.create({ ... all });

    res.status(201).json({ status: true, leader: newLeader });
  } catch (error) {
    console.log(error);
    next(createError(500, "Failed to create Leader object"));
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedLeader = await LeaderModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedLeader) {
      throw createError(404, "Leader not found");
    }
    res.status(200).json({ status: true, leader: updatedLeader });
  } catch (error) {
    console.log(error);
    next(createError(500, "Failed to update Leader object"));
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const removeLeader = await LeaderModel.findByIdAndRemove(id);
    if (!removeLeader) {
      throw createError(404, "Leader not found");
    }
    res.status(200).json({status: true, message: "Leader Item Removed Successfully" });
  } catch (error) {
    next(createError(500, "Failed to delete Leader item"));
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const leader = await LeaderModel.findById(id);

    if (!leader) {
      throw createError(404, "Leader not found");
    }

    res.status(200).json({ status: true, leader });
  } catch (error) {
    next(createError(500, "Failed to retrieve Leader object"));
  }
};

const getAll = async (req, res, next) => {
  try {
    const leaders = await LeaderModel.find();

    res.status(200).json({ status: true, leaders });
  } catch (error) {
    next(createError(500, "Failed to retrieve leaders"));
  }
};

export default {
  create,
  getAll,
  getById,
  remove,
  update,
};
