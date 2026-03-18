
export class IGovernorateRepository {
  
  async createGovernorates(governorateData, transaction) {
    throw new Error("Method 'createGovernorates()' must be implemented.");
  }

  
  async findByCoordinates(longitude, latitude) {
    throw new Error("Method 'findByCoordinates()' must be implemented.");
  }

  async getAllGovernorates() {
    throw new Error("Method 'getAllGovernorates()' must be implemented.");
  }
}