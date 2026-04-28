import { ApiResponse } from "../utils/apiResponse.js"; 
import * as httpStatus from "../utils/http.status.js"; 
 
export const validateAtmParams = () => { 
  return (req, res, next) => { 
    const { orgId, bankId, atmId } = req.params; 
     let { amount } = req.query;
    const searchParams = { 
      org_id: orgId, 
      bank_id: bankId, 
      atm_id: atmId 
    }; 
   if (amount !== undefined) {
      amount = Number(amount);
   if (isNaN(amount) || amount <= 0) {
    return ApiResponse.error( 
        res,  
        httpStatus.ERROR,  
        "Invalid amount", 
        httpStatus.BAD_REQUEST 
      ); 
      }
      req.query.amount = amount;
    }


    if (!orgId) { 
      return ApiResponse.error( 
        res,  
        httpStatus.ERROR,  
        "A valid Organization ID must be provided in the request parameters.", 
        httpStatus.BAD_REQUEST 
      ); 
    } 

    if (!bankId) { 
      return ApiResponse.error( 
        res,  
        httpStatus.ERROR,  
        "A valid Bank ID must be provided in the request parameters.", 
        httpStatus.BAD_REQUEST 
      ); 
    } 

    if (!atmId) { 
      return ApiResponse.error( 
        res,  
        httpStatus.ERROR,  
        "A valid ATM ID must be provided in the request parameters.", 
        httpStatus.BAD_REQUEST 
      ); 
    } 

    const org_id = parseInt(searchParams.org_id); 
    const bank_id = parseInt(searchParams.bank_id); 
    const atm_id = parseInt(searchParams.atm_id); 

    if (isNaN(org_id)) {  
      return ApiResponse.error( 
        res, 
        httpStatus.ERROR, 
        "Organization ID must be a number", 
        httpStatus.BAD_REQUEST 
      );  
    }  

    if (isNaN(bank_id)) {  
      return ApiResponse.error( 
        res, 
        httpStatus.ERROR, 
        "Bank ID must be a number", 
        httpStatus.BAD_REQUEST 
      );  
    }  

    if (isNaN(atm_id)) {  
      return ApiResponse.error( 
        res, 
        httpStatus.ERROR, 
        "ATM ID must be a number", 
        httpStatus.BAD_REQUEST 
      );  
    }  

    req.searchParams = { org_id, bank_id, atm_id }; 

    next(); 
  }; 
};