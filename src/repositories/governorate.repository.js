import { IGovernorateRepository } from "../interfaces/IGovernorateRepository.js";
import { Governorate as GovernorateModel } from "../models/governorate.model.js";
import { sequelize } from "../config/db.js";

export class GovernorateRepository extends IGovernorateRepository {
  async createGovernorates(governorateData) {
    const dataArray = Array.isArray(governorateData)
      ? governorateData
      : [governorateData];

    const formattedData = dataArray.map((gov) => ({
      name: gov.name,
      boundary: {
        type: "Polygon",
        coordinates: gov.coordinates,
      },
    }));

    const newGovernorates = await GovernorateModel.bulkCreate(formattedData, {
      updateOnDuplicate: ["boundary"],
    });

    return newGovernorates;
  } //End createGovernorates()

  async findByCoordinates(longitude, latitude) {
    const governorate = await GovernorateModel.findOne({
      attributes: ['governorate_id'],
      where: sequelize.where(
        sequelize.fn(
          "ST_Covers",
          sequelize.col("boundary"),
          sequelize.fn(
            "ST_SetSRID",
            sequelize.fn(
              "ST_Point",
              parseFloat(longitude),
              parseFloat(latitude)
            ),
            4326
          )
        ),
        true
      ),
      raw: true
    });

   return governorate ? governorate.governorate_id : null;
  } //End findByCoordinates()

  async getAllGovernorates() {
    return await GovernorateModel.findAll({
      attributes: ["governorate_id", "name"],
      order: [["name", "ASC"]],
    });
  } //End getAllGovernorates()
}