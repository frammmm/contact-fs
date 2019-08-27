import shortid from "shortid";

import BaseModel from "./base/BaseModel";
import { encryptPassword, generateSalt } from "../helpers/User.helper";

export default class User extends BaseModel {
  public email: string;
  public password_hash: string;
  public salt?: string;
  public role_id?: number;

  constructor(id: string, email: string, password: string, salt?: string, role_id?: number) {
    super();

    this.id = id;
    this.email = email;
    this.salt = salt;
    this.password_hash = password;
    this.role_id = role_id;
  }

  public static Create(email: string, password: string, salt: string = generateSalt(), role_id: number = 1): User {
    return new User(shortid.generate(), email, encryptPassword(password, salt), salt, role_id);
  }
}
