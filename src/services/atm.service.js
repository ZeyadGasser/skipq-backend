import { CustomError } from "../error/CustomError.js";
import * as httpStatus from "../utils/http.status.js";
import { sequelize } from "../config/db.js";
import { BankProviderFactory } from "./providers/BankProviderFactory.js";

export class AtmService {
  constructor(AtmRepository, governorateRepository) {
    this.AtmRepository = AtmRepository;
    this.governorateRepository = governorateRepository;
  }

  /************************************************************* */
  findNearbyAtms = async (searchParams) => {
    const governorate_id = await this.governorateRepository.findByCoordinates(
      searchParams.location.lng,
      searchParams.location.lat,
    );

    if (!governorate_id) {
      throw new CustomError(
        "Service not available in this location",
        httpStatus.NOT_FOUND,
      );
    }
    searchParams.governorate_id = governorate_id;

    const atms = await this.AtmRepository.findNearbyAtms(searchParams);
    if (!atms || atms.length === 0) {
      throw new CustomError(
        "No ATMs found near your current location",
        httpStatus.NOT_FOUND,
      );
    }

    const formattedAtms = atms.map((atm) => {
      const dist = parseFloat(atm.distance);
      let displayDistance;

      if (dist < 1000) {
        displayDistance = `${Math.round(dist)} m`;
      } else {
        displayDistance = `${(dist / 1000).toFixed(1)} km`;
      }

      return {
        atm_id: atm.atm_id,
        atm_name: atm.atm_name,
        atm_bank_id: atm.branch_id,
        allows_withdrawal: atm.allows_withdrawal,
        allows_deposit: atm.allows_deposit,
        distance: displayDistance,
      };
    });

    return formattedAtms;
  }; // End findNearbyAtms

  /************************************************************* */
  getSpecificBankAtmDetails = async ({ org_id, bank_id, atm_id }) => {
    let provider;
    try {
      provider = BankProviderFactory.get(bank_id);
    } catch (error) {
      throw new CustomError(error.message, httpStatus.BAD_REQUEST);
    }

    const bankData = await provider.getAtmDetails(atm_id);
    if (!bankData) {
      throw new CustomError(
        "Failed to fetch ATM details from bank",
        httpStatus.NOT_FOUND,
      );
    }

    return bankData;
  }; // End getSpecificBankAtmDetails

  /************************************************************* */
  checkWithdrawal = async ({ bank_id, atm_id, amount }) => {
    let provider;
    try {
      provider = BankProviderFactory.get(bank_id);
    } catch (error) {
      throw new CustomError(error.message, httpStatus.BAD_REQUEST);
    }
    const available = await provider.checkCashAvailability(atm_id, amount);
    if (!available) {
      throw new CustomError(
        "Failed to check amount from bank",
        httpStatus.NOT_FOUND,
      );
    }

    return available;
  }; //End checkWithdrawal
  /*************************************************************/
} //End Class
