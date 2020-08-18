export interface IBaseModel {
  id: string;
}

export default abstract class BaseModel {
  public id: string;

  protected constructor() {
    this.id = "";
  }
}
