import * as bcrypt from "bcrypt";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm"
import { Address } from "../addresses/addresses.entity";
import { Item } from "../items/items.entity";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id: number
    
    @Column({ type: "varchar", nullable: false })
    firstName: string

    @Column({ type: "varchar", nullable: false })
    lastName: string

    @Column({ type: "varchar" })
    description: string

    @Column({ type: "varchar", unique: true })
    email: string

    @Column({ type: "varchar", nullable: false })
    password: string

    @Column()
    phoneNumber: number

    @Column({ type: "int" })
    age: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    //More users can use the same address, also a user can use more addresses
    @ManyToMany(() => Address, (address) => address.users, { cascade: true })
    @JoinTable()
    addresses: Address[]

    //One user can possess more items
    @OneToMany(() => Item, (item) => item.user, { cascade: true })
    items: Item[]

    @BeforeInsert()
    @BeforeUpdate()
    //This method is used for protecting admin's password and generating bcrypt of a password and saving it to the database
    async hashPassword(){
        if(this.password){
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
    //This method is used to check if given password matches the one in the database
    async comparePassword(input: string) : Promise<boolean> {
        return await bcrypt.compare(input, this.password);
    }

    //Each time a user requests to reset password, 6 random PIN codes are generated and saved in 'Pin' entity
    @OneToMany(() => Pin, (pin) => pin.user, { cascade: true })
    pins: Pin[]
}

@Entity()
export class Pin {
    @PrimaryGeneratedColumn()
    code: number

    @ManyToOne(() => User, (user) => user.pins)
    user: User
}