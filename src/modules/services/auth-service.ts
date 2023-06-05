import { inject, injectable } from 'inversify';
import Users from '../../entities/user.entity';
import AuthenticationService from '../../lib/authentication-service';
import { passwordGenerator, passwordVerifier } from '../../lib/password-gen';
import { ConflictError, UnAuthorizedError } from '../../lib/responses';
import { LoginDto, UserDto } from '../dto/user.dto';
import UserRepository from '../repositories/auth-repository';
import UserService from './user-service';

@injectable()
class AuthService {
  constructor(@inject(UserRepository) private userRepository: UserRepository, @inject(UserService) private userService: UserService, @inject(AuthenticationService) private authentication: AuthenticationService) {}

  public async getUser(id: any) {
    return await this.userService.getUser(id);
  }

  public async registerUser(userDto: UserDto) {
    console.log("userDto", userDto);
    const {name, email, password} = userDto;
    const result = await this.userRepository.findUserByEmail(email);
    if (result) {
      throw new ConflictError('User email already exists', {email})
    }
    const hashPassword = await passwordGenerator(password);
    const data = await this.userRepository.createUser(new Users(name, email, hashPassword));
    return data;
  }


  public async login(loginDto: LoginDto) {
    console.log("loginDto", loginDto);
    const {email, password} = loginDto;
    const result = await this.userRepository.findUserByEmail(email);
    if (!result) {
      throw new UnAuthorizedError('Incorrect Email/Password', null)
    }

    const checkedPass = await passwordVerifier(password, result.password);
    if (!checkedPass) {
      throw new UnAuthorizedError('Incorrect Email/Password', null)
    } 
    const token = this.authentication.generateToken(result.id)
    return {token};
  }
}

export default AuthService;
