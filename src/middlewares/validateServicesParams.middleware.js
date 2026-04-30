import { ApiResponse } from "../utils/apiResponse.js";
import * as httpStatus from "../utils/http.status.js";

export const validateServicesParams = () => {
  return (req, res, next) => {
    const { orgId, branchId } = req.params;
    let { page, limit, name } = req.query;

    if (!orgId) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "A valid Organization ID must be provided in the request parameters.",
        httpStatus.BAD_REQUEST,
      );
    }

    if (!branchId) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "A valid Branch ID must be provided in the request parameters.",
        httpStatus.BAD_REQUEST,
      );
    }

    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;

    if (isNaN(page) || page <= 0) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Page must be a positive number.",
        httpStatus.BAD_REQUEST,
      );
    }

    if (isNaN(limit) || limit <= 0) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Limit must be a positive number.",
        httpStatus.BAD_REQUEST,
      );
    }

    if (limit > 50) limit = 50;
    req.cleanedQuery = {
      page,
      limit,
      name: name?.trim() || "",
    };

    next();
  };
};
