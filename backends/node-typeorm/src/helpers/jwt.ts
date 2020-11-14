import jwt, { SignOptions } from 'jsonwebtoken';

import { User } from '../entity/User.entity';

export class Jwt {
  static Generate(user: User): string {
    const options: SignOptions = {
      subject: JSON.stringify(user)
    }

    return jwt.sign(options, process.env.SECRET_KEY || '');
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  static Verify (token: string): object {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return jwt.verify(token, process.env.SECRET_KEY || '') as object;
  }
}
