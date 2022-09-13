import { EntityRepository, Repository } from "typeorm";
import { Address } from "./addresses.entity";

@EntityRepository(Address)
export class AddressesRepository extends Repository<Address> {
    
    public async getAllAddresses() {
        return await this.find();
    }

    public async getAddress(id) {
        return await this.findOne(id);
    }

    public async createAddress(data) {
        await this.save(this.create(data));
        return "Address created successfuly."
    }

    public async deleteAddress(id) {
        this
            .createQueryBuilder()
            .delete()
            .from(Address)
            .where("id = :id", { id: id })
            .execute();
        return "Address deleted successfuly."
    }

    public async updateAddress(data) {
        await this.save(this.create(data));
        return "Address updated successfuly."
    }
}