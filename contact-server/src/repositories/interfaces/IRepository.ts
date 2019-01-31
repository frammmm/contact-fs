import BaseModel from "../../models/base/BaseModel";

export default interface IRepository<T extends BaseModel> {
    add(entity: T): Promise<boolean>;

    findOne(id: string): Promise<T>;

    getAll(): Promise<T>;

    remove(id: string): Promise<boolean>;
}