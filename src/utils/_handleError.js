import * as httpStatus from "./http.status.js";
import { ApiResponse } from "./apiResponse.js";

export const _handleError = (res, error) => {
  console.error("Error Log:", error.message); //ERROR message dont desplay it to user

  const isDuplicate =
    error.message && error.message.toLowerCase().includes("already exists");
  if (isDuplicate) {
    return ApiResponse.error(
      res,
      httpStatus.ERROR,
      "Unable to complete registration. Please check your details or try to login.",
      httpStatus.CONFLICT,
    );
  }

  return ApiResponse.error(
    res,
    httpStatus.ERROR,
    "An unexpected error occurred. Please try again later.",
    httpStatus.INTERNAL_SERVER_ERROR,
  );
};
