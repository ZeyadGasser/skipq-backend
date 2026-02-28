import * as httpStatus from "../utils/http.status.js";
import { OrganizationResponseDTO } from "../dtos/organization.dto.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { _handleError } from "../utils/_handleError.js";
/*************************************************************************************** */
export class OrganizationController {
  constructor(organizationService) {
    this.organizationService = organizationService;
  }

  /************************************************************* */
  signupOrganization = async (req, res) => {
    try {
      const organization_id = await this.organizationService.createOrganization(
        req.body,
      );
      return ApiResponse.success(
        res,
        httpStatus.SUCCESSFULL,
        "Organization created successfully",
        { organization_id },
        httpStatus.CREATED,
      );
    } catch (error) {
      return _handleError(res, error);
    }
  };
  /*************************************************************************************** */
  getAllOrganizations = async (req, res) => {
    try {
      const { limit = 20, page = 1 } = req.query;
      const rawOrganizations =
        await this.organizationService.getAllOrganizations({
          limit: Number(limit),
          page: Number(page),
        });
      const organizations =
        OrganizationResponseDTO.transformList(rawOrganizations);

      return ApiResponse.success(
        res,
        httpStatus.SUCCESSFULL,
        "Organizations retrieved successfully",
        { organizations },
        httpStatus.OK,
      );
    } catch (error) {
      return _handleError(res, error);
    }
  };

  /*************************************************************************************** */
  updateOrganization = async (req, res) => {
    try {
      const organization_id = req.params.id;
      const updates = req.body;
      if (!organization_id || !updates) {
        return ApiResponse.error(
          res,
          httpStatus.ERROR,
          "Organization ID and update data are required.",
          httpStatus.BAD_REQUEST,
        );
      }

      await this.organizationService.updateOrganization(
        organization_id,
        updates,
      );
      return ApiResponse.success(
        res,
        httpStatus.SUCCESSFULL,
        "Update Organization successfully",
        httpStatus.OK,
      );
    } catch (error) {
      return _handleError(res, error);
    }
  };
  /*************************************************************************************** */

  /*************************************************************************************** */
}
