import { ILocationRepository } from "../interfaces/ILocationRepository.js";
import { Location as LocationModel } from "../models/location.model.js";
export class LocationRepository extends ILocationRepository {
  async createLocation(locationData, transaction) {
    const newLocation = await LocationModel.create(locationData, {
      transaction,
    });
    return newLocation;
  }
}
