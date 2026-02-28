export class IAccountRepository {
  async createAccount(accountData, transaction) {
    throw new Error("Method not implemented");
  }
  async getAccountByEmail(email) {
    throw new Error("Method not implemented");
  }

  async getUserRole(account_email) {
    throw new Error("Method not implemented");
  }

  async getAccountById(account_id) {
    throw new Error("Method not implemented");
  }
  async updatePassword(account, hashedPassword, transaction) {
    throw new Error("Method not implemented");
  }
}
