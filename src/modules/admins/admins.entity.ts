import * as bcrypt from "bcrypt";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"

@Entity()
export class Admin extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id: number
    
    @Column({ type: "varchar", nullable: false })
    firstName: string

    @Column({ type: "varchar", nullable: false })
    lastName: string

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

    @Column({ type: "boolean", default: false })
    isSuperAdmin: boolean

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
}