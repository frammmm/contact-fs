import { LowdbSync } from "lowdb";

import IRepository from "../interfaces/IRepository";
import BaseModel from "../../models/base/BaseModel";
import Database from "../../helpers/database";

export default abstract class DatabaseRepository<T extends BaseModel> implements IRepository<T> {
  protected readonly _database: LowdbSync<any>;
  protected readonly _contextName: string;

  protected constructor(contextName: string) {
    this._database = Database;
    this._contextName = contextName;
  }

  public async add(entity: T): Promise<boolean> {
    try {
      // @ts-ignore
      await this._database.read().get(this._contextName).push(entity).write();

      return true;
    } catch {
      return false;
    }
  };

  public async findOne(id: string): Promise<any> {
    // @ts-ignore
    return await this._database.read().get(this._contextName).find({id}).value();
  };

  public async getAll(): Promise<any> {
    return await this._database.read().get(this._contextName).value();
  }

  public async remove(id: string): Promise<boolean> {
    return false;
  };
}
