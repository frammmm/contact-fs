import IRepository from "./IRepository";
import Request from "../../models/Request.model";

export default interface IRequestRepository extends IRepository<Request> {
    findLatestByUserId(id: string): Promise<Request>;

    markAsReaded(id: string): Promise<boolean>;
}