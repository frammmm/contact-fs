import User from "../../models/User.model";
import IRepository from "./IRepository";

export default interface IUserRepository extends IRepository<User> {
    findByEmail(email: string): Promise<any>;
}
