import express from 'express'
import AuthService from '../services/auth-service'
import { ApiResponse } from '../../lib/responses'
import { LoginDto, UserDto } from '../dto/user.dto'
import { controller, httpGet, httpPost, interfaces, next, request, requestBody, response } from 'inversify-express-utils'
import { inject } from 'inversify'
import authValidation from '../validators/auth-validator';
import { validate } from 'express-validation';
import TYPES from '../../types/types'
import { User } from '../../decorators/user-decorator'
import { UserId } from '../../types/user-types'

// @injectable()
@controller('/auth')
class AuthController implements interfaces.Controller {
  // private authMiddleware: express.RequestHandler;
  constructor (@inject(AuthService) private authService: AuthService) {}

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Login user
   *     responses:
   *       200:
   *         description: OK
   */
  @httpPost('/login')
  public async login (@request() req: express.Request, @response() res: express.Response, @next() next: express.NextFunction, @requestBody() body: LoginDto): Promise<any> {
    try {
      const loginDto: LoginDto = body
      console.log("loginDto", body);
      const data = await this.authService.login(loginDto)
      return new ApiResponse(res).build('', data)
    } catch (e) {
      next(e)
    }
  }

/**
   * @swagger
   * /auth/signup:
   *   post:
   *     summary: Create user
   *     responses:
   *       200:
   *         description: OK
   */
  @httpPost('/signup', 
  validate(authValidation.createUser)
  )
  public async signUp (@request() req: express.Request, @response() res: express.Response, @next() next: express.NextFunction, @requestBody() body: UserDto): Promise<any> {
    try {
      const id = 2
      console.log('req', body)
      console.log('req.body', req.body)
      const userDto: UserDto = body
    //   console.log('userDto', name)
      const data = await this.authService.registerUser(userDto)
      return new ApiResponse(res).build('User created', data)
    } catch (e) {
      console.log('e in controller', e)
      next(e)
    }
  }

  /**
   * @swagger
   * /auth/token:
   *   get:
   *     summary: Auth endpoint
   *     responses:
   *       200:
   *         description: OK
   */
  @httpGet('/token', TYPES.AuthMiddleware)
  public async authEndpoint(@request() req: express.Request, @response() res: express.Response, @next() next: express.NextFunction, @User() user: UserId): Promise<any> {
    try {
      console.log("user in auth", user)
      const data = await this.authService.getUser(user.id);
      return new ApiResponse(res).build('Auth endpoint accessed', data)
    } catch (e) {
      console.log('e in controller', e)
      next(e)
    }
  }
}

export default AuthController
