import { sequelize } from "../config/db.js";

export class OrganizationService {
  constructor(
    organizationRepository,
    accountService,
    locationService,
    governorateRepository,
  ) {
    this.accountService = accountService;
    this.locationService = locationService;
    this.organizationRepository = organizationRepository;
    this.governorateRepository = governorateRepository;
  }
  /*************************************************************************************** */

  async createOrganization(orgData) {
    const organization_id = await sequelize.transaction(async (t) => {
      const account_id = await this.accountService.createAccount(orgData, t);

      const governorate_id = await this.governorateRepository.findByCoordinates(
        orgData.location.longitude,
        orgData.location.latitude,
      );
      if (!governorate_id) {
        throw new Error("Location provided is outside supported governorates.");
      }
      orgData.location.governorate_id = governorate_id;

      const location_id = await this.locationService.createLocation(
        orgData.location,
        t,
      );

      const dataToSave = {
        org_name: orgData.org_name,
        org_abbreviation: orgData.org_abbreviation,
        org_description: orgData.org_description,
        org_social_link: orgData.org_social_link,
        org_picture: orgData.org_picture,
        isActive: false,
        account_id: account_id,
        location_id: location_id,
      };

      const createdOrganization =
        await this.organizationRepository.createOrganization(dataToSave, t);

      return createdOrganization.org_id;
    });
    return organization_id;
  }
  /*************************************************************************************** */

  async getAllOrganizations(pagination) {
    let organizations =
      await this.organizationRepository.getAllOrganizations(pagination);
    if (!organizations) return null;
    return organizations;
  }

  /*************************************************************************************** */
  async updateOrganization(organization_id, updates) {
    const organization = await this.organizationRepository.updateOrganization(
      organization_id,
      updates,
    );
    return organization;
  }

  /*************************************************************************************** */
  async getOrganizationById(org_id) {
    return await this.organizationRepository.getOrganizationById(org_id);
  }
  /*************************************************************************************** */

  /*************************************************************************************** */
}
