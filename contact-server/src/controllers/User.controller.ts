import express from "express";

import User from "../models/User.model";
import IUserRepository from "../repositories/interfaces/IUserRepository";
import UserDatabaseRepository from "../repositories/UserDatabaseRepository";

import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from "../helpers/constants/httpCodes";
import { OperationResult } from "../helpers/OperationResult";
import { comparePasswords } from "../helpers/User.helper";
import { JwtToken } from "../helpers/JwtToken";
import { requireParamsValidation } from "../helpers/ApiHelper";

export default class UserController {
    private UserRepository: IUserRepository;

    constructor() {
        this.UserRepository = new UserDatabaseRepository();
    }

    public afterLogin = (req: express.Request, res: express.Response) => {
        res.json({ token: JwtToken.Generate(req.user) });
    };

    public afterAuthCheck = (req: express.Request, res: express.Response) => {
        res.json({ status: true });
    };

    public auth = async (token: string) => {
        const jwtToken = new JwtToken(token);

        const user = await this.UserRepository.findByEmail(jwtToken.sub.email);

        if (user) {
            return user;
        }

        return false;
    };

    public createNewUser = async (email: string, password: string) => {
        const user = await this.UserRepository.findByEmail(email);

        if (user) {
            return new OperationResult(BAD_REQUEST, true, "Email is already in use.");
        }

        const result = await this.UserRepository.add(User.Create(email, password));

        if (result) {
            return new OperationResult(CREATED);
        }

        return new OperationResult(INTERNAL_SERVER_ERROR, true, "Unable to create new user.");
    };

    public signup = async (req: express.Request, res: express.Response) => {
        const email = req.body.email;
        const password = req.body.password;

        const errors = requireParamsValidation({ email, password });

        if (errors.length) {
            return res.status(BAD_REQUEST).json(new OperationResult(BAD_REQUEST, true, errors[ 0 ]));
        }

        const result = await this.createNewUser(email, password);

        res.status(result.code).json(result);
    };

    public validateUserIdentity = async (email: string, password: string): Promise<any> => {
        const user = await this.UserRepository.findByEmail(email);

        if (user && comparePasswords(password, user.salt, user.password_hash)) {
            return user;
        }

        return false;
    };
}