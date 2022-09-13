import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, OneToMany } from "typeorm"
import { Item } from "../items/items.entity"
import { User } from "../users/users.entity"

//This enum is used to define if location is user's home or work place
export enum placeType {
    HOME = "home",
    OFFICE = "office"
}

@Entity()
export class Address extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id: number
    
    @Column({ type: "varchar", nullable: false })
    country: string

    @Column({ type: "varchar", nullable: false })
    city: string

    @Column({ type: "varchar", nullable: false })
    street: string

    @Column({ type: "varchar", nullable: false })
    streetNumber: string

    @Column({
        type: "enum",
        enum: placeType,
        default: placeType.HOME
    })
    placeType: placeType

    //More users can use the same address, also a user can use more addresses
    @ManyToMany(() => User, (user) => user.addresses)
    users: User[]

    //More items can be stored in one location
    @OneToMany(() => Item, (item) => item.location, { cascade: true })
    items: Item[]
}