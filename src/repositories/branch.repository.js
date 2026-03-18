import { QueryTypes } from "sequelize";
import { sequelize } from "../config/db.js"; 
import { IBranchRepository } from "../interfaces/IBranchRepository.js";

export class BranchRepository extends IBranchRepository {

  findNearbyBranches = async (searchParams) => {

    const {location, page, limit, governorate_id } = searchParams;

    const { lat, lng } = location;

    const offset = (page - 1) * limit;

    const query = `
      SELECT  
        br.branch_id,
        br.branch_name,
        "isActive",
        ST_DistanceSphere(
            lo.coordinates,
            ST_SetSRID(ST_MakePoint(:lng,:lat),4326)
        ) AS distance
      FROM branches br
      JOIN locations lo ON br.location_id = lo.location_id
      WHERE br.org_id = :orgId
      AND lo.governorate_id = :govId
      ORDER BY lo.coordinates <-> ST_SetSRID(ST_MakePoint(:lng,:lat),4326)
      LIMIT :limit
      OFFSET :offset;
    `;

    const branches = await sequelize.query(query, {
      replacements: {
        orgId: searchParams.org_id,
        govId: governorate_id,
        lat,
        lng,
        limit,
        offset
      },
      type: QueryTypes.SELECT
    });

    return branches;
  };//End findNearbyBranches();


}