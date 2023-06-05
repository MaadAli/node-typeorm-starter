import {
  BaseMiddleware
} from 'inversify-express-utils';
import { injectable, inject, Container, interfaces } from 'inversify';
import 'reflect-metadata';
import express from 'express'
import AuthenticationService from './authentication-service';


@injectable()
export class AuthMiddleware extends BaseMiddleware {
  private authenticationService: AuthenticationService;
  constructor (@inject(AuthenticationService) authenticationService: AuthenticationService) {
    super()
    this.authenticationService = authenticationService;
  };
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
       this.authenticationService.authenticateToken(req, res, next)
    }
}