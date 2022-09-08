import { getCustomRepository } from "typeorm"
import { AdminsRepository } from "./admins.repo"

export default async (server) => {
    const aR = getCustomRepository(AdminsRepository);

    const getAllAdmins = async (req, reply) => {
        try {
            return await aR.getAllAdmins()
        }
        catch(e) {
            console.error(e);
        }
    }

    const getAdmin = async (req, reply) => {
        try {
            return await aR.getAdmin(req.params.id)
        }
        catch(e) {
            console.error(e);
        }
    }

    const createAdmin = async (req, reply) => {
        try {
            return await aR.createAdmin(req.body)
        }
        catch(e) {
            console.error(e);
        }
    }

    const deleteAdmin = async (req, reply) => {
        try {
            return await aR.deleteAdmin(req.params.id)
        }
        catch(e) {
            console.error(e);
        }
    }

    const updateAdmin = async (req, reply) => {
        try {
            return await aR.updateAdmin(req.body)
        }
        catch(e) {
            console.error(e);
        }
    }

    return {
        getAllAdmins,
        getAdmin,
        createAdmin,
        deleteAdmin,
        updateAdmin
    }
}