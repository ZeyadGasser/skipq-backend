import { accountService } from "../container.js";
import { ACCOUNT_STATUS } from "../utils/account.status.js";
import { ApiResponse } from "../utils/apiResponse.js";
import * as httpStatus from "../utils/http.status.js";

// TODO: Refactor this middleware to reduce tight coupling and improve maintainability.

export const validateLoginCredentials = async (req, res, next) => {
  try {
    const { account_email, password } = req.body;
    if (!account_email || !password) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Email and password are required",
        httpStatus.BAD_REQUEST,
      );
    }


    const targetAccount = await accountService.auth_service(
      account_email,
      password,
    );

    if (!targetAccount) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Invalid email or password",
        httpStatus.UNAUTHORIZED,
      );
    }
    if (targetAccount.status_id !== ACCOUNT_STATUS.ACTIVE) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Invalid credentials",
        httpStatus.FORBIDDEN,
      );
    }
    req.targetAccount = targetAccount;
    next();
  } catch (error) {
    next(error);
  }
};
