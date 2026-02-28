import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";
import * as httpStatus from "../utils/http.status.js";

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // Check if header exists and starts with 'Bearer '
    // To prevent unnecessary JWT verification for non-bearer schemes (e.g., Basic)
    // and avoid 'startsWith' errors if authHeader is undefined (Robustness check)

    // 1. Robustness: Ensuring the code doesn't crash if the header is missing or improperly formatted (e.g., Basic Auth).
    // 2. Performance: Preventing the server from attempting expensive JWT verification on non-bearer schemes, saving CPU resources.

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "No valid token provided",
        httpStatus.UNAUTHORIZED,
      );
    }
    //Bearer
    const token = authHeader.split(" ")[1];

    if (!token) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Invalid token format",
        httpStatus.UNAUTHORIZED,
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS);

    req.user = decoded;

    next();
  } catch (error) {
    return ApiResponse.error(
      res,
      httpStatus.ERROR,
      "Invalid or expired token",
      httpStatus.UNAUTHORIZED,
    );
  }
};
