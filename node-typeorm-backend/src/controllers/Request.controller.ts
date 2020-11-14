import express from 'express';

import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, NO_CONTENT } from '../helpers/constants/httpCodes';
import { Result, requireParamsValidation } from '../helpers';

import { Request } from '../entity/Request.entity';
import { User } from '../entity/User.entity';

export default class RequestController {
  public get = async (req: express.Request, res: express.Response) => {
    // const requests = await this.RequestRepository.getAll();

    res.json([]);
  };

  public post = async (req: express.Request, res: express.Response) => {
    const header = req.body.header;
    const body = req.body.body;
    const filepath = req.file && req.file.path;
    const user = (req.user as User).id;

    const errors = requireParamsValidation({header, body, user});

    if (errors.length) {
      return res.status(BAD_REQUEST).json(new Result(BAD_REQUEST, true, errors[0]));
    }

    const result = await this.createRequest(header, body, filepath, user);

    res.status(result.code).json(result);
  };

  public patch = async (req: express.Request, res: express.Response) => {
    const request_id = req.body.id;

    const result = await this.markAsReaded(request_id);

    res.status(result.code).json(result);
  };

  public createRequest = async (header: string, body: string, filepath: string, user: string) => {
    // const latestRequest = await this.RequestRepository.findLatestByUserId(user);

    // if (latestRequest && latestRequest.timestamp) {
    //   const diff = Date.now() - latestRequest.timestamp;

      // if (diff / (1000 * 60 * 60) < 24) {
      //   return new Result(BAD_REQUEST, true, 'No more than one request per day.');
      // }
    // }

    // const result = await this.RequestRepository.add(Request.Create(header, body, Date.now(), false, filepath, user));

    // if (result) {
    //   return new Result(CREATED);
    // }

    return new Result(INTERNAL_SERVER_ERROR, true, 'Unable to create new request.');
  };

  public markAsReaded = async (request_id: string) => {
    // const result = await this.RequestRepository.markAsReaded(request_id);

    // if (result) {
    //   return new Result(NO_CONTENT);
    // }

    return new Result(INTERNAL_SERVER_ERROR, true, 'Unable to mark request as readed.');
  };
}
