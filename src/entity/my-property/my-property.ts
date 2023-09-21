import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    userId: number
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
    @Column()
    description: string
}

@Entity()
export class VehicleImage {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    vehicleID: number
    @Column()
    vehicleFrontIMG: string
    @Column()
    vehicleRightIMG: string
    @Column()
    vehicleLeftIMG: string
    @Column()
    vehicleBackIMG: string
    @Column()
    vehicleCRIMG: string
    @Column()
    vehicleORIMG: string
}