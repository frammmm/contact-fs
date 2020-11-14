import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entity/User.entity';

import { encryptPassword, generateSalt } from '../helpers';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    try {
      return this.findOne({
        email
      });
    } catch (e) {
      console.log(e);
    }
  }

  async createWithPassword (email: string, password: string): Promise<User> {
    const salt = generateSalt();
    const encryptedPassword = encryptPassword(password, salt);

    return this.create({
      email,
      salt,
      password_hash: encryptedPassword
    });
  }
}
