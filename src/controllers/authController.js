import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

import userModel from "../models/userModel.js";
import createError from "./../util/errors/createError.js";
import generateJwt from "./../util/generators/generateJwt.js";

import nodemailer  from 'nodemailer';

const readTemplateFile = (fileName) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, fileName);
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};


const updatePassword = async (req, res, next) => {

  const { email, newPassword } = req.body;

  try {
    if (!email || !newPassword) {
      return next(createError(422, 'Missing required fields.'));
    }
    const usuario = await userModel.findOne({ email });

    if (!usuario) {
      return next(createError(404, `The user with email ${email} does not exist`));
    }
    
    usuario.password = newPassword;
    await usuario.save();

    return res.status(200).send({
      success: true,
      message: 'Password updated successfully.',
    });

  } catch (error) {
    console.log(`ERROR ${error}`);
    return next(createError(500, 'Server error.'));
  }
}

const requestPasswordChange = async (req, res, next) => {

  const { email, name, activate, url } = req.body;

  if (!email) {
    return next(createError(422, `Email name can not be empty!`));
  }

  try {
    const usuario = await userModel.findOne({ email });

    if (!usuario) {
      return next(createError(404, `User with email ${ email } not found`));
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
    });
    
    const templateFileName = activate ? 'activate.html' : 'forgot.html';
    const emailTemplate = await readTemplateFile(templateFileName);

//     const emailTemplate = `
//     <html>
//     <body>
//       <h1>Hi!</h1>
//       <p>To change your password click on the following link</p>
//     </body>
//     </html>
//     `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Nexo life - password change request',
      html: emailTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        return res.status(200).send({
          success: true,
          message: 'An email with password reset instructions has been sent.',
        });
      }
      return next(createError(500, `Password reset email could not be sent.`));
    });

  } catch (error) {
    return next(createError(500, `Server error`));
  }

}


const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  await userModel
    .findOne({ email })
    .select("+password")
    .then(async (user) => {
      if (user === null) return next(createError(404, "User not found"));

      if (!(await user?.isPasswordMatch(password)))
        return next(createError(401, "Incorrect password"));

      const { password: deletePassword, __v, ...otherData } = user?._doc;

      const token = generateJwt.generateAccessToken(
        otherData?._id,
        otherData?.rol,
        otherData?.church
      );

      res.status(200).send({
        status: true,
        data: otherData,
        token,
      });
    })
    .catch((err) => {
      console.log(`ERROR: ${err}`);
      return next(createError(406, err));
    });
};

const authCreateUser = async (req, res, next) => {
  const { rol: authRol } = req.user;
  const { name, email, password, profile, rol, address, phone, church } =
    req.body;

  if((["SuperAdministrator","Administrator"].includes(rol) && authRol === "Administrator") || (authRol === "SuperAdministrator" && rol === "Responsible")) {
    return next(
      createError(
        401,
        "You do not have permissions to create this type of users!"
      )
    );
  }
  
  var newUser = new userModel({
    name,
    email,
    password,
    church,
    profile,
    rol,
    address,
    phone,
  });

  await newUser
    .save()
    .then((user) => {
      res.status(201).send({
        status: true,
        data: "User created successfully!",
      });
    })
    .catch((err) => {
      if (err.code === 11000)
        return next(createError(406, "Already a user with these data!"));

      return next(createError(406, err));
    });

};

// const authCreateUserOld = async (req, res, next) => {
//   const { rol: authRol } = req.user;
//   const { name, email, password, profile, rol, address, phone, church } =
//     req.body;



//   if (authRol === "SuperAdministrator" && rol === "SuperAdministrator") {
//     var newUser = new userModel({
//       name,
//       email,
//       password,
//       church,
//       profile,
//       rol,
//       address,
//       phone,
  
//     });
//   } else if (authRol === "SuperAdministrator" && rol === "Administrator") {
//     var newUser = new userModel({
//       name,
//       email,
//       password,
//       church,
//       profile,
//       rol,
//       address,
//       phone,
//     });
//   } else if (
//     (authRol === "SuperAdministrator" && rol === "Responsible") ||
//     (authRol === "Administrator" && rol === "SuperAdministrator") ||
//     (authRol === "Administrator" && rol === "Administrator")
//   ) {
//     return next(
//       createError(
//         401,
//         "You do not have permissions to create this type of users!"
//       )
//     );
//   } else {
//     var newUser = new userModel({
//       name,
//       email,
//       password,
//       church: authChurch,
//       profile,
//       rol,
//       address,
//       phone,
//     });
//   }

//   await newUser
//     .save()
//     .then((user) => {
//       res.status(201).send({
//         status: true,
//         data: "User created successfully!",
//       });
//     })
//     .catch((err) => {
//       if (err.code === 11000)
//         return next(createError(406, "Already a user with these data!"));

//       return next(createError(406, err));
//     });
// };

const getAll = async (req, res, next) => {
  const { rol, church } = req.user;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  let selectRol =
  rol !== null && rol === "SuperAdministrator" ? "Administrator" : "Responsible";

  

  if (rol === "SuperAdministrator") {
    const userCount = await userModel
      .find({
        rol: selectRol,
      })
      .count({});
      console.log(`rol: ${rol} church: ${church} selectRol: ${selectRol} skip: ${skip} userCount: ${userCount}`);
    if (skip >= userCount) {
      return res.status(200).send({
        status: false,
        data: {
          pagination: {
            prev: 0,
            page: 0,
            next: 0,
            total: 0,
          },
          info: [],
        },
      });
    }

    await userModel
      .find({
        rol: selectRol,
      })
      .skip(skip)
      .limit(limit)
      .then((users) => {
        //console.log(users);
        if (users.length > 0) {
          res.status(200).send({
            status: true,
            data: {
              pagination: {
                prev: Number(page) - 1 > 0 ? Number(page) - 1 : false,
                page: Number(page),
                next: userCount > limit * page ? Number(page) + 1 : false,
                total: userCount,
              },
              info: users,
            },
          });
        } else {
          res.status(200).send({
            status: true,
            data: {
              pagination: {
                prev: false,
                page: 0,
                next: false,
                total: 0,
              },
              info: [],
            },
          });
        }
      })
      .catch((err) => {
        return next(createError(404, err));
      });
  } else {

    const userCount = await userModel
      .find({
        rol: selectRol,
        church,
      })
      .count({});

    if (skip >= userCount) {
      return res.status(200).send({
        status: false,
        data: {},
        message: "This page does not exist!",
      });
    }

    await userModel
      .find({
        rol: selectRol,
        church,
      })
      .skip(skip)
      .limit(limit)
      .then((users) => {
        if (users.length > 0) {
          res.status(200).send({
            status: true,
            data: {
              pagination: {
                prev: Number(page) - 1 > 0 ? Number(page) - 1 : false,
                page: Number(page),
                next: userCount > limit * page ? Number(page) + 1 : false,
                total: userCount,
              },
              info: users,
            },
          });
        } else {
          res.status(200).send({
            status: true,
            data: {
              pagination: {
                prev: false,
                page: 0,
                next: false,
                total: 0,
              },
              info: [],
            },
          });
        }
      })
      .catch((err) => {
        return next(createError(404, err));
      });
  }
};

const getAllResponsibles = async (req, res, next) => {
  const { church } = req.user;

  await userModel
    .find({
      rol: "Responsible",
      church,
    })
    .then((users) => {
      //console.log(users);
      if (users.length > 0) {
        res.status(200).send({
          status: true,
          data: users,
        });
      } else {
        res.status(200).send({
          status: true,
          data: [],
        });
      }
    })
    .catch((err) => {
      return next(createError(404, err));
    });
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const usuario = await userModel.findOne({ _id: id });


    if (!usuario) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    res.status(200).send(usuario);

  } catch (error) {
    return next(createError(406,  'Not a valid ID!' ));
  }
};


