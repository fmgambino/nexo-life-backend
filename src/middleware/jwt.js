import jwt from "jsonwebtoken";
import createError from "../util/errors/createError.js";

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  // const token = authHeader && authHeader.split(" ")[1];

  console.log(authHeader);

  if (authHeader == null) return next(createError(401, "Not authorized!"));

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, token) => {
    //console.log(err);

    if (err) return next(createError(401, "Not authorized!"));

    //console.log(token);

    req.user = token;

    next();
  });
};

// export const isAuthenticated = (req, res, next) => {
//   //console.log(req.cookies.access_token);
//   const token = req.cookies.access_token;
//   if (!token) return next(createError(401, "Usuario no authenticado!"));

//   jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
//     if (err)
//       return next(
//         createError(401, "Usuario authenticado, pero el token es inválido!")
//       );

//     req.user = user;
//     next();
//   });
// };

export const checkRole = (roles) => async (req, res, next) => {
  //console.log(roles);
  if ([].concat(roles).includes(req.user.rol)) {
    next();
  } else {
    return next(createError(401, "Not authorized!"));
  }
};

// export const verifyRefreshToken = () => async (req, res, next) => {
//   try {
//     const rf_token = req.cookies.refresh_token;
//     if (!rf_token) return next(createError(404, "Usuario no authenticado!."));

//     jwt.verify(
//       rf_token,
//       process.env.REFRESH_TOKEN_SECRET,
//       async (err, result) => {
//         if (err) return next(createError(404, "Usuario no authenticado!."));
//         return true;
//       }
//     );
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

export default {
  isAuthenticated,
  checkRole,
};
