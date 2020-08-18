import shortid from "shortid";

import BaseModel, { IBaseModel } from "./base/BaseModel";


export interface IRequest extends IBaseModel {
  header: string;
  body: string;
  timestamp: number;
  complete: boolean;
  file_url: string;
  user_id: string;
}

export default class Request extends BaseModel implements IRequest {
  public header: string;
  public body: string;
  public user_id: string;
  public timestamp: number;
  public complete: boolean;
  public file_url: string;

  constructor(id: string, header: string, body: string, timestamp: number, complete: boolean, file_url: string, user_id: string) {
    super();

    this.id = id;
    this.header = header;
    this.body = body;
    this.timestamp = timestamp;
    this.complete = complete;
    this.file_url = file_url;
    this.user_id = user_id;
  }

  public static Create(header: string, body: string, timestamp: number = Date.now(), complete: boolean = false, file_url: string, user_id: string): Request {
    return new Request(shortid.generate(), header, body, timestamp, complete, file_url, user_id);
  }
}
