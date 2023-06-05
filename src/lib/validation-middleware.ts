import 'reflect-metadata';
import express from 'express'
import { requestPart} from '../types/validation-types';
import Joi from 'joi';


export const validationMiddleware = (schemas: any) => {
  return (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {

      console.log("schemas", schemas);
      type MyObjectEntries = Array<[requestPart, Joi.ObjectSchema]>;
      const entries: MyObjectEntries = Object.entries(schemas) as MyObjectEntries;
      console.log("entries", entries);
      entries.forEach(([key, value]) => {
      console.log("key", key);
      console.log("value", value);
      console.log("req", req[key]);
        const { error } = value.validate(req[key])
      console.log("error", error);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
      });

      next();
    }
}
