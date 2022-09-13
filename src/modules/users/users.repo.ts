import { EntityRepository, getCustomRepository, getRepository, Repository } from "typeorm";
import { AddressesRepository } from "../addresses/addresses.repo";
import { Item } from "../items/items.entity";
import { ItemsRepository } from "../items/items.repo";
import { Pin, User } from "./users.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    private _adR = getCustomRepository(AddressesRepository);
    private _iR = getCustomRepository(ItemsRepository);
    private _pR = getRepository(Pin);

    public async getAllUsers() {
        return await this.find();
    }

    //Gets certain user by given id
    public async getUser(id) {
        return await this.findOne(id);
    }

    public async createUser(data) {
        await this.save(this.create(data));
        return "User created successfuly."
    }

    //Deletes certain user using query builder
    public async deleteUser(id) {
        await this
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("id = :id", { id: id })
            .execute();
        return "User deleted successfuly."
    }

    public async updateUser(data) {
        await this.save(this.create(data));
        return "User updated successfuly."
    }

    //Creates many-to-many relation between certain user and address
    public async addAddress(user_id, address_id) {
        const user = await this.findOne(user_id);
        const address = await this._adR.findOne(address_id);
        await this._adR
            .createQueryBuilder()
            .relation(User, 'addresses')
            .of(user)
            .add(address)
        await this.save(this.create(user));
        return "Address added to user successfuly."
    }

    //Removes certain many-to-many relation between user and address
    public async removeAddress(user_id, address_id) {
        const user = await this.findOne(user_id);
        const address = await this._adR.findOne(address_id);
        await this._adR
            .createQueryBuilder()
            .relation(User, 'addresses')
            .of(user)
            .remove(address)
        await this.save(this.create(user));
        return "Address removed from user successfuly."
    }

    //Creates new item and adds it to a certain location and user
    public async insertItem(data) {
        const user = await this.findOne(data.user_id);
        const address = await this._adR.findOne(data.address_id);
        this._iR.save(this._iR.create({
            name: data.name,
            image: data.image,
            description: data.description,
            user: user,
            location: address
        }))
        return "Item created successfuly"
    }

    //Removes certain item using query builder
    public async removeItem(id) {
        await this._iR
            .createQueryBuilder()
            .delete()
            .from(Item)
            .where("id = :id", { id: id })
            .execute();
        return "Item deleted successfuly"
    }

    //Private funtion that is called while reseting user's password
    private async changePassword(email, newPassword) {
        const user = await this.findOne({ where: { email: email }})
        user.password = newPassword;
        await this.save(this.create(user));
        return "Password changed successfuly"
    }

    //Function that creates all required data for reseting user's password
    public async requestPasswordReset(admin_id, email) {
        const user = await this.findOne({ where: { email: email }})
        const admin = await this.findOne(admin_id)
        
        const pins = await this._pR.find();
        pins.forEach(pin => {
            this._pR.delete(pin);
        })

        //This loop creates 6 random pins and saves them to the database
        for(let i = 0; i < 6; i++) {
            await this._pR.save(this._pR.create({
                //Pin code is created using Math.random function that generates a random six digits number
                code: Math.random() * (999999 - 100000) + 100000,
                user: user
            }))
        }

        const newPins = await this._pR.find();

        const data = {
            sender: admin.email,
            receiver: email,
            text: `Your reset PINs:\n${newPins[0].code}\n${newPins[1].code}\n${newPins[2].code}\n${newPins[3].code}\n${newPins[4].code}\n${newPins[5].code}`
        }
        return data;
    }

    //This function should be called after requesting password reset, so you can change your password using inserted PIN codes
    public async resetPassword(code, email, newPassword) {
        const pin = await this._pR.findOne(code);
        
        if(pin){
            const user = await this.findOne({ where: { email: email }});
            return this.changePassword(user.email, newPassword);
        }
        return "Incorrect PIN code"
    }

    //This function gets users and all his items which location is labeled "home"
    public async getHomeItems(id) {
        const result = this
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.items", "items")
            .leftJoin("items.location", "location")
            .where("user.id = :id", { id: id })
            .andWhere("location.placeType = :placeType", { placeType: "home" })
            .getOne()
        return result;
    }

    public async getOfficeItems(id) {
        const result = this
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.items", "items")
            .leftJoin("items.location", "location")
            .where("user.id = :id", { id: id })
            .andWhere("location.placeType = :placeType", { placeType: "office" })
            .getOne()
        return result;
    }
}