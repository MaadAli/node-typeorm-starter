import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import SwaggerDOC from './lib/swagger-config'
import Database, { db } from './lib/database'
import config from './config/env.config'
import errorHandler from './lib/error-handler'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
dotenv.config()
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import AuthController from './modules/controllers/auth-controller';
import UserService from './modules/services/user-service'
import AuthService from './modules/services/auth-service'
import UserRepository from './modules/repositories/auth-repository'
import AuthenticationService from './lib/authentication-service'
import { AuthMiddleware } from './lib/auth-middleware'
import TYPES from './types/types'


const { port } = config
class App {
  private app: express.Application
  private port: number
  private database: Database
  // private swagger: SwaggerDOC
  private container: Container
  private server: InversifyExpressServer

  constructor (port: any) {
    this.container = new Container();
    this.bindControllers();
    this.server = new InversifyExpressServer(this.getContainer());
    this.server.setConfig((app) => {
        this.initializeMiddlewares(app, port)
    })
    this.app = this.server.build();
    this.database = db
    this.port = port
  }

  private getContainer():  Container{
    return this.container;
  }

  public async init (): Promise<void> {
    this.initializeRoutes()
    this.initializeErrorHandler()
    await this.initializeDB()
  }

  private async bindControllers() {
    this.container.bind<AuthenticationService>(AuthenticationService).toSelf();
    this.container.bind<UserRepository>(UserRepository).toSelf();
    this.container.bind<UserService>(UserService).toSelf();
    this.container.bind<AuthService>(AuthService).toSelf();
    this.container.bind<AuthController>(AuthController).toSelf();
    this.container.bind<AuthMiddleware>(TYPES.AuthMiddleware)
         .to(AuthMiddleware);
  }

  private async initializeRoutes () {
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('Default Route');
    });
  }

  private async initializeDB () {
    await this.database.connectDB()
  }

  private async initializeMiddlewares (app: express.Application, port: number) {
    new SwaggerDOC(port, app)
    app.use(cookieParser())
    app.use(express.json({ limit: '50mb' }))
    app.use(bodyParser.json())
    app.use(helmet())
    app.use(cors())
    app.options('*', cors())
  }

  private async initializeErrorHandler () {
    this.app.use(errorHandler)
  }

  public async listen (): Promise<any> {
    // this.app.listen(this.port, () => {
    //   console.log('server is listening at', this.port)
    // })
    return new Promise((resolve) => this.app.listen(this.port, () => {console.log("listening at port 5000"); resolve(null)}));
  }

  public application () {
    return this.app
  }
}
(async () => {
  const app = new App(port)
  await app.init()
  await app.listen()
})()
export default App
