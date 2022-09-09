import { add } from "lodash";
import { EntityRepository, getCustomRepository, getRepository, Repository } from "typeorm";
import { PlainObjectToNewEntityTransformer } from "typeorm/query-builder/transformer/PlainObjectToNewEntityTransformer";
import { writeHeapSnapshot } from "v8";
import { Address } from "../addresses/addresses.entity";
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

    public async getUser(id) {
        return await this.findOne(id);
    }

    public async createUser(data) {
        await this.save(this.create(data));
        return "User created successfuly."
    }

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

    public async removeItem(id) {
        await this._iR
            .createQueryBuilder()
            .delete()
            .from(Item)
            .where("id = :id", { id: id })
            .execute();
        return "Item deleted successfuly"
    }

    private async changePassword(email, newPassword) {
        const user = await this.findOne({ where: { email: email }})
        user.password = newPassword;
        await this.save(this.create(user));
        return "Password changed successfuly"
    }

    public async requestPasswordReset(admin_id, email) {
        const user = await this.findOne({ where: { email: email }})
        const admin = await this.findOne(admin_id)
        
        const pins = await this._pR.find();
        pins.forEach(pin => {
            this._pR.delete(pin);
        })

        for(let i = 0; i < 6; i++) {
            await this._pR.save(this._pR.create({
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

    public async resetPassword(code, email, newPassword) {
        const pin = await this._pR.findOne(code);
        
        if(pin){
            const user = await this.findOne({ where: { email: email }});
            return this.changePassword(user.email, newPassword);
        }
        return "Incorrect PIN code"
    }
}