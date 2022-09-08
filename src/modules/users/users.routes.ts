import { Repository } from "typeorm"
import usersCtrl from "./users.ctrl";
import { User } from "./users.entity"
import { createUserSchema, deleteUserSchema, getAllUsersSchema, getUserSchema, updateUserSchema } from "./users.schema";

export default async (fastify, opts) => {
    const userCtrl = usersCtrl(fastify);

    fastify.route({
        method: "GET",
        url: "/users",
        //preValidation
        handler: (await userCtrl).getAllUsers,
        schema: getAllUsersSchema
    })

    fastify.route({
        method: "GET",
        url: "/users/:id",
        //preValidation
        handler: (await userCtrl).getUser,
        schema: getUserSchema
    })

    fastify.route({
        method: "POST",
        url: "/users",
        //preValidation
        handler: (await userCtrl).createUser,
        schema: createUserSchema
    })

    fastify.route({
        method: "DELETE",
        url: "/users",
        //preValidation
        handler: (await userCtrl).deleteUser,
        schema: deleteUserSchema
    })

    fastify.route({
        method: "PUT",
        url: "/users",
        //preValidation
        handler: (await userCtrl).updateUser,
        schema: updateUserSchema
    })


}