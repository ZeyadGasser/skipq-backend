import express from "express";
import { validateNearbyBranchesParams } from "../middlewares/validateNearbyBranchesParams.js";
import { branchController } from "../container.js";
import { atmController } from "../container.js";
import {validateAtmParams}from"../middlewares/validateAtmParams.middleware.js"
/**************************************************************************************** */
export const router = express.Router({ mergeParams: true });

//// /api/organizations/:orgId/banks?page=1&limit=10&search=...
router.route('/')
      .get(branchController.getAllBanks);


//// /api/organizations/:orgId/banks/:bankId/atms?longitude=31.2357&latitude=30.0444&page=1&limit=10
router.route('/:bankId/atms')
    .get(validateNearbyBranchesParams(),atmController.getNearbyAtms)

//// /api/organizations/:orgId/banks/:bankId/atms/:atmId
router.route('/:bankId/atms/:atmId')
    .get(validateAtmParams(),atmController.getSpecificBankAtmDetails)


//// /api/organizations/:orgId/banks/:bankId/atms/:atmId/check-withdraw?amount=300
router.route('/:bankId/atms/:atmId/check-withdraw')
    .get(validateAtmParams(),atmController.checkWithdrawal)

