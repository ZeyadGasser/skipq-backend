import axios from "axios";
import { IBankAtmProvider } from "../../../interfaces/IBankAtmProvider.js";

export class NationalBankProvider extends IBankAtmProvider {
  constructor() {
    super();
    this.baseURL = "http://localhost:5001/api/national-bank/v1"; //for test
  }

  async getAtmDetails(atm_id) {
    const response = await axios.get(
      //`${this.baseURL}/atms/${atm_id}`
      `${this.baseURL}`,
    );

    const data = response.data;

    // Data normalization
    return {
      isActive: data.isActive,
      countPeople: data.countPeople,
      available_denominations:
        data.denominations?.map((note) => ({
          value: note.value,
        })) || [],
    };
  } //End getAtmDetails

  async checkCashAvailability(atm_id, amount) {
    const response = await axios.get(
      /*
      `${this.baseURL}/atms/${atm_id}/check`,
      {
        params: { amount }
      }     */
      `${this.baseURL}/check`,
    );

    const data = response.data;

    return {
      available: data.available,
    };
  } //End checkCashAvailability
}
