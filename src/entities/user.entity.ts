import { Entity, Column } from 'typeorm';
import Model from './base.entity';
@Entity()
class User extends Model {
  constructor (name: string, email: string, password: string) {
    super()
    // this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  @Column({
    length: 100,
    type: String,
  })
  name: string;

  @Column({
    type: String,
    length: 100,
  })
  email: string;

  @Column({
    type: String,
    length: 100,
  })
  password: string;
}

export default User;
