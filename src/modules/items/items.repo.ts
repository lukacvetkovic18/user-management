import { EntityRepository, Repository } from "typeorm";
import { Item } from "./items.entity";

@EntityRepository(Item)
export class ItemsRepository extends Repository<Item> {
    
    public async getAllItems() {
        return await this.find();
    }

    public async getItem(id) {
        return await this.findOne(id);
    }
}