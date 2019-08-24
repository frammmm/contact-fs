import Request from "../../models/Request.model";
import IRepository from "./IRepository";

export default interface IRequestRepository extends IRepository<Request> {
    findLatestByUserId(id: string): Promise<Request>;
    markAsReaded(id: string): Promise<boolean>;
}
