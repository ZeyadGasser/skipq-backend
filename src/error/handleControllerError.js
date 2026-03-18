import { ApiResponse } from "../utils/apiResponse.js";
import * as httpStatus from "../utils/http.status.js";
import { CustomError } from "../error/CustomError.js";

// helper function
export const handleControllerError = (res, error) => {
  if (error instanceof CustomError) {
    return ApiResponse.error(
        res,
        httpStatus.ERROR,
        error.message,
        error.statusCode
    )
  }
  
    return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "An unexpected error occurred. Please try again later.",
        httpStatus.INTERNAL_SERVER_ERROR,
    );
};