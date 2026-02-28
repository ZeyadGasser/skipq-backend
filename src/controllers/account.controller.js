import * as httpStatus from "../utils/http.status.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { _handleError } from "../utils/_handleError.js";

export class AccountController {
  constructor(accountService) {
    this.accountService = accountService;
  }

  /************************************************************* */
  login = async (req, res) => {
    try {
      const { account_email, password } = req.body;
      const targetAccount = {
        account_email: account_email,
        password: password,
      };

      const token = await this.accountService.login({ targetAccount });
        res.cookie('refreshToken', token.refreshToken, {
            httpOnly: true,     // Prevents client-side scripts from accessing the cookie (XSS protection)
            secure: true,       // Ensures the cookie is sent only over HTTPS
            sameSite: 'Strict',  // Prevents the browser from sending the cookie with cross-site requests (CSRF protection)
            maxAge: 7 * 24 * 60 * 60 * 1000 // Automatically deletes the cookie from the browser after 7 days
        });
      return ApiResponse.success(
        res,
        httpStatus.SUCCESSFULL,
        "Logged in successfully",
        {  accessToken: token.accessToken },
        httpStatus.OK,
      );
    } catch (error) {
      return _handleError(res, error);
    }
  };
  /*************************************************************** */
  sendResetPasswordEmail = async (req, res) => {
    try {
      // we  need a full queue system like BullMQ or Redis.
      await this.accountService.sendResetPasswordEmail(
        req.organization.account_id,
      );
      return ApiResponse.success(
        res,
        httpStatus.SUCCESSFULL,
        "Reset password email sent successfully",
        { token },
        httpStatus.OK,
      );
    } catch (error) {
      return _handleError(res, error);
    }
  };
  /************************************************************** */
  resetPassword = async (req, res) => {
    try {
      const password = req.body.password;
      const account = req.account;
      console.log("acccount ", account);
      await this.accountService.resetPassword(account, password);

      return ApiResponse.success(
        res,
        httpStatus.SUCCESSFULL,
        "Reset password successfully",
        httpStatus.OK,
      );
    } catch (error) {
      return _handleError(res, error);
    }
  };
}
