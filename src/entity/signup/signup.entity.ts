/* eslint-disable @typescript-eslint/no-unused-vars */
import { type } from 'os';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Vehicle } from '../my-property/my-property';
import { MyVehiclePropertyModel } from 'src/models/my-property/MyProperty';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  firstname: string;
  @Column()
  middlename: string;
  @Column()
  lastname: string;
  @Column()
  contactno: string;
  @Column()
  gender: string;
  @Column()
  municipality: string;
  @Column()
  province: string;
  @Column()
  barangay: string;

  @OneToMany((type) => Vehicle, (vehicle) => vehicle?.user)
  vehicles: MyVehiclePropertyModel[];
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  email: string;
  @Column()
  password: string;
}
