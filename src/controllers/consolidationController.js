import consolidationModel from "../models/consolidationModel.js";
import createError from "../util/errors/createError.js";

const create = async (req, res, next) => {
  const { id, church, rol } = req.user;
  const {
    name,
    last_name,
    age,
    family_status,
    address,
    location,
    responsible,
    phone,
    occupation,
    another_church,
    to_be_visited,
    destination,
    invited_by,
    consolidator,
  } = req.body;

  if (rol === "Administrator" && responsible === undefined) {
    res.status(404).send({
      status: false,
      data: "Responsible field is required!",
    });
  }

  if (rol === "Administrator") {
    var newConsolidation = new consolidationModel({
      name,
      last_name,
      age,
      family_status,
      address,
      location,
      phone,
      occupation,
      another_church,
      to_be_visited,
      responsible,
      church,
      destination,
      invited_by,
      consolidator,
    });
  } else {
    var newConsolidation = new consolidationModel({
      name,
      last_name,
      age,
      family_status,
      address,
      location,
      phone,
      occupation,
      another_church,
      to_be_visited,
      responsible: id,
      church,
      destination,
      invited_by,
      consolidator,
    });
  }

  // console.log(newConsolidation);
  // return;

  newConsolidation
    .save()
    .then((consolidation) => {
      res.status(201).send({
        status: true,
        data: "Consolidation created successfully!",
      });
    })
    .catch((err) => {
      //console.log(err);
      if (err.code === 11000)
        return next(
          createError(406, "Already a consolidation with these data!")
        );

      return next(createError(406, err));
    });
};

const getAll = async (req, res, next) => {
  const { church } = req.user;
  const {
    date = await getActualMothAndYear(),
    page = 1,
    limit = 10,
  } = req.query;
  const skip = (page - 1) * limit;

  const days = await getActualMoth(date);

  // console.log(days.firstDay);
  // return;

  const consolidationCount = await consolidationModel
    .find({
      $and: [
        { church },
        { createdAt: { $gte: days.firstDay } },
        { createdAt: { $lt: days.lastDay } },
      ],
    })
    .count({});

  // console.log(consolidationCount, days.firstDay, days.lastDay);
  // return;

  if (skip >= consolidationCount) {
    return res.status(200).send({
      status: false,
      data: {
        pagination: {
          prev: 0,
          page: 0,
          next: 0,
          total: 0,
          // total: consolidationTotal,
        },
        info: [],
      },
    });
  }

  await consolidationModel
    .find({
      $and: [
        { church },
        { createdAt: { $gte: (await getActualMoth(date)).firstDay } },
        { createdAt: { $lt: (await getActualMoth(date)).lastDay } },
      ],
    })
    .skip(skip)
    .limit(limit)
    .populate("responsible")
    .then((consolidations) => {
      if (consolidations.length < 1) {
        res.status(200).send({
          status: false,
          data: {
            pagination: {
              prev: 0,
              page: 0,
              next: 0,
              total: 0,
              // total: consolidationTotal,
            },
            info: [],
          },
        });
      } else {
        res.status(200).send({
          status: true,
          data: {
            pagination: {
              prev: Number(page) - 1 > 0 ? Number(page) - 1 : false,
              page: Number(page),
              next:
                consolidationCount > limit * page ? Number(page) + 1 : false,
              total: consolidationCount,
              // total: consolidationTotal,
            },
            info: consolidations,
          },
        });
      }
    })
    .catch((err) => {
      return next(createError(406, err));
    });
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  const { church } = req.user;

  await consolidationModel
    .findOne({
      _id: id,
      church,
    })
    .populate("responsible")
    .then((consolidation) => {
      res.status(200).send({
        status: true,
        data: consolidation,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));
      return next(createError(406, err));
    });

  // const existe = consolidation.comments.find(
  //   (comment) => comment.user?.toString() === req?.user?.id?.toString()
  // );

  // console.log(existe);

  // res.status(200).send({
  //   status: true,
  //   data: consolidation,
  // });
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { church } = req.user;
  const {
    name,
    last_name,
    age,
    family_status,
    address,
    location,
    phone,
    occupation,
    another_church,
    to_be_visited,
    destination,
    invited_by,
    consolidator,
  } = req.body;

  await consolidationModel
    .findOneAndUpdate(
      { _id: id, church },
      {
        name,
        last_name,
        age,
        family_status,
        address,
        location,
        phone,
        occupation,
        another_church,
        to_be_visited,
        destination,
        invited_by,
        consolidator,
      }
    )
    .then((consolidation) => {
      if (consolidation !== null) {
        res.status(200).send({
          status: true,
          data: "Consolidation updated successfully!",
        });
      } else {
        return next(createError(404, "There is no record with that id!"));
      }
    })
    .catch((err) => {
      if (err.code === 11000)
        return next(
          createError(406, "Already a consolidation with these data!")
        );
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));
      return next(createError(406, err));
    });
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const { church } = req.user;

  await consolidationModel
    .findOneAndDelete({ _id: id, church })
    .then((consolidation) => {
      if (consolidation !== null) {
        // console.log(consolidation);
        res.status(200).send({
          status: true,
          data: "Consolidation removed successfully!",
        });
      } else {
        return next(createError(404, "There is no record with that id!"));
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));
      return next(createError(406, err));
    });
};

