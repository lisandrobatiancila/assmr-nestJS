/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Assumer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user_id: number;
  @Column()
  assumer_income: string;
  @Column()
  assumer_work: string;
}

@Entity()
export class Assumption {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user_id: number;
  @Column()
  property_id: number;
  @Column()
  assumer_id: number;
  @Column()
  propowner_id: number;
  @Column()
  transaction_date: Date;

  @OneToOne(() => Assumption)
  @JoinColumn()
  assumption: Assumer;
}
