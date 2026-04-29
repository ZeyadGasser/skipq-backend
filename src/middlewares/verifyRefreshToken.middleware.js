import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";
import * as httpStatus from "../utils/http.status.js";
import { generateAccessToken } from "../utils/generateJWT.js";

export const verifyRefreshToken = (authService) => {
  return async (req, res, next) => {
    let refreshToken;

    try {
      refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return ApiResponse.error(
          res,
          httpStatus.ERROR,
          "Refresh token missing",
          httpStatus.BAD_REQUEST,
        );
      }

      const tokenRecord = await authService.checkRefreshToken(refreshToken);
      if (!tokenRecord) {
        return ApiResponse.error(
          res,
          httpStatus.ERROR,
          "Invalid or expired refresh token",
          httpStatus.FORBIDDEN,
        );
      }

      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);

      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        throw { name: "TokenExpiredError" };
      }

      const newAccessToken = generateAccessToken({
        account_email: decoded.account_email,
        role_id: decoded.role_id,
      });

      return ApiResponse.success(
        res,
        httpStatus.SUCCESSFULL,
        "Token refreshed successfully",
        { accessToken: newAccessToken },
        httpStatus.OK,
      );
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        await authService.revokeToken(refreshToken);

        return ApiResponse.error(
          res,
          httpStatus.ERROR,
          "Session expired. Please login again.",
          httpStatus.UNAUTHORIZED,
        );
      }
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Token expired or invalid",
        httpStatus.FORBIDDEN,
      );
    }
  };
};
