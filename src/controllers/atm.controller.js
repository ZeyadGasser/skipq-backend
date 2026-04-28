import * as httpStatus from "../utils/http.status.js"; 
import { ApiResponse } from "../utils/apiResponse.js"; 
import { handleControllerError } from "../error/handleControllerError.js"; 
 
export class AtmController { 
  constructor(atmService) { 
    this.atmService = atmService; 
  } 
 
  /************************************************************* */ 
  getNearbyAtms = async (req, res) => { 
    try { 
      const searchParams = req.searchParams; 
 
      const atms = await this.atmService.findNearbyAtms(searchParams); 
 
      return ApiResponse.success( 
        res, 
        httpStatus.SUCCESSFULL, 
        "Nearby ATMs fetched successfully", 
        { atms }, 
        httpStatus.OK 
      ); 
 
    } catch (error) { 
      handleControllerError(res, error); 
    } 
  }; // End getNearbyAtms 


  /************************************************************* */ 
  getSpecificBankAtmDetails = async (req, res) => { 
    try { 
      const { org_id, bank_id, atm_id } = req.searchParams; 
 
      const atm = await this.atmService.getSpecificBankAtmDetails({ 
        org_id, 
        bank_id, 
        atm_id 
      }); 
 
      return ApiResponse.success( 
        res, 
        httpStatus.SUCCESSFULL, 
        "ATM details fetched successfully", 
        { atm }, 
        httpStatus.OK 
      ); 
 
    } catch (error) { 
      handleControllerError(res, error); 
    } 
  }; // End getSpecificBankAtmDetails
  /************************************************************* */ 
checkWithdrawal = async (req, res) => {
  try {
    const {bank_id, atm_id } = req.searchParams;
    const { amount } = req.query;
    if (!amount && amount !== 0) {
      return ApiResponse.error(
        res,
        httpStatus.ERROR,
        "Amount is required",
        httpStatus.BAD_REQUEST
      );
    }
    
    const result = await this.atmService.checkWithdrawal({
      bank_id,
      atm_id,
      amount
    });

    return ApiResponse.success(
      res,
      httpStatus.SUCCESSFULL,
      "Withdrawal check completed successfully",
      result,
      httpStatus.OK
    );

  } catch (error) {
    handleControllerError(res, error);
  }
}; // End checkWithdrawal
  /************************************************************* */ 



}//End Class