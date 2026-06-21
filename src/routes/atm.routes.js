import express from "express";
import { validateNearbyBranchesParams } from "../middlewares/validateNearbyBranchesParams.js";
import { branchController } from "../container.js";
import { atmController } from "../container.js";
import { validateAtmParams } from "../middlewares/validateAtmParams.middleware.js";
/**************************************************************************************** */
export const router = express.Router({ mergeParams: true });

/**
 * @openapi
 * /api/organizations/{orgId}/banks:
 *  get:
 *    tags:
 *      - Banks
 *    summary: Get all banks for an organization
 *    parameters:
 *      - in: path
 *        name: orgId
 *        required: true
 *        schema:
 *          type: integer
 *        description: Organization ID
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
 *      - in: query
 *        name: search
 *        required: false
 *        schema:
 *          type: string
 *    responses:
 *       200:
 *         description: Banks fetched successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
//// /api/organizations/:orgId/banks?page=1&limit=10&search=...
router.route("/").get(branchController.getAllBanks);

/**
 * @openapi
 * /api/organizations/{orgId}/banks/{bankId}/atms:
 *  get:
 *    tags:
 *      - ATMs
 *    summary: Get nearby ATMs for a bank
 *    parameters:
 *      - in: path
 *        name: orgId
 *        required: true
 *        schema:
 *          type: integer
 *        description: Organization ID
 *      - in: path
 *        name: bankId
 *        required: true
 *        schema:
 *          type: integer
 *        description: Bank ID
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
 *         description: Nearby ATMs fetched successfully
 *       400:
 *         description: Invalid ATM search parameters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
//// /api/organizations/:orgId/banks/:bankId/atms?longitude=31.2357&latitude=30.0444&page=1&limit=10
router
  .route("/:bankId/atms")
  .get(validateNearbyBranchesParams(), atmController.getNearbyAtms);

/**
 * @openapi
 * /api/organizations/{orgId}/banks/{bankId}/atms/{atmId}:
 *  get:
 *    tags:
 *      - ATMs
 *    summary: Get specific bank ATM details
 *    parameters:
 *      - in: path
 *        name: orgId
 *        required: true
 *        schema:
 *          type: integer
 *        description: Organization ID
 *      - in: path
 *        name: bankId
 *        required: true
 *        schema:
 *          type: integer
 *        description: Bank ID
 *      - in: path
 *        name: atmId
 *        required: true
 *        schema:
 *          type: integer
 *        description: ATM ID
 *    responses:
 *       200:
 *         description: ATM details fetched successfully
 *       400:
 *         description: Invalid ATM parameters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
//// /api/organizations/:orgId/banks/:bankId/atms/:atmId
router
  .route("/:bankId/atms/:atmId")
  .get(validateAtmParams(), atmController.getSpecificBankAtmDetails);

/**
 * @openapi
 * /api/organizations/{orgId}/banks/{bankId}/atms/{atmId}/check-withdraw:
 *  get:
 *    tags:
 *      - ATMs
 *    summary: Check ATM withdrawal availability
 *    parameters:
 *      - in: path
 *        name: orgId
 *        required: true
 *        schema:
 *          type: integer
 *        description: Organization ID
 *      - in: path
 *        name: bankId
 *        required: true
 *        schema:
 *          type: integer
 *        description: Bank ID
 *      - in: path
 *        name: atmId
 *        required: true
 *        schema:
 *          type: integer
 *        description: ATM ID
 *      - in: query
 *        name: amount
 *        required: true
 *        schema:
 *          type: number
 *    responses:
 *       200:
 *         description: Withdrawal check completed successfully
 *       400:
 *         description: Invalid amount or ATM parameters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
//// /api/organizations/:orgId/banks/:bankId/atms/:atmId/check-withdraw?amount=300
router
  .route("/:bankId/atms/:atmId/check-withdraw")
  .get(validateAtmParams(), atmController.checkWithdrawal);
