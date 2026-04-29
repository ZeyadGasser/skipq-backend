import { ApiResponse } from "../utils/apiResponse.js";
import * as httpStatus from "../utils/http.status.js";
import { ACCOUNT_STATUS } from "../utils/account.status.js";
export const verifyAccount = (accountService) => {
  return async (req, res, next) => {
    try {
      const account_email = req.body.account_email;

      if (!account_email) {
        return ApiResponse.error(
          res,
          httpStatus.ERROR,
          "Account Email is required",
          httpStatus.BAD_REQUEST,
        );
      }

      const account = await accountService.getAccountByEmail(account_email);

      if (!account) {
        return ApiResponse.error(
          res,
          httpStatus.ERROR,
          "Account not found",
          httpStatus.NOT_FOUND,
        );
      }

      if (account.status_id !== ACCOUNT_STATUS.ACTIVE) {
        return ApiResponse.error(
          res,
          httpStatus.ERROR,
          "Account is not verified",
          httpStatus.FORBIDDEN,
        );
      }

      req.account = account;

      next();
    } catch (err) {
      next(err);
    }
  };
};
