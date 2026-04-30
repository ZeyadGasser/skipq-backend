import * as httpStatus from "../utils/http.status.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { _handleError } from "../utils/_handleError.js";

export const verifyOtp = (accountService) => {
  return async (req, res, next) => {
    try {
      const account_email = req.body.account_email;
      const otp_code = req.body.otp_code;

      if (!account_email || !otp_code) {
        return ApiResponse.error(
          res,
          httpStatus.ERROR,
          "Email and OTP are required",
          httpStatus.BAD_REQUEST,
        );
      }

      const account = await accountService.getAccountByEmail(account_email);

      if (!account) {
        return ApiResponse.error(
          res,
          httpStatus.ERROR,
          "Invalid email or expired OTP",
          httpStatus.BAD_REQUEST,
        );
      }

      const otpRecord = await accountService.getOtpByAccountId(
        account.account_id,
      );

      if (!otpRecord || otpRecord.otp_code !== otp_code) {
        return ApiResponse.error(
          res,
          httpStatus.ERROR,
          "Invalid email or expired OTP",
          httpStatus.BAD_REQUEST,
        );
      }

      if (otpRecord.expires_at < new Date()) {
        return ApiResponse.error(
          res,
          httpStatus.ERROR,
          "Invalid email or expired OTP",
          httpStatus.BAD_REQUEST,
        );
      }

      req.account_id = account.account_id;
      req.otp_id = otpRecord.otp_id;

      next();
    } catch (error) {
      _handleError(res, error);
    }
  };
};
