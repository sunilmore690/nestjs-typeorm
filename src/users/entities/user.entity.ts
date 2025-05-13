import {
  Entity,
  // ObjectIdColumn,
  // ObjectId,
  Column,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  // @ObjectIdColumn()
  // id: ObjectId;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;
}
