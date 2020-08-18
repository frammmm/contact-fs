import { IRequest } from "../../models/Request.model";
import IRepository from "./IRepository";

export default interface IRequestRepository extends IRepository<IRequest> {
  findByUserId(id: string): Promise<IRequest[]>

  findLatestByUserId(id: string): Promise<IRequest>;

  markAsReaded(id: string): Promise<boolean>;
}
