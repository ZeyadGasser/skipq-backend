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
export const router = express.Router();
// /api/auth/login
router
  .route("/login")
  .post(
    rateLimiter(15 * 60 * 1000, 5),
    validateLoginCredentials,
    accountController.login,
  );
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

// /api/auth/reset-password
router
  .route("/reset-password")
  .post(
    rateLimiter(15 * 60 * 1000, 3),
    validateResetPasswordToken,
    accountController.resetPassword,
  );
// api/auth/refresh-token
router
    .route("/refresh-token")
    .post(verifyRefreshToken(authController.AuthService));
// /api/auth/logout
router
    .route("/logout")
    .post(revokeRefreshToken(authController.AuthService));
/*





// /api/auth/forgot-password
router.post('/forgot-password', accountController.sendResetPasswordEmail);


*/
