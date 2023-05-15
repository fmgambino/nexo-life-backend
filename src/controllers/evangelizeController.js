import evangelizeModel from "../models/evangelizeModel.js";
import consolidationModel from "../models/consolidationModel.js";
import createError from "../util/errors/createError.js";

const create = async (req, res, next) => {
  const { id, church } = req.user;
  const { full_name, destination, invited_by, consolidator } = req.body;

  //console.log(req.user);

  const newEvangelize = new evangelizeModel({
    full_name,
    responsible: id,
    church,
    destination,
    invited_by,
    consolidator,
    weeks: weeks(weekOfTheMonth(), id),
  });

  newEvangelize
    .save()
    .then((evangelize) => {
      // console.log("bien");
      res.status(201).send({
        status: true,
        data: "Evangelization created successfully!",
      });
    })
    .catch((err) => {
      // console.log(err);
      // console.log("mal");
      if (err.code === 11000)
        return next(
          createError(406, "Already a evangelization with these data!")
        );

      return next(createError(406, err));
    });
};

const getAll = async (req, res, next) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  if (mm < 10) mm = "0" + mm;

  const { church } = req.user;
  const { date = `${yyyy}-${mm}`, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    var query = evangelizeModel.find(
      {
        church: church,
        //"weeks.created": date.toString(),
      },
      {
        full_name: 1,
        responsible: 1,
        destination: 1,
        invited_by: 1,
        consolidator: 1,
        comments: 1,
        //weeks: { $elemMatch: { created: date } },
      }
    );
    var totalQuery = evangelizeModel
      .find({
        church: church,
        //"weeks.created": date.toString(),
      })
      .countDocuments();
  } catch (err) {
    return next(createError(406, "Error trying to access model!"));
  }

  query.skip(skip).limit(limit);

  const evangelizations = await query;
  const total = await totalQuery;

  if (page) {
    if (skip >= total) {
      return next(createError(406, "This page does no exist!"));
    }
  }

  res.status(200).send({
    status: true,
    data: {
      pagination: {
        prev: Number(page) - 1 > 0 ? Number(page) - 1 : false,
        page: Number(page),
        next:
          Number(page) + 1 <= Math.ceil(total / limit)
            ? Number(page) + 1
            : false,
        per_page: Number(limit),
        total_pages: Math.ceil(total / limit),
        total_docs: total,
      },
      info: evangelizations,
    },
  });
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  const { church } = req.user;

  await evangelizeModel
    .findOne({
      _id: id,
      church,
    })
    .then((evangelization) => {
      if (evangelization !== null) {
        res.status(200).send({
          status: true,
          data: evangelization,
        });
      } else {
        return next(createError(404, "No data!"));
      }
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
  const { full_name, destination, invited_by, consolidator } = req.body;

  await evangelizeModel
    .findOneAndUpdate(
      { _id: id, church },
      {
        full_name,
        destination,
        invited_by,
        consolidator,
      },
      {
        new: true,
      }
    )
    .then((evangelization) => {
      //console.log(evangelization);

      if (evangelization !== null) {
        res.status(200).send({
          status: true,
          data: "Evangelization updated successfully!",
        });
      } else {
        return next(createError(404, "There is no record with that id!"));
      }
    })
    .catch((err) => {
      if (err.code === 11000)
        return next(
          createError(406, "Already a evangelization with these data!")
        );
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));
      return next(createError(406, err));
    });
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const { church } = req.user;

  await evangelizeModel
    .findOneAndDelete({ _id: id, church })
    .then((evangelization) => {
      if (evangelization !== null) {
        res.status(200).send({
          status: true,
          data: "Evangelization removed successfully!",
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

const createComent = async (req, res, next) => {
  const { id } = req.params;
  const { id: authUserId } = req.user;
  const { body } = req.body;

  await evangelizeModel
    .findByIdAndUpdate(id, {
      $push: {
        comments: { body, created: new Date(), created_by: authUserId },
      },
    })
    .then(() => {
      res.status(200).send({
        status: true,
        data: "Comment created successfully!",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));
      return next(createError(406, err));
    });
};

const insert = async (req, res, next) => {
  // const { id } = req.params;
  // const { id: authUserId } = req.user;
  // const { body } = req.body;

  await evangelizeModel
    .findByIdAndUpdate("63e45dfdc22e57efb4f60762", {
      $push: {
        weeks: {
          created: "2023-03",
          created_by: "63cb64ef0f6fb3b3921d11da",
          data: [
            {
              status: "SIN_DATOS",
              name: "week_1",
              _id: "63e320b1d4f28050a70aebfe",
            },
            {
              status: "SIN_DATOS",
              name: "week_2",
              _id: "63e320b1d4f28050a70aebff",
            },
            {
              status: "SIN_DATOS",
              name: "week_3",
              _id: "63e320b1d4f28050a70aec00",
            },
            {
              status: "SIN_DATOS",
              name: "week_4",
              _id: "63e320b1d4f28050a70aec01",
            },
          ],
          _id: "63e320b1d4f28050a70aebfd",
        },
      },
    })
    .then(() => {
      res.status(200).send({
        status: true,
        data: "Comment created successfully!",
      });
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

  await evangelizeModel
    .findById(id)
    .then(async (evangelization) => {
      const comment = evangelization?.comments?.find(
        (comment) => comment.id.toString() === commentId?.toString()
      );

      if (comment) {
        await evangelizeModel
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

const updateWeek = async (req, res, next) => {
  const { id, dateId, weekId } = req.params;
  const { church } = req.user;
  const { status } = req.body;

  await evangelizeModel
    .updateOne(
      { _id: id, church },
      {
        $set: {
          "weeks.$[updateData].data.$[updateWeek].status": status,
        },
      },
      {
        arrayFilters: [
          { "updateData._id": dateId },
          { "updateWeek._id": weekId },
        ],
      }
    )
    .then((evangelization) => {
      //console.log(evangelization);

      if (evangelization.matchedCount !== 0) {
        res.status(200).send({
          status: true,
          data: "Week updated successfully!",
        });
      } else {
        return next(
          createError(
            404,
            "There is no record with that id or you don't have privileges!"
          )
        );
      }
    })
    .catch((err) => {
      // console.log(err);
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));
      return next(createError(406, err));
    });

  // console.log(id, we)

  // await evangelizeModel
  //   .findById(id)
  //   .then(async (evangelization) => {
  //     const week = evangelization?.weeks?.find(
  //       console.log(week)
  //       //(week) => week.data.id.toString() === weekId?.toString()
  //     );

  //     if (week) {
  //       await evangelizeModel
  //         .findByIdAndUpdate(
  //           { _id: id },
  //           { $set: { "weeks.$.data.$.status": status } }
  //         )
  //         .then(() => {
  //           res.status(200).send({
  //             status: true,
  //             data: "Week updated successfully!",
  //           });
  //         })
  //         .catch((err) => {
  //           //console.log(err);
  //           return next(createError(406, err));
  //         });
  //     } else {
  //       return next(createError(404, "There is no record with that id!"));
  //     }
  //   })
  //   .catch((err) => {
  //     if (err.kind === "ObjectId")
  //       return next(createError(404, "There is no record with that id!"));
  //     return next(createError(406, err));
  //   });
};

function weekOfTheMonth() {
  var d = new Date();
  var date = d.getDate();
  var day = d.getDay();

  return Math.ceil((date - 1 - day) / 7);
}

const promote = async (req, res, next) => {
  const { id } = req.params;
  const { church } = req.user;

  try {
    var evangelization = await evangelizeModel
      .findOne({
        _id: id,
        church,
      })
      .then(async (evangelization) => {
        if (evangelization !== null) {
          const newConsolidation = new consolidationModel({
            full_name: evangelization?.full_name,
            responsible: evangelization?.responsible,
            church: evangelization?.church,
            destination: evangelization?.destination,
            invited_by: evangelization?.invited_by,
            consolidator: evangelization?.consolidator,
          });

          newConsolidation
            .save()
            .then(async (consolidation) => {
              res.status(201).send({
                status: true,
                data: "Evangelization promote successfully!",
              });

              await evangelizeModel.findOneAndDelete({
                _id: id,
                church,
              });
            })
            .catch((err) => {
              // console.log(err);
              if (err.code === 11000)
                return next(
                  createError(406, "Already a consolidation with these data!")
                );

              return next(createError(406, err));
            });
        } else {
          return next(createError(404, "There is no record with that id!"));
        }
      })
      .catch((err) => {});
  } catch {
    return createError(
      404,
      "There is no record with that id or you don't have privileges!"
    );
  }

  // console.log(evangelization);

  // return;
};

// const getWeeksInMonth = (year, month, userId) => {
//   const weeks = [],
//     firstDate = new Date(year, month, 1),
//     lastDate = new Date(year, month + 1, 0),
//     numDays = lastDate.getDate();

//   let dayOfWeekCounter = firstDate.getDay();

//   for (let date = 1; date <= numDays; date++) {
//     if (dayOfWeekCounter === 0 || weeks.length === 0) {
//       weeks.push([]);
//     }
//     weeks[weeks.length - 1].push(date);
//     dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
//   }

//   return weeks
//     .filter((w) => !!w.length)
//     .map((w, index) => ({
//       name: `week_${index + 1}`,
//       status: "SIN_DATOS",
//       created: new Date(),
//       created_by: userId,
//       start: w[0],
//       end: w[w.length - 1],
//       //dates: w,
//     }));
// };

const weeks = (numberOfWeek, createdBy) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  let weeks = [];

  for (let i = numberOfWeek; i < 5; i++) {
    weeks.push({
      //created: `${yyyy}-${mm}-${dd}`,
      // created_by: createdBy,
      status: "SIN_DATOS",
      name: `week_${i}`,
    });
  }

  //return weeks;

  return [
    {
      created: `${yyyy}-${mm}`,
      created_by: createdBy,
      data: weeks,
    },
  ];
};

export default {
  create,
  getAll,
  getOne,
  update,
  remove,
  createComent,
  removeComment,
  updateWeek,
  insert,
  promote,
};
