import express from "express";
import { validateNearbyBranchesParams } from "../middlewares/validateNearbyBranchesParams.js";
import { branchController } from "../container.js";
import { validateServicesParams } from "../middlewares/validateServicesParams.middleware.js";
/**************************************************************************************** */
//export const router=express.Router();
export const router = express.Router({ mergeParams: true });
//// /api/organizations/:orgId/branches?longitude=31.2357&latitude=30.0444&page=1&limit=10
router
  .route("/")
  .get(validateNearbyBranchesParams(), branchController.getNearbyBranches);

//// /api/organizations/:orgId/branches/:branchId/services?name=birth&page=1&limit=10
router
  .route("/:branchId/services")
  .get(validateServicesParams(), branchController.getServices); // Not Compleated yet
