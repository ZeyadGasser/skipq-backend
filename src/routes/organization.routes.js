import express from "express";
import { validateSignupOrganization } from "../middlewares/validateSignupOrganization.middleware.js";
import { orgController } from "../container.js";
import { requireAuth } from "../middlewares/requireAuth.middlewares.js";
import { USER_ROLES } from "../utils/user.roles.js";
import { requireRole } from "../middlewares/requireRole.middlewares.js";
import { rateLimiter } from "../middlewares/rate.limiter.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

export const router = express.Router();
/**
 * @openapi
 * /api/organizations/signup:
 *  post:
 *    tags:
 *      - Organizations
 *    summary: Sign up an organization
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - org_name
 *              - org_abbreviation
 *              - user_name
 *              - account_email
 *              - org_description
 *              - location
 *              - org_picture
 *            properties:
 *              org_name:
 *                type: string
 *              org_abbreviation:
 *                type: string
 *              user_name:
 *                type: string
 *              account_email:
 *                type: string
 *                format: email
 *              org_description:
 *                type: string
 *              org_social_link:
 *                type: string
 *                format: uri
 *              location:
 *                type: object
 *                properties:
 *                  latitude:
 *                    type: number
 *                  longitude:
 *                    type: number
 *              org_picture:
 *                type: string
 *                format: binary
 *    responses:
 *       201:
 *         description: Organization created successfully
 *       400:
 *         description: Invalid organization signup data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
// /api/organizations/signup
router

  .route("/signup")
  .post(
    rateLimiter(60 * 60 * 1000, 10),
    upload.single("org_picture"),
    validateSignupOrganization,
    orgController.signupOrganization,
  );
/**
 * @openapi
 * /api/organizations:
 *  get:
 *    tags:
 *      - Organizations
 *    summary: Get all organizations
 *    responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
// /api/organizations
router.route("").get(orgController.getAllOrganizations);
/**
 * @openapi
 * /api/organizations/{id}:
 *  patch:
 *    tags:
 *      - Organizations
 *    summary: Update organization
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: Organization ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            additionalProperties: true
 *    responses:
 *       200:
 *         description: Update Organization successfully
 *       400:
 *         description: Organization ID and update data are required
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Developer admin role required
 *       500:
 *         description: Internal server error
 */
// /api/organizations/:id
router
  .route("/:id")
  .patch(
    requireAuth,
    requireRole(USER_ROLES.DEVELOPER_ADMIN),
    orgController.updateOrganization,
  );
