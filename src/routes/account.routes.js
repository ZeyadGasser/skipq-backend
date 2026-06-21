import express from "express";
import { validateActiveOrganization } from "../middlewares/validateActiveOrganization.middleware.js";
import { validateLoginCredentials } from "../middlewares/validateLoginCredentials.middleware.js";
import { accountController } from "../container.js";
import { requireRole } from "../middlewares/requireRole.middlewares.js";
import { requireAuth } from "../middlewares/requireAuth.middlewares.js";
import { USER_ROLES } from "../utils/user.roles.js";
import { validateResetPasswordToken } from "../middlewares/validateResetPasswordToken.middleware.js";
import { orgController } from "../container.js";
import { rateLimiter } from "../middlewares/rate.limiter.middleware.js";
import { authController } from "../container.js";
import { verifyRefreshToken } from "../middlewares/verifyRefreshToken.middleware.js";
import { revokeRefreshToken } from "../middlewares/revokeRefreshToken.middleware.js";
import { verifyAccount } from "../middlewares/verifyAccount.middleware.js";
import { verifyOtp } from "../middlewares/verifyOtp.middleware.js";
export const router = express.Router();
/**
 * @openapi
 * /api/auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Login account
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - account_email
 *              - password
 *            properties:
 *              account_email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *    responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid email or password
 *       403:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
// /api/auth/login
router
  .route("/login")
  .post(
    rateLimiter(15 * 60 * 1000, 5),
    validateLoginCredentials,
    accountController.login,
  );
/**
 * @openapi
 * /api/auth/{org_id}/send-reset-password-email:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Send reset password email for an organization account
 *    parameters:
 *      - in: path
 *        name: org_id
 *        required: true
 *        schema:
 *          type: integer
 *        description: Organization ID
 *    responses:
 *       200:
 *         description: Reset password email sent successfully
 *       400:
 *         description: Invalid organization ID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Developer admin role required
 *       500:
 *         description: Internal server error
 */
// /api/auth/{org_id}/send-reset-password-email   //org_id --->path param
router
  .route("/:org_id/send-reset-password-email")
  .post(
    rateLimiter(60 * 60 * 1000, 3),
    requireAuth,
    requireRole(USER_ROLES.DEVELOPER_ADMIN),
    validateActiveOrganization(orgController.organizationService),
    accountController.sendResetPasswordEmail,
  );

/**
 * @openapi
 * /api/auth/reset-password:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Reset account password
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - token
 *              - password
 *            properties:
 *              token:
 *                type: string
 *              password:
 *                type: string
 *                format: password
 *    responses:
 *       200:
 *         description: Reset password successfully
 *       400:
 *         description: Token or password not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
// /api/auth/reset-password
router
  .route("/reset-password")
  .post(
    rateLimiter(15 * 60 * 1000, 3),
    validateResetPasswordToken,
    accountController.resetPassword,
  );
/**
 * @openapi
 * /api/auth/refresh-token:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Refresh access token
 *    responses:
 *       200:
 *         description: Token refreshed successfully
 *       400:
 *         description: Refresh token missing
 *       401:
 *         description: Session expired
 *       403:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Internal server error
 */
// api/auth/refresh-token
router
  .route("/refresh-token")
  .post(verifyRefreshToken(authController.AuthService));
/**
 * @openapi
 * /api/auth/logout:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Logout account
 *    responses:
 *       200:
 *         description: Logout successfully
 *       400:
 *         description: Refresh token missing
 *       401:
 *         description: Session expired
 *       403:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Logout failed
 */
// /api/auth/logout
router.route("/logout").post(revokeRefreshToken(authController.AuthService));
/**
 * @openapi
 * /api/auth/forgot-password:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Generate password reset OTP
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - account_email
 *            properties:
 *              account_email:
 *                type: string
 *                format: email
 *    responses:
 *       200:
 *         description: OTP has been sent
 *       400:
 *         description: Account email is required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Account is not verified
 *       500:
 *         description: Internal server error
 */
// /api/auth/forgot-password
router
  .route("/forgot-password")
  .post(
    verifyAccount(accountController.accountService),
    accountController.generateOtp,
  );
/**
 * @openapi
 * /api/auth/verify-otp:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Verify password reset OTP
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - account_email
 *              - otp_code
 *            properties:
 *              account_email:
 *                type: string
 *                format: email
 *              otp_code:
 *                type: string
 *    responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Email and OTP are required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
///api/auth/verify-otp
router
  .route("/verify-otp")
  .post(
    verifyOtp(accountController.accountService),
    accountController.verifyOtp,
  );
