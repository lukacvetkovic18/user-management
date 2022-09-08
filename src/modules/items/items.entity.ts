import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm"
import { Address } from "../addresses/addresses.entity";
import { User } from "../users/users.entity";

@Entity()
export class Item extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id: number
    
    @Column({ type: "varchar", nullable: false })
    name: string

    @Column({ type: "varchar", nullable: false })
    image: string

    @Column({ type: "varchar", nullable: false })
    description: string

    @ManyToOne(() => User, (user) => user.items)
    user: User

    @ManyToOne(() => Address, (address) => address.items)
    location: Address
}