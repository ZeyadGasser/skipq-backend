import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS, {
    expiresIn: "15m",
  });
  return accessToken;
};

export const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "7d",
  });
  return refreshToken;
};
