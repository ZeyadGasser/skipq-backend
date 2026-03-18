import { ApiResponse } from "../utils/apiResponse.js";
import * as httpStatus from "../utils/http.status.js";
import { handleControllerError } from "../error/handleControllerError.js";

/************************************************************************************** */

export class BranchController{
    constructor(branchService){
        this.branchService=branchService
    }

    getNearbyBranches = async (req, res) => {
        try {
        const searchParams = req.searchParams
        const branches = await this.branchService.findNearbyBranches(searchParams);

        return ApiResponse.success(
            res,
            httpStatus.SUCCESSFULL,
            "Nearby branches fetched successfully",
            {branches},
            httpStatus.OK
        )


        } catch (error) {
            handleControllerError(res,error);
        }
    };//End getNearbyBranches

};