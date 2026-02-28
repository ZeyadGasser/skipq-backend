import { IOrganizationRepository } from "../interfaces/IOrganizationRepository.js";
import { Organization as OrganizationModel } from "../models/organization.model.js";
import { Account as AccountModel } from "../models/account.model.js";
import { User as UserModel } from "../models/user.model.js";
import * as associations from "../models/index.js";
import { sequelize } from "../config/db.js";
export class OrganizationRepository extends IOrganizationRepository {
  async createOrganization(orgData, transaction) {
    const newOrganization = await OrganizationModel.create(orgData, {
      transaction,
    });
    return newOrganization;
  }
  /*************************************************************************************** */

  async getAllOrganizations(pagination) {
    const offset = (pagination.page - 1) * pagination.limit;
    const organizations = await OrganizationModel.findAll({
      limit: pagination.limit,
      offset: offset,
    });
    return organizations;
  }
  /*************************************************************************************** */
  async updateOrganization(organization_id, updates) {
    const transaction = await sequelize.transaction();
    try {
      const organization = await OrganizationModel.findByPk(organization_id, {
        include: [
          {
            model: AccountModel,
            include: [UserModel], // Nested Include
          },
        ],
        transaction,
      });

      if (
        !organization ||
        !organization.Account ||
        !organization.Account.User
      ) {
        await transaction.rollback();
        return null;
      }

      const account = organization.Account;
      const user = account.User;

      const allowedOrgFields = [
        "org_name",
        "org_description",
        "org_abbreviation",
        "org_picture",
        "org_social_link",
        "isActive",
      ];
      const allowedAccFields = ["type_id", "status_id"];
      const allowedUserFields = ["user_name", "role_id"];

      Object.keys(updates).forEach((key) => {
        if (allowedOrgFields.includes(key)) {
          organization[key] = updates[key];
        } else if (allowedAccFields.includes(key)) {
          account[key] = updates[key];
        } else if (allowedUserFields.includes(key)) {
          user[key] = updates[key];
        }
      });

      await organization.save({ transaction });
      await account.save({ transaction });
      await user.save({ transaction });

      await transaction.commit();
      return organization;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
  /************************************************************** */
  async getOrganizationById(org_id) {
    const organization = await OrganizationModel.findByPk(org_id);
    if (!organization) {
      return null;
    }
    return organization;
  }
  /*************************************************************************************** */
}
