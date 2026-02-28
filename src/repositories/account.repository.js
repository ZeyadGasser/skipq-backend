import { IAccountRepository } from "../interfaces/IAccountRepository.js";
import { Account as AccountModel } from "../models/account.model.js";
import { User } from "../models/user.model.js";
import * as associations from "../models/index.js";

export class AccountRepository extends IAccountRepository {
  async createAccount(accountData, transaction) {
    const newAccount = await AccountModel.create(accountData, { transaction });
    return newAccount;
  }
  /********************************************************************* */
  async getAccountByEmail(account_email) {
    const targetAccount = await AccountModel.findOne({
      where: { account_email },
    });
    return targetAccount;
  }
  /************************************************************************ */

  async getUserRole(account_email) {
    const account = await AccountModel.findOne({
      where: { account_email: account_email },
      include: [{ model: User, attributes: ["role_id"] }],
    });

    if (account && account.User) {
      return account.User.role_id;
    }
    return null;
  }
  /************************************************************* */
  async getAccountById(account_id) {
    const account = await AccountModel.findByPk(account_id);
    return account;
  }
  /****************************************************** */
  async updatePassword(account, hashedPassword, transaction) {
    await AccountModel.update(
      { account_password_hash: hashedPassword },
      {
        where: { account_id: account.account_id },
        transaction,
      },
    );
  }
}
