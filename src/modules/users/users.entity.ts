import * as bcrypt from "bcrypt";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable, OneToMany } from "typeorm"
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

    @Column({ type: "varchar", nullable: false })
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

    @ManyToMany(() => Address)
    @JoinTable()
    addresses: Address[]

    @OneToMany(() => Item, (item) => item.user)
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
}