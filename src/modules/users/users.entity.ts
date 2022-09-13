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

    @ManyToMany(() => Address, (address) => address.users, { cascade: true })
    @JoinTable()
    addresses: Address[]

    @OneToMany(() => Item, (item) => item.user, { cascade: true })
    items: Item[]

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(this.password){
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
    async comparePassword(input: string) : Promise<boolean> {
        return await bcrypt.compare(input, this.password);
    }

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