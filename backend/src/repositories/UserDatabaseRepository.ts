import DatabaseRepository from "./base/DatabaseRepository";

import User from "../models/User.model";
import IUserRepository from "./interfaces/IUserRepository";

export default class extends DatabaseRepository<User> implements IUserRepository {
  constructor() {
    super("User");
  }

  async findByEmail(email: string): Promise<any> {
    // @ts-ignore
    return await this._database.read().get(this._contextName).find({email}).value();
  }
}
