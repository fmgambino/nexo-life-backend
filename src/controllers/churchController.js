import churchModel from "../models/churchModel.js";
import createError from "../util/errors/createError.js";

const create = async (req, res, next) => {
  const { name, address } = req.body;

  const newChurch = new churchModel({
    name,
    address,
  });

  await newChurch
    .save()
    .then((church) => {
      res.status(201).send({
        status: true,
        data: "Church created successfully!",
      });
    })
    .catch((err) => {
      if (err.code === 11000)
        return next(createError(406, "Already a church with these data!"));

      return next(createError(406, err));
    });
};

const getAll = (req, res, next) => {
  churchModel
    .find()
    .then((churchs) => {
      res.status(200).send({
        status: true,
        data: churchs,
      });
    })
    .catch((err) => {
      return next(createError(404, err));
    });
};

const update = (req, res, next) => {
  const { id } = req.params;
  const { name, address } = req.body;

  churchModel
    .findByIdAndUpdate(
      id,
      {
        name,
        address,
      },
      {
        new: true,
      }
    )
    .then(() => {
      res.status(200).send({
        status: true,
        data: "Church updated successfully!",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));

      return next(createError(404, err));
    });
};

const remove = (req, res, next) => {
  const { id } = req.params;

  churchModel
    .findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({
        status: true,
        data: "Church removed successfully!",
      });
    })
    .catch((err) => {
      return next(createError(404, err));
    });
};

export default {
  create,
  getAll,
  update,
  remove,
};