const updateComment = async (req, res, next) => {
  const { id, commentId } = req.params;
  const { body, status } = req.body;

  await consolidationModel
    .findOneAndUpdate(
      { _id: id, "comments._id": commentId },
      {
        $set: {
          "comments.$.body": body,
          "comments.$.status": status,
        },
      }
    )
    .then((consolidation) => {
      if (consolidation !== null) {
        res.status(200).send({
          status: true,
          data: "Comment updated successfully!",
        });
      } else {
        return next(createError(404, "There is no record with that id or commentId!"));
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id or commentId!"));
      return next(createError(406, err));
    });
};


const createComent = async (req, res, next) => {
  const { id } = req.params;
  const { id: authUserId } = req.user;
  const { body, status } = req.body;

  await consolidationModel
    .findByIdAndUpdate(id, {
      $push: {
        comments: { body, created: new Date(), created_by: authUserId, status },
      },
    })
    .then((consolidation) => {
      if (consolidation !== null) {
        res.status(200).send({
          status: true,
          data: "Comment created successfully!",
        });
      } else {
        return next(createError(404, "There is no record with that id!"));
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));
      return next(createError(406, err));
    });
};

const removeComment = async (req, res, next) => {
  const { id, commentId } = req.params;

  // console.log(id, we)

  await consolidationModel
    .findById(id)
    .then(async (consolidation) => {
      const comment = consolidation?.comments?.find(
        (comment) => comment.id.toString() === commentId?.toString()
      );

      if (comment) {
        await consolidationModel
          .findByIdAndUpdate(id, {
            $pull: {
              comments: { _id: commentId },
            },
          })
          .then(() => {
            res.status(200).send({
              status: true,
              data: "Comment removed successfully!",
            });
          })
          .catch((err) => {
            return next(createError(406, err));
          });
      } else {
        return next(createError(404, "There is no record with that id!"));
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));
      return next(createError(406, err));
    });
};

const getActualMothAndYear = async () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  if (mm < 10) mm = "0" + mm;

  return `${yyyy}-${mm}`;
};

const getActualMoth = async (yearAndMonth) => {
  var date = new Date(yearAndMonth);
  let month = date.getMonth();
  var firstDay = new Date(date.getFullYear(), month, 1);
  var lastDay = new Date(date.getFullYear(), month + 1, 1);

  return { firstDay, lastDay };
};

// const createWeek = async (req, res, next) => {
//   const { id } = req.params;
//   const { id: authUserId } = req.user;
//   const { status } = req.body;

//   await consolidationModel
//     .findByIdAndUpdate(id, {
//       $push: {
//         weeks: { status, created: new Date(), created_by: authUserId },
//       },
//     })
//     .then(() => {
//       res.status(200).send({
//         status: true,
//         data: "Week created successfully!",
//       });
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId")
//         return next(createError(404, "There is no record with that id!"));
//       return next(createError(406, err));
//     });
// };

// const updateWeek = async (req, res, next) => {
//   const { id, weekId } = req.params;
//   const { status } = req.body;

//   // console.log(id, we)

//   await consolidationModel
//     .findById(id)
//     .then(async (consolidation) => {
//       const week = consolidation?.weeks?.find(
//         (week) => week.id.toString() === weekId?.toString()
//       );

//       if (week) {
//         await consolidationModel
//           .updateOne(
//             { _id: id, "weeks._id": weekId },
//             { $set: { "weeks.$.status": status } }
//           )
//           .then(() => {
//             res.status(200).send({
//               status: true,
//               data: "Week updated successfully!",
//             });
//           })
//           .catch((err) => {
//             //console.log(err);
//             return next(createError(406, err));
//           });
//       } else {
//         return next(createError(404, "There is no record with that id!"));
//       }
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId")
//         return next(createError(404, "There is no record with that id!"));
//       return next(createError(406, err));
//     });
// };

// const removeWeek = async (req, res, next) => {
//   const { id, weekId } = req.params;

//   // console.log(id, we)

//   await consolidationModel
//     .findById(id)
//     .then(async (consolidation) => {
//       const week = consolidation?.weeks?.find(
//         (week) => week.id.toString() === weekId?.toString()
//       );

//       if (week) {
//         await consolidationModel
//           .findByIdAndUpdate(id, {
//             $pull: {
//               weeks: { _id: weekId },
//             },
//           })
//           .then(() => {
//             res.status(200).send({
//               status: true,
//               data: "Week removed successfully!",
//             });
//           })
//           .catch((err) => {
//             return next(createError(406, err));
//           });
//       } else {
//         return next(createError(404, "There is no record with that id!"));
//       }
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId")
//         return next(createError(404, "There is no record with that id!"));
//       return next(createError(406, err));
//     });
// };

export default {
  create,
  getAll,
  getOne,
  update,
  remove,
  createComent,
  removeComment,
  updateComment,
  // createWeek,
  // updateWeek,
  // removeWeek,
};
