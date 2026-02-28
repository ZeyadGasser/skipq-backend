import { Organization } from "./organization.model.js";
import { Branch } from "./branch.model.js";
import { User } from "./user.model.js";
import { Role } from "./role.model.js";
import { AccountStatus } from "./account.status.model.js";
import { AccountType } from "./account.type.model.js";
import { Account } from "./account.model.js";
import { Location } from "./location.model.js";
import { CameraConfiguration } from "./camera.configuration.model.js";
import { CameraView } from "./camera.view.model.js";
import { ViewTarget } from "./view.target.model.js";
import { ViewType } from "./view.type.model.js";
import { Service } from "./service.model.js";
import { ATM } from "./atm.model.js";
import { Denomination } from "./denomination.model.js";
import { ATMDenominationStock } from "./atm.denomination.stock.model.js";
import { AccountResetToken } from "./account.reset.tokens.model.js";
import { AccountRefreshToken } from "./account.refresh.tokens.model.js";
/**
 * [Circular Dependency ]
 * We define associations in a separate function called after all models are imported.
 * This prevents the "Circular Dependency" issue where two models import each other
 * simultaneously, causing one of them to be 'undefined' during initialization.
 * By centralizing associations here, we ensure all models are fully loaded before linking them.
 */
setupAssociations();

function setupAssociations() {
  // One-To-Many relationship
  User.belongsTo(Role, { foreignKey: "role_id" }); // The User.belongsTo(Role) association means that a One-To-Many relationship exists between User and Role, with the foreign key being defined in the source model (User)
  Role.hasMany(User, { foreignKey: "role_id" });

  // One-To-Many relationship
  Account.belongsTo(AccountStatus, { foreignKey: "status_id" });
  AccountStatus.hasMany(Account, { foreignKey: "status_id" });

  // One-To-Many relationship
  Account.belongsTo(AccountType, { foreignKey: "type_id" });
  AccountType.hasMany(Account, { foreignKey: "type_id" });

  // One-To-One relationship
  Account.belongsTo(User, { foreignKey: "user_id" });
  User.hasOne(Account, { foreignKey: "user_id" });

  // One-To-One relationship
  Organization.belongsTo(Account, { foreignKey: "account_id" });
  Account.hasOne(Organization, { foreignKey: "account_id" });

  // One-To-One relationship
  Branch.belongsTo(Account, { foreignKey: "account_id" });
  Account.hasOne(Branch, { foreignKey: "account_id" });

  // One-To-Many relationship
  Organization.hasMany(Branch, { foreignKey: "org_id" });
  Branch.belongsTo(Organization, { foreignKey: "org_id" });

  // One-To-One relationship
  Branch.belongsTo(Location, { foreignKey: "location_id" });
  Location.hasOne(Branch, { foreignKey: "location_id" });

  // One-To-One relationship
  Organization.belongsTo(Location, { foreignKey: "location_id" });
  Location.hasOne(Organization, { foreignKey: "location_id" });

  // One-To-One relationship
  CameraConfiguration.belongsTo(Branch, { foreignKey: "branch_id" });
  Branch.hasOne(CameraConfiguration, { foreignKey: "branch_id" });

  // One-To-Many relationship
  CameraConfiguration.hasMany(CameraView, { foreignKey: "camera_config_id" });
  CameraView.belongsTo(CameraConfiguration, { foreignKey: "camera_config_id" });

  // One-To-Many: One Target can be seen by multiple Camera Views
  CameraView.belongsTo(ViewTarget, { foreignKey: "target_id" });
  ViewTarget.hasMany(CameraView, { foreignKey: "target_id" });

  // One-To-Many relationship
  ViewTarget.belongsTo(ViewType, { foreignKey: "type_id" });
  ViewType.hasMany(ViewTarget, { foreignKey: "type_id" });

  // One-To-Many relationship
  CameraView.hasMany(Service, { foreignKey: "camera_view_id" });
  Service.belongsTo(CameraView, { foreignKey: "camera_view_id" });

  // One-To-Many relationship
  Branch.hasMany(ATM, { foreignKey: "branch_id" });
  ATM.belongsTo(Branch, { foreignKey: "branch_id" });

  // One-To-One relationship
  ATM.belongsTo(Location, { foreignKey: "location_id" });
  Location.hasOne(ATM, { foreignKey: "location_id" });

  // Many-To-Many relationship
  ATM.belongsToMany(Denomination, {
    through: ATMDenominationStock,
    foreignKey: "atm_id",
    otherKey: "denomination_id",
  });
  Denomination.belongsToMany(ATM, {
    through: ATMDenominationStock,
    foreignKey: "denomination_id",
    otherKey: "atm_id",
  });

  Account.hasMany(AccountResetToken, { foreignKey: "account_id" });
  AccountResetToken.belongsTo(Account, { foreignKey: "account_id" });

  Account.hasMany(AccountRefreshToken, { foreignKey: "account_id" });
  AccountRefreshToken.belongsTo(Account, { foreignKey: "account_id" });
}

export {
  Organization,
  Branch,
  User,
  Role,
  AccountStatus,
  AccountType,
  Account,
  Location,
  CameraConfiguration,
  CameraView,
  ViewTarget,
  ViewType,
  Service,
  ATM,
  ATMDenominationStock,
  Denomination,
  AccountResetToken,
  AccountRefreshToken
};
