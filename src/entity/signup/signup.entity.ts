import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number
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

    @Column()
    email: string
    @Column()
    password: string
}