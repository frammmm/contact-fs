import DatabaseRepository from "./base/DatabaseRepository";
import IRequestRepository from "./interfaces/IRequestRepository";
import { IRequest } from "../models/Request.model";


export default class extends DatabaseRepository<IRequest> implements IRequestRepository {
  constructor() {
    super("Request");
  }

  async findByUserId(id: string): Promise<IRequest[]> {
    // @ts-ignore
    return await this._database.read().get(this._contextName).filter({ user_id: id }).value();
  }

  async findLatestByUserId(id: string): Promise<IRequest> {
    // @ts-ignore
    return await this._database.read().get(this._contextName).find({ user_id: id }).sortBy('timestamp').take(1).value();
  }

  async markAsReaded(id: string): Promise<boolean> {
    try {
      // @ts-ignore
      await this._database.read().get(this._contextName).find({ id }).assign({ complete: 1 }).write();

      return true;
    } catch {
      return false;
    }
  }
}
