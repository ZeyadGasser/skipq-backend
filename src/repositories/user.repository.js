import { IUserRepository } from "../interfaces/IUserRepository.js";
import { User as UserModel } from "../models/user.model.js";

export class UserRepository extends IUserRepository {
  async createUser(userData, transaction) {
    const newUser = await UserModel.create(userData, { transaction });
    return newUser;
  }
}
