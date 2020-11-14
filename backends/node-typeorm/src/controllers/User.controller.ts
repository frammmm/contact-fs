import express from 'express';
import { getRepository } from 'typeorm';

import { User } from '../entity/User.entity';
import { UserRepository } from '../repositories/UserDatabaseRepository';

import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from '../helpers/constants/httpCodes';
import { comparePasswords, Jwt, requireParamsValidation, Result } from '../helpers';

const userRepository = getRepository(User);

export default class UserController {
  public afterLogin = (req: express.Request, res: express.Response) => {
    res.json({ token: Jwt.Generate(req.user as User) });
  };

  public afterAuthCheck = (req: express.Request, res: express.Response) => {
    res.json({ status: true });
  };

  public auth = async (token: string) => {
    const jwtToken = Jwt.Verify(token);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = await userRepository.findByEmail(jwtToken.subject.email);

    if (user) {
      return user;
    }

    return false;
  };

  public createNewUser = async (email: string, password: string) => {
    // const user = await userRepository.findByEmail(email);

    // if (user) {
    //   return new Result(BAD_REQUEST, true, 'Email is already in use.');
    // }
    //
    // const result = await userRepository.createWithPassword(email, password);
    //
    // if (result) {
    //   return new Result(CREATED);
    // }

    return new Result(INTERNAL_SERVER_ERROR, true, 'Unable to create new user.');
  };

  public signup = async (req: express.Request, res: express.Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = requireParamsValidation({ email, password });

    if (errors.length) {
      return res.status(BAD_REQUEST).json(new Result(BAD_REQUEST, true, errors[0]));
    }

    const result = await this.createNewUser(email, password);

    res.status(result.code).json(result);
  };

  public validateUserIdentity = async (email: string, password: string): Promise<User | boolean> => {
    // const user = await userRepository.findByEmail(email);

    // if (user && comparePasswords(password, user.salt, user.password_hash)) {
    //   return user;
    // }

    return false;
  };
}
