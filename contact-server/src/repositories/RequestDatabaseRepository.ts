import DatabaseRepository from "./base/DatabaseRepository";
import IRequestRepository from "./interfaces/IRequestRepository";
import Request from "../models/Request.model";

export default class extends DatabaseRepository<Request> implements IRequestRepository {
    constructor() {
        super("Request");
    }

    async findLatestByUserId(id: string): Promise<any> {
        return await this._database.read().get(this._contextName).find({ user_id: id }).value();
    }

    async markAsReaded(id: string): Promise<boolean> {
        try {
            await this._database.read().get(this._contextName).find({ id }).assign({ complete: 1 }).write();

            return true;
        }
        catch {
            return false;
        }
    }
}