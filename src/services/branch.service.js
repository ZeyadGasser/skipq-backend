import { CustomError } from "../error/CustomError.js";
import * as httpStatus from "../utils/http.status.js";
import { sequelize } from "../config/db.js"; 


export class BranchService{
    constructor(branchRepository,governorateRepository){
        this.branchRepository=branchRepository;
        this.governorateRepository=governorateRepository;
    }

   findNearbyBranches=async(searchParams)=>{

    const governorate_id=await this.governorateRepository.findByCoordinates(
        searchParams.location.lng,
        searchParams.location.lat);

    if(!governorate_id){
        throw new CustomError("Service not available in this location",httpStatus.NOT_FOUND);
    }
    searchParams.governorate_id=governorate_id;
    
    return await this.branchRepository.findNearbyBranches(searchParams);

   };//End findNearbyBranches(searchParams)

  findServices = async (cleanedQuery) => {
    const { orgId, branchId, page, limit, name } = cleanedQuery;

    // 1. (Optional but recommended) validate branch exists under org
    const branch = await this.branchRepository.findById(branchId);

    if (!branch || branch.org_id !== orgId) {
        throw new CustomError(
            "Branch not found under this organization",
            httpStatus.NOT_FOUND
        );
    }

    // 2. build filters
    const filters = {
        branchId,
        name,
        offset: (page - 1) * limit,
        limit
    };

   
    const services = await this.branchRepository.findServices(filters);

    return services;
   };//End findServices


    findAllBanks = async (cleanedQuery) => {
    const { orgId, page, limit,searchValue} = cleanedQuery;

    const filters = {
        orgId,
        offset: (page - 1) * limit,
        limit,
        searchValue
    };

    const banks = await this.branchRepository.findAllBanks(filters);

    return banks;
      
    }; // End findAllBanks

}
