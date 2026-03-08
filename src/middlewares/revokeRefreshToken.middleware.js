import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.js";
import * as httpStatus from "../utils/http.status.js";

export const revokeRefreshToken = (authService) => {
    return async (req, res, next) => {
        let refreshToken; 

        try {
            refreshToken = req.cookies.refreshToken;
            
            if (!refreshToken) {
                return ApiResponse.error(res, httpStatus.ERROR, "Refresh token missing", httpStatus.BAD_REQUEST);
            }

            const tokenRecord = await authService.checkRefreshToken(refreshToken);
            if (!tokenRecord) {
                return ApiResponse.error(
                    res,
                    httpStatus.ERROR,
                    "Invalid or expired refresh token",
                    httpStatus.FORBIDDEN
                );
            }

            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
            
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) {
                res.clearCookie("refreshToken");
                await authService.revokeToken(refreshToken);
                
                return ApiResponse.error(
                    res, 
                    httpStatus.ERROR, 
                    "Session expired. Please login again.",
                    httpStatus.UNAUTHORIZED
                );
            }
            await authService.revokeToken(refreshToken);
            res.clearCookie("refreshToken");

            return ApiResponse.success(res, httpStatus.SUCCESSFULL,
                "Logout successfully",
                { },
                httpStatus.OK);
                
        } catch (error) {

            return ApiResponse.error(res, httpStatus.ERROR, "Logout failed", httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}