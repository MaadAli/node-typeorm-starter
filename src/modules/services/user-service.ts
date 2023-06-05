import { inject, injectable } from 'inversify';
import Users from '../../entities/user.entity';
import { FailureError } from '../../lib/responses';
import UserRepository from '../repositories/auth-repository';

@injectable()
class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  public async getUser(id: any): Promise<Users> {
    const user = await this.userRepository.findUserById(id);
    if(!user) {
      throw new FailureError('No user found by this id', null);
    }
    return user;
  }
}

export default UserService;
