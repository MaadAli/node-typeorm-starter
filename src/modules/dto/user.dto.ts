import Users from '../../entities/user.entity'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserDto implements Pick<Users, 'name' | 'email' | 'password'> {
  @IsNotEmpty()
    name: string

  @IsNotEmpty()
  @IsEmail()
    email: string

  @IsNotEmpty()
    password: string

  constructor (name: string, email: string, password: string) {
    this.email = email
    this.name = name
    this.password = password
  }
}

export class LoginDto implements Pick<Users, 'email' | 'password'> {
    @IsNotEmpty()
      email: string

    @IsNotEmpty()
      password: string

    constructor (email: string, password: string) {
      this.email = email
      this.password = password
    }
}
