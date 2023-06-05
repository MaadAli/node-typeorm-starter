import express from 'express';
import { ValidationError } from 'express-validation';
import { HttpError } from './responses';
const errorHandler = async (
  err: HttpError | any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  console.log('in error handler', err);
  if(err instanceof ValidationError) {
    return res.status(err.statusCode).send(err.details.body);
  }
  if (err instanceof HttpError) {
    return res.status(err.status).send(err.errorResp);
  }
  return res.status(500).send(err);
};

export default errorHandler;
