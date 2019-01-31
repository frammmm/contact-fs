import DatabaseRepository from "./base/DatabaseRepository";
import IUserRepository from "./interfaces/IUserRepository";
import User from "../models/User.model";

export default class extends DatabaseRepository<User> implements IUserRepository {
    constructor() {
        super("User");
    }

    async findByEmail(email: string): Promise<any> {
        return await this._database.read().get(this._contextName).find({ email }).value();
    }
}