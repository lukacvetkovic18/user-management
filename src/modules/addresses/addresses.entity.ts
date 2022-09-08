import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, OneToMany } from "typeorm"
import { Item } from "../items/items.entity"
import { User } from "../users/users.entity"

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
    type: placeType

    @ManyToMany(() => User)
    users: User[]

    @OneToMany(() => Item, (item) => item.location)
    items: Item[]
}