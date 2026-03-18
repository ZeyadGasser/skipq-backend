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

   }//End findNearbyBranches(searchParams)
}
