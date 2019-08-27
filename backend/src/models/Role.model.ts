import BaseModel from "./base/BaseModel";

export default class Role extends BaseModel {
  constructor(id: string) {
    super();

    this.id = id;
  }
}
