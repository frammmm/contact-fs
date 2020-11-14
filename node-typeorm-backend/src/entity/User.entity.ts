import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from './Role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  salt: string;

  @Column()
  password_hash: string;

  @ManyToOne(type => Role, role => role.id)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
