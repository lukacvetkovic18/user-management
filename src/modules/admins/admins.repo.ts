import { EntityRepository, getRepository, Repository } from "typeorm";
import { Admin } from "./admins.entity";

@EntityRepository(Admin)
export class AdminsRepository extends Repository<Admin> {
    
    public async getAllAdmins() {
        return await this.find();
    }

    public async getAdmin(id) {
        return await this.findOne(id);
    }

    public async createAdmin(data) {
        await this.save(this.create(data));
        return "Admin created successfuly."
    }

    public async deleteAdmin(id) {
        await this
            .createQueryBuilder()
            .delete()
            .from(Admin)
            .where("id = :id", { id: id })
            .execute();
        return "Admin deleted successfuly."
    }

    async updateAdmin(data) {
        await this.save(this.create(data));
        return "Admin updated successfuly."
    }
}