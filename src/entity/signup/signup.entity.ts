import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string
    @Column()
    firstname: string
    @Column()
    middlename: string
    @Column()
    lastname: string
    @Column()
    contactno: string
    @Column()
    gender: string
    @Column()
    municipality: string
    @Column()
    province: string
    @Column()
    barangay: string
}

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    userId: number
    @Column()
    email: string
    @Column()
    password: string
}