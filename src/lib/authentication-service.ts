import jwt from 'jsonwebtoken'
import config from '../config/env.config'
import { UnAuthorizedError } from './responses'
import express from 'express'
import { inject, injectable } from 'inversify'
import UserService from '../modules/services/user-service'

const { jwtSecret, jwtExp } = config

@injectable()
class AuthenticationService {
  // private userService: UserService
  // constructor () {
  constructor (@inject(UserService) private userService: UserService) {}
    // this.userService = new UserService();
    // this.authenticateToken = this.authenticateToken.bind(this);
  // }

  private async decodeToken (token: string): Promise<any> {
    console.log('token rec', token)
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt.verify(token, jwtSecret)
        console.log('decoded', decoded)
        resolve(decoded)
      } catch (err) {
        reject(err)
      }
    })
  }

  public generateToken (userId: number): string {
    const token = jwt.sign(
      {
        id: userId
      },
      jwtSecret,
      {
        expiresIn: jwtExp
      }
    )
    return token
  }

  public async authenticateToken (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      if (!req.headers.authorization) {
        throw new UnAuthorizedError('Unauthorized', null)
      }
      const token = req.headers.authorization.split(' ')[1]
      const data = await this.decodeToken(token)
      const user = await this.userService.getUser(data.id)
      if (user) {
        req = Object.assign(req, { user: { id: 2 } })
        return next()
      }
      throw new UnAuthorizedError('Unauthorized', null)
    } catch (err) {
      next(err)
    }
  }
};

export default AuthenticationService;
