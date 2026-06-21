import express from "express";
import { validateNearbyBranchesParams } from "../middlewares/validateNearbyBranchesParams.js";
import { branchController } from "../container.js";
import { validateServicesParams } from "../middlewares/validateServicesParams.middleware.js";
/**************************************************************************************** */
//export const router=express.Router();
export const router = express.Router({ mergeParams: true });
/**
 * @openapi
 * /api/organizations/{orgId}/branches:
 *  get:
 *    tags:
 *      - Branches
 *    summary: Get nearby branches
 *    parameters:
 *      - in: path
 *        name: orgId
 *        required: true
 *        schema:
 *          type: integer
 *        description: Organization ID
 *      - in: query
 *        name: longitude
 *        required: true
 *        schema:
 *          type: number
 *      - in: query
 *        name: latitude
 *        required: true
 *        schema:
 *          type: number
 *      - in: query
 *        name: page
 *        required: false
 *        schema:
 *          type: integer
 *          default: 1
 *      - in: query
 *        name: limit
 *        required: false
 *        schema:
 *          type: integer
 *          default: 10
 *    responses:
 *       200:
 *         description: Nearby branches fetched successfully
 *       400:
 *         description: Invalid branch search parameters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
//// /api/organizations/:orgId/branches?longitude=31.2357&latitude=30.0444&page=1&limit=10
router
  .route("/")
  .get(validateNearbyBranchesParams(), branchController.getNearbyBranches);

/**
 * @openapi
 * /api/organizations/{orgId}/branches/{branchId}/services:
 *  get:
 *    tags:
 *      - Branches
 *    summary: Get branch services
 *    parameters:
 *      - in: path
 *        name: orgId
 *        required: true
 *        schema:
 *          type: integer
 *        description: Organization ID
 *      - in: path
 *        name: branchId
 *        required: true
 *        schema:
 *          type: integer
 *        description: Branch ID
 *      - in: query
 *        name: name
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: page
 *        required: false
 *        schema:
 *          type: integer
 *          default: 1
 *      - in: query
 *        name: limit
 *        required: false
 *        schema:
 *          type: integer
 *          default: 10
 *    responses:
 *       200:
 *         description: Services fetched successfully
 *       400:
 *         description: Invalid service search parameters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
//// /api/organizations/:orgId/branches/:branchId/services?name=birth&page=1&limit=10
router
  .route("/:branchId/services")
  .get(validateServicesParams(), branchController.getServices); // Not Compleated yet
