export class IBankAtmProvider {
  async getAtmDetails(atm_id) {
    throw new Error("Method not implemented: getAtmDetails");
  }

  async checkCashAvailability(atm_id, amount) {
    throw new Error("Method not implemented: checkCashAvailability");
  }
}
