import express from "express";
import { validateNearbyBranchesParams } from "../middlewares/validateNearbyBranchesParams.js";
import { branchController } from "../container.js";
/**************************************************************************************** */
//export const router=express.Router();
export const router = express.Router({ mergeParams: true });
//// /api/organizations/:orgId/branches/nearby
router.route('/nearby')
      .get(validateNearbyBranchesParams(),branchController.getNearbyBranches);

      