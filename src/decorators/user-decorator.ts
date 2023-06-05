import { controller, httpGet, httpPost, interfaces, next, request, requestBody, response } from 'inversify-express-utils'
import express from 'express';
import { UnAuthorizedError } from '../lib/responses';

interface CustomRequest extends Request {
  user: any;
}
export function User(): ParameterDecorator {
  return function (target: any, propertyKey: any, parameterIndex: number) {

    const originalMethod = target[propertyKey];

    target[propertyKey] = function (req: CustomRequest, res: express.Response, next: express.NextFunction) {
      const user = req.user;

      if(!user) {
        throw new UnAuthorizedError('User property not found', null)
      }

      const args = [...arguments];
      args[parameterIndex] = user;
      return originalMethod.apply(this, args);
    };
  };
}