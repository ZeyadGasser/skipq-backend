import { ILocationRepository } from "../interfaces/ILocationRepository.js";
import { Location as LocationModel } from "../models/location.model.js";

export class LocationRepository extends ILocationRepository {
  async createLocation(locationData, transaction) {
    const formattedData = {
      governorate_id: locationData.governorate_id,
      coordinates: {
        type: "Point",

        coordinates: [
          parseFloat(locationData.longitude),
          parseFloat(locationData.latitude),
        ],
      },
    };

    const newLocation = await LocationModel.create(formattedData, {
      transaction,
    });

    return newLocation;
  }
}
