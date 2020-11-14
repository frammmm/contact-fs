import { EntityRepository, Repository } from 'typeorm';

import { Request } from '../entity/Request.entity';

@EntityRepository(Request)
export class RequestRepository extends Repository<Request> {
  async findLatestByUserId(id: string): Promise<Request | undefined> {
    return this.findOne({
      id
    });
  }

  async markAsReaded(id: string): Promise<boolean> {
    try {
      // await this._database.read().get(this._contextName).find({ id }).assign({ complete: 1 }).write();

      return true;
    } catch {
      return false;
    }
  }
}
