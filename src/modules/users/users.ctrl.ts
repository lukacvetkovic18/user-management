import { getCustomRepository } from "typeorm"
import { UsersRepository } from "./users.repo"

export default async (server) => {
    const uR = getCustomRepository(UsersRepository);

    const getAllUsers = async (req, reply) => {
        try {
            return await uR.getAllUsers()
        }
        catch(e) {
            console.error(e);
        }
    }

    const getUser = async (req, reply) => {
        try {
            return await uR.getUser(req.params.id)
        }
        catch(e) {
            console.error(e);
        }
    }

    const createUser = async (req, reply) => {
        try {
            return await uR.createUser(req.body)
        }
        catch(e) {
            console.error(e);
        }
    }

    const deleteUser = async (req, reply) => {
        try {
            return await uR.deleteUser(req.params.id)
        }
        catch(e) {
            console.error(e);
        }
    }

    const updateUser = async (req, reply) => {
        try {
            return await uR.updateUser(req.body)
        }
        catch(e) {
            console.error(e);
        }
    }


    return {
        getAllUsers,
        getUser,
        createUser,
        deleteUser,
        updateUser,
    }
}