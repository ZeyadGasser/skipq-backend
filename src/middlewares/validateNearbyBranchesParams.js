import { ApiResponse } from "../utils/apiResponse.js";
import * as httpStatus from "../utils/http.status.js";

export const validateNearbyBranchesParams = () => {
  return (req, res, next) => {
    const { orgId } = req.params;
    const searchParams = {
      location: {
        latitude: req.query.latitude,
        longitude: req.query.longitude,
      },
      org_id: orgId,
      page: req.query.page,
      limit: req.query.limit,
    };
    if (!orgId) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "A valid Organization ID must be provided in the request parameters.",
        httpStatus.BAD_REQUEST,
      );
    }
    if (!searchParams.location.latitude || !searchParams.location.longitude) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "latitude and longitude are required",
        httpStatus.BAD_REQUEST,
      );
    }

    const org_id = parseInt(searchParams.org_id);
    const lat = parseFloat(searchParams.location.latitude);
    const lng = parseFloat(searchParams.location.longitude);
    const page = parseInt(searchParams.page || 1);
    const limit = parseInt(searchParams.limit || 10);

    if (isNaN(lat) || isNaN(lng)) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Latitude and longitude must be valid numbers",
        httpStatus.BAD_REQUEST,
      );
    }

    if (isNaN(page) || page < 1) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Page must be a number greater than 0",
        httpStatus.BAD_REQUEST,
      );
    }

    if (isNaN(limit) || limit < 1) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Limit must be a number greater than 0",
        httpStatus.BAD_REQUEST,
      );
    }
    if (isNaN(org_id)) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Organization ID must be a number",
        httpStatus.BAD_REQUEST,
      );
    }
    req.searchParams = { location: { lat, lng }, page, limit, org_id };
    next();
  };
};
