import { Repository } from "typeorm"
import usersCtrl from "./users.ctrl";
import { User } from "./users.entity"
import { addAddressSchema, createUserSchema, deleteUserSchema, getAllUsersSchema, getUserSchema, insertItemSchema, removeAddressSchema, removeItemSchema, requestPasswordResetSchema, resetPasswordSchema, updateUserSchema } from "./users.schema";

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

    fastify.route({
        method: "PUT",
        url: "/users/addAddress",
        //preValidation
        handler: (await userCtrl).addAddress,
        schema: addAddressSchema
    })

    fastify.route({
        method: "PUT",
        url: "/users/removeAddress",
        //preValidation
        handler: (await userCtrl).removeAddress,
        schema: removeAddressSchema
    })

    fastify.route({
        method: "POST",
        url: "/users/addItem",
        //preValidation
        handler: (await userCtrl).insertItem,
        schema: insertItemSchema
    })

    fastify.route({
        method: "DELETE",
        url: "/users/removeItem",
        //preValidation
        handler: (await userCtrl).removeItem,
        schema: removeItemSchema
    })

    fastify.route({
        method: "PUT",
        url: "/users/request",
        //preValidation
        handler: (await userCtrl).requestPasswordReset,
        schema: requestPasswordResetSchema
    })

    fastify.route({
        method: "PUT",
        url: "/users/reset",
        //preValidation
        handler: (await userCtrl).resetPassword,
        schema: resetPasswordSchema
    })
}