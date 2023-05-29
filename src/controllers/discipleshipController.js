import DiscipleshipModel from "../models/discipleshipModel.js";
import createError from "./../util/errors/createError.js";

const create = async (req, res, next) => {
  try {
    const { name, coordinator, discipler, dd, dr, attendance, serviceArea, phone, cellAddress } = req.body;

    const newDiscipleship = await DiscipleshipModel.create({ name, coordinator, discipler, dd, dr, attendance, serviceArea, phone, cellAddress });

    res.status(201).json({ status: true, discipleship: newDiscipleship });
  } catch (error) {
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
    next(createError(500, "Failed to update Discipleship object"));
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    await DiscipleshipModel.findByIdAndRemove(id);

    res.status(200).json({ message: "Discipleship Item Removed Successfully" });
  } catch (error) {
    next(createError(500, "Failed to delete Discipleship item"));
  }
};

export default {
  create,
  update,
  remove
};
