import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    brand: string
    @Column()
    model: string
    @Column()
    owner: string
    @Column()
    downpayment: string
    @Column()
    location: string
    @Column()
    installmentpaid: string
    @Column()
    installmentduration: string
    @Column()
    delinquent: string
}