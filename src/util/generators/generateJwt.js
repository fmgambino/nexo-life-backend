import jwt from "jsonwebtoken";

const generateAccessToken = (id, rol, church) => {
  return jwt.sign(
    {
      id,
      rol,
      church,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "3h",
    }
  );
};

const generateRefreshToken = (id) => {
  return jwt.sign(id, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

export default {
  generateAccessToken,
  generateRefreshToken,
};
