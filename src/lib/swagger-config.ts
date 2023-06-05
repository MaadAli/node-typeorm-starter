import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import * as express from 'express'
import path from 'path'
const swaggerOptions = (port: number): swaggerJSDoc.Options => {
  return {
    swaggerDefinition: {
      info: {
        title: 'Starter',
        version: '1.0.0',
      },
      basePath: '/',
    },
    apis: [path.join(__dirname, '../modules/controllers/*.ts')]
  }
}
export default class SwaggerDOC {
  private app: express.Application
  constructor (port: number, app: express.Application) {
    const docSpecs = swaggerJSDoc(swaggerOptions(port))
    this.app = app
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docSpecs, {explorer: true}))
  }
}
