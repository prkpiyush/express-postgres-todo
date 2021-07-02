import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({type: 'bool'})
  isComplete: boolean;
}
