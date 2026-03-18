import { LocationRepository } from "../repositories/location.repository.js";

export class LocationService {
  constructor(locationRepository) {
    this.locationRepository = locationRepository;
  }

  async createLocation(locationData, transaction) {
    const dataToSave = {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      governorate_id: locationData.governorate_id,
    };

    const createdLocation = await this.locationRepository.createLocation(
      dataToSave,
      transaction,
    );
    return createdLocation.location_id;
  }
}
