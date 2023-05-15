import commentModel from "../models/commentModel.js";
import consolidationModel from "../models/consolidationModel.js";
import createError from "../util/errors/createError.js";

const create = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req.body;

  // console.log(id);
  // return;

  consolidationModel
    .findById(id)
    .then((response) => {
      if (response !== null) {
        const newComment = new commentModel({
          body,
          consolidation: id,
          user: req?.user?.id,
        });
        newComment
          .save()
          .then((comment) => {
            res.status(201).send({
              status: true,
              data: "Comment created successfully!",
            });
          })
          .catch((err) => {
            console.log(first);
            return next(createError(406, err));
          });
      } else {
        return next(
          createError(404, "There is no record with that consolidation ID")
        );
      }
    })
    .catch((err) => {
      return next(
        createError(404, "There is no record with that consolidation ID")
      );
    });
};

const remove = (req, res, next) => {
  const { id } = req.params;

  commentModel
    .findByIdAndDelete(id)
    .then((comment) => {
      if (comment !== null) {
        res.status(200).send({
          status: true,
          data: "Comment removed successfully!",
        });
      } else {
        return next(
          createError(404, "There is no record with that consolidation ID")
        );
      }
    })
    .catch((err) => {
      return next(createError(404, err));
    });
};

export default {
  create,
  remove,
};
