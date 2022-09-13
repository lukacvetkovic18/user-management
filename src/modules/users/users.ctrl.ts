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
            return await uR.deleteUser(req.body.id)
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

    const addAddress = async (req, reply) => {
        try {
            return await uR.addAddress(req.body.user_id, req.body.address_id)
        }
        catch(e) {
            console.error(e);
        }
    }

    const removeAddress = async (req, reply) => {
        try {
            return await uR.removeAddress(req.body.user_id, req.body.address_id)
        }
        catch(e) {
            console.error(e);
        }
    }

    const insertItem = async (req, reply) => {
        try {
            return await uR.insertItem(req.body)
        }
        catch(e) {
            console.error(e);
        }
    }

    const removeItem = async (req, reply) => {
        try {
            return await uR.removeItem(req.body.id)
        }
        catch(e) {
            console.error(e);
        }
    }

    const requestPasswordReset = async (req, reply) => {
        try {
            const data = await uR.requestPasswordReset(req.body.admin_id, req.body.email)
            return await server.sendMail(data);
        }
        catch(e) {
            console.error(e);
        }
    }

    const resetPassword = async (req, reply) => {
        try {
            return await uR.resetPassword(req.body.code, req.body.email, req.body.newPassword)
        }
        catch(e) {
            console.error(e);
        }
    }

    const getHomeItems = async (req, reply) => {
        try {
            return await uR.getHomeItems(req.params.id)
        }
        catch(e) {
            console.error(e);
        }
    }

    const getOfficeItems = async (req, reply) => {
        try {
            return await uR.getOfficeItems(req.params.id)
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
        addAddress,
        removeAddress,
        insertItem,
        removeItem,
        requestPasswordReset,
        resetPassword,
        getHomeItems,
        getOfficeItems
    }
}