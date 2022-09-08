import { getCustomRepository } from "typeorm"
import { ItemsRepository } from "./items.repo";

export default async (server) => {
    const iR = getCustomRepository(ItemsRepository);

    const getAllItems = async (req, reply) => {
        try {
            return await iR.getAllItems()
        }
        catch(e) {
            console.error(e);
        }
    }

    const getItem = async (req, reply) => {
        try {
            return await iR.getItem(req.params.id)
        }
        catch(e) {
            console.error(e);
        }
    }

    return {
        getAllItems,
        getItem
    }
}