import { USER_ROLES } from "../utils/user.roles.js";
import { UserRepository } from "../repositories/user.repository.js";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData, transaction) {
    const dataToSave = {
      user_name: userData.user_name,
      role_id: USER_ROLES.SUPER_ADMIN,
    };
    const createdUser = await this.userRepository.createUser(
      dataToSave,
      transaction,
    );
    return createdUser.user_id;
  }
}