const update = async (req, res, next) => {
  const { id } = req.params;
  // const { name, password, profile, rol, address, phone } = req.body;
  const {rol, ... all } = req.body;
  let { rol: role } = req.user;


  if(!["SuperAdministrator","Administrator"].includes(role) && !["Administrator","Responsible"].includes(rol)) {
    return next(
      createError(
        401,
        "You do not have permissions to delete this type of users!"
      )
    );
  }


  try {
    const usuario = await userModel.findByIdAndUpdate(id, {rol, ... all});

    if (usuario) {
      res.status(200).send({
        status: true,
        data: "User updated successfully!",
      });
    } else {
      return next(createError(404, "There is no record with that id!"));
    }
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return next(createError(406, "Already a user with these data!"));
    }
    if (err.kind === "ObjectId") {
      return next(createError(404, "There is no record with that id!"));
    }
    return next(createError(406, err));
  }

  // await userModel
  //   .findById(id)
  //   .then(async (updateUser) => {
  //     if (role === "SuperAdministrator" && updateUser.rol === "Administrator") {
  //       if (password !== undefined) {
  //         await userModel
  //           .findByIdAndUpdate(id, {
  //             name,
  //             password,
  //             profile,
  //             rol,
  //             address,
  //             phone,
  //           })
  //           .then(() => {
  //             res.status(200).send({
  //               status: true,
  //               data: "User updated successfully!",
  //             });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             if (err.code === 11000)
  //               return next(
  //                 createError(406, "Already a user with these data!")
  //               );
  //             if (err.kind === "ObjectId")
  //               return next(
  //                 createError(404, "There is no record with that id!")
  //               );
  //             return next(createError(406, err));
  //           });
  //       } else {
  //         await userModel
  //           .findByIdAndUpdate(id, {
  //             name,
  //             profile,
  //             rol,
  //             address,
  //             phone,
  //           })
  //           .then(() => {
  //             res.status(200).send({
  //               status: true,
  //               data: "User updated successfully!",
  //             });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             if (err.code === 11000)
  //               return next(
  //                 createError(406, "Already a user with these data!")
  //               );
  //             if (err.kind === "ObjectId")
  //               return next(
  //                 createError(404, "There is no record with that id!")
  //               );
  //             return next(createError(406, err));
  //           });
  //       }
  //     } else if (role === "Administrator" && updateUser.rol === "Responsible") {
  //       if (password !== undefined) {
  //         await userModel
  //           .findByIdAndUpdate(id, {
  //             name,
  //             password,
  //             profile,
  //             rol,
  //             address,
  //             phone,
  //           })
  //           .then(() => {
  //             res.status(200).send({
  //               status: true,
  //               data: "User updated successfully!",
  //             });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             if (err.code === 11000)
  //               return next(
  //                 createError(406, "Already a user with these data!")
  //               );
  //             if (err.kind === "ObjectId")
  //               return next(
  //                 createError(404, "There is no record with that id!")
  //               );
  //             return next(createError(406, err));
  //           });
  //       } else {
  //         await userModel
  //           .findByIdAndUpdate(id, {
  //             name,
  //             profile,
  //             rol,
  //             address,
  //             phone,
  //           })
  //           .then(() => {
  //             res.status(200).send({
  //               status: true,
  //               data: "User updated successfully!",
  //             });
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             if (err.code === 11000)
  //               return next(
  //                 createError(406, "Already a user with these data!")
  //               );
  //             if (err.kind === "ObjectId")
  //               return next(
  //                 createError(404, "There is no record with that id!")
  //               );
  //             return next(createError(406, err));
  //           });
  //       }
  //     } else {
  //       return next(
  //         createError(
  //           401,
  //           "You do not have permissions to delete this type of users!"
  //         )
  //       );
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     if (err.kind === "ObjectId")
  //       return next(createError(404, "There is no record with that id!"));
  //     return next(createError(406, err));
  //   });
};

const remove = async (req, res, next) => {
  let { id } = req.params;
  let { rol } = req.user;

  await userModel
    .findById(id)
    .then(async (removeUser) => {
      if (rol === "SuperAdministrator" && removeUser.rol === "Administrator") {
        await userModel
          .findByIdAndDelete(id)
          .then(() => {
            res.status(200).send({
              status: true,
              data: "User removed successfully!",
            });
          })
          .catch((err) => {
            if (err.kind === "ObjectId")
              return next(createError(404, "There is no record with that id!"));
            return next(createError(406, err));
          });
      } else if (rol === "Administrator" && removeUser.rol === "Responsible") {
        await userModel
          .findByIdAndDelete(id)
          .then(() => {
            res.status(200).send({
              status: true,
              data: "User removed successfully!",
            });
          })
          .catch((err) => {
            if (err.kind === "ObjectId")
              return next(createError(404, "There is no record with that id!"));
            return next(createError(406, err));
          });
      } else {
        return next(
          createError(
            401,
            "You do not have permissions to delete this type of users!"
          )
        );
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.kind === "ObjectId")
        return next(createError(404, "There is no record with that id!"));
      return next(createError(406, err));
    });
};

export default {
  authUser,
  authCreateUser,
  getAll,
  getAllResponsibles,
  update,
  remove,
  requestPasswordChange,
  getUserById,
  updatePassword,
};
