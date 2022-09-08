import { EntityRepository, getCustomRepository, getRepository, Repository } from "typeorm";
import { AddressesRepository } from "../addresses/addresses.repo";
import { ItemsRepository } from "../items/items.repo";
import { User } from "./users.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    private _adR = getCustomRepository(AddressesRepository);
    private _iR = getCustomRepository(ItemsRepository);

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
            .execute;
        return "User deleted successfuly."
    }

    public async updateUser(data) {
        await this.save(this.create(data));
        return "User updated successfuly."
    }
}