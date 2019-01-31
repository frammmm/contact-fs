import IRepository from "./IRepository";
import User from "../../models/User.model";

export default interface IUserRepository extends IRepository<User> {
    //TODO: Map json properties to model object
    findByEmail(email: string): Promise<any>;
}