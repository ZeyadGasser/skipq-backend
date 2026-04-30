import { QueryTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { IAtmRepository } from "../interfaces/IAtmRepository.js";
import { ATM } from "../models/atm.model.js";

export class AtmRepository extends IAtmRepository {
  findNearbyAtms = async (searchParams) => {
    const { location, page, limit, governorate_id } = searchParams;
    const { lat, lng } = location;

    const offset = (page - 1) * limit;

    const query = `
      SELECT  
        atm.atm_id,
        atm.atm_name,
        atm.allows_withdrawal,
        atm.allows_deposit,
        atm.branch_id,
        ST_DistanceSphere(
            lo.coordinates,
            ST_SetSRID(ST_MakePoint(:lng,:lat),4326)
        ) AS distance
      FROM atms atm
      JOIN branches br ON atm.branch_id = br.branch_id
      JOIN locations lo ON br.location_id = lo.location_id
      WHERE br.org_id = :orgId
      AND lo.governorate_id = :govId
      ORDER BY lo.coordinates <-> ST_SetSRID(ST_MakePoint(:lng,:lat),4326)
      LIMIT :limit
      OFFSET :offset;
    `;

    const atms = await sequelize.query(query, {
      replacements: {
        orgId: searchParams.org_id,
        govId: governorate_id,
        lat,
        lng,
        limit,
        offset,
      },
      type: QueryTypes.SELECT,
    });
    console.log(atms);
    return atms;
  }; // End findNearbyAtms
}
