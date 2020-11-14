import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(type => User, user => user.role)
  user: Role;
}
