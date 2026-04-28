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


    getServices = async (req, res) => {
        try {
          
           const services = await this.branchService.findServices(req.cleanedQuery);

            return ApiResponse.success(
                res,
                httpStatus.SUCCESSFULL,
                "Services fetched successfully",
                { services },
                httpStatus.OK
            );

        } catch (error) {
            handleControllerError(res, error);
        }
    };//End getServices
  

    getAllBanks = async (req, res) => {
    try {
        const { orgId } = req.params;
        const { page = 1, limit = 10,search } = req.query;
        const searchValue = search?.trim();
        const cleanedQuery = {
        orgId,
        page: parseInt(page),
        limit: parseInt(limit),
        searchValue
        };

        const banks = await this.branchService.findAllBanks(cleanedQuery);

        return ApiResponse.success(
        res,
        httpStatus.SUCCESSFULL,
        "Banks fetched successfully",
        { banks },
        httpStatus.OK
        );

    } catch (error) {
        handleControllerError(res, error);
    }
    }; // End getAllBanks

};