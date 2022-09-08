import { EntityRepository, Repository } from "typeorm";
import { Address } from "./addresses.entity";

@EntityRepository(Address)
export class AddressesRepository extends Repository<Address> {
    
    public async getAllAddresses() {
        const addresses = await this.find();
        let results: string[];
        for(let i = 0; i < addresses.length; i++) {
            results.push(`${addresses[i].street} ${addresses[i].streetNumber}, ${addresses[i].city}, ${addresses[i].country} ---${addresses[i].type}`);
        }
        return results;
    }

    public async getAddress(id) {
        const address = await this.findOne(id);
        return `${address.street} ${address.streetNumber}, ${address.city}, ${address.country} ---${address.type}`;
    }

    public async createAddress(data) {
        await this.save(this.create(data));
        return "Address created successfuly."
    }

    public async deleteAddress(id) {
        await this
            .createQueryBuilder()
            .delete()
            .from(Address)
            .where("id = :id", { id: id })
            .execute;
        return "Address deleted successfuly."
    }

    async updateAddress(data) {
        await this.save(this.create(data));
        return "Address updated successfuly."
    }
}