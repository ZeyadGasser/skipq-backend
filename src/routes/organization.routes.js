import express from "express";
import { validateSignupOrganization } from "../middlewares/validateSignupOrganization.middleware.js";
import { orgController } from "../container.js";
import { requireAuth } from "../middlewares/requireAuth.middlewares.js";
import { USER_ROLES } from "../utils/user.roles.js";
import { requireRole } from "../middlewares/requireRole.middlewares.js";
import { rateLimiter } from "../middlewares/rate.limiter.middleware.js";

export const router = express.Router();
// /api/organizations/signup
router
  .route("/signup")
  .post(
    rateLimiter(60 * 60 * 1000, 10),
    validateSignupOrganization,
    orgController.signupOrganization,
  );

// /api/organizations/
router.route("/").get(orgController.getAllOrganizations);
// /api/organizations/:id
router
  .route("/:id")
  .patch(
    requireAuth,
    requireRole(USER_ROLES.DEVELOPER_ADMIN),
    orgController.updateOrganization,
  );
