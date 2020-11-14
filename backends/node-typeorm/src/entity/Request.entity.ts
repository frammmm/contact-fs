import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  header: string;

  @Column()
  body: string;

  @Column()
  timestamp: number;

  @Column()
  complete: boolean;

  @Column()
  file_url: string;

  @OneToMany(type => User, user => user.role)
  user: string;
}
