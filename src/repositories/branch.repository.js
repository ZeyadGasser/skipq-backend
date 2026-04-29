import { QueryTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { IBranchRepository } from "../interfaces/IBranchRepository.js";
import { Branch } from "../models/branch.model.js";

export class BranchRepository extends IBranchRepository {
  findNearbyBranches = async (searchParams) => {
    const { location, page, limit, governorate_id } = searchParams;

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
        offset,
      },
      type: QueryTypes.SELECT,
    });

    return branches;
  }; //End findNearbyBranches();

  findById = async (branch_id) => {
    return await Branch.findOne({
      where: { branch_id },
      attributes: ["branch_id", "org_id"],
    });
  }; //End findById

  findServices = async (filters) => {
    //not impelmented yet besause ,i wait a desion for schema
  }; //End findServices

  findAllBanks = async (filters) => {
    const { orgId, limit, offset, searchValue } = filters;

    const query = `
    SELECT 
      b.branch_id,
      b.branch_name,
      b.logo_url
    FROM branches b
    WHERE b.org_id = :orgId
      AND (:searchValue IS NULL OR b.branch_name LIKE :searchPattern)
    ORDER BY b.branch_name ASC
    LIMIT :limit
    OFFSET :offset;
  `;

    const banks = await sequelize.query(query, {
      replacements: {
        orgId,
        limit,
        offset,
        searchValue: searchValue || null,
        searchPattern: searchValue ? `%${searchValue}%` : null,
      },
      type: QueryTypes.SELECT,
    });

    return banks.map((b) => ({
      bank_id: b.branch_id,
      bank_name: b.branch_name,
      logo_url: b.logo_url,
    }));
  }; // End findAllBanks
}
