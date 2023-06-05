import { DataSource } from 'typeorm'
// import express from 'express'
import config from '../config/env.config'
import Users from '../entities/user.entity'

const { host, dbUser, database, dbPassword } = config
console.log('configdb', config)
export default class Database {
  appDataSource!: DataSource

  constructor () {
    this.initializeDataSource()
  }

  private initializeDataSource () {
    this.appDataSource = new DataSource({
      type: 'postgres',
      host,
      port: 5432,
      username: dbUser,
      database,
      password: dbPassword,
      entities: [Users],
      synchronize: true,
      // logging: true,
      ssl: {
        rejectUnauthorized: false
      }
    })
  }

  public getDataSource () {
    return this.appDataSource
  }

  public async connectDB () {
    try {
      const initializeDb = await this.appDataSource.initialize()
      if (initializeDb) console.log('Db is connected')
      // app.emit('ready');
    } catch (e) {
      console.log('Logging error for database', e)
    }
  }
}

export const db = new Database()
