import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  
} from 'typeorm'

export default abstract class Model extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
  readonly id!: number

    @CreateDateColumn()
      created_at!: Date

    @UpdateDateColumn()
      updated_at!: Date

    @Column('boolean', {
      default: false
    })
    isDeleted!: boolean
}
