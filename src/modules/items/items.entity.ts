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

    //One user can have many items in his possession
    @ManyToOne(() => User, (user) => user.items)
    user: User

    //One location can store many items
    @ManyToOne(() => Address, (address) => address.items)
    location: Address
}