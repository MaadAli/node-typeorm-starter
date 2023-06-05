import { Repository } from 'typeorm'
import Database, { db } from '../../lib/database'
import Users from '../../entities/user.entity'
import { injectable } from 'inversify'

@injectable()
class UserRepository {
  private database: Database
  private userRepository: Repository<Users>
  constructor () {
    this.database = db;
    const appDataSource = this.database.getDataSource()
    this.userRepository = appDataSource.getRepository(Users)
  }

  public async createUser (user: Users) {
    return await this.userRepository.save(user)
  }

  public async findUserByEmail (email: string) {
    return await this.userRepository.findOneBy({ email })
  }

  public async findUserById (id: number) {
    return await this.userRepository.findOneBy({ id })
  }
}

export default UserRepository
