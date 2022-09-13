import { Repository } from "typeorm";
import usersCtrl from "./users.ctrl";
import { User } from "./users.entity";
import { addAddressSchema, createUserSchema, deleteUserSchema, getAllUsersSchema, getHomeItemsSchema, getUserSchema, insertItemSchema, removeAddressSchema, removeItemSchema, requestPasswordResetSchema, resetPasswordSchema, updateUserSchema, userAuthSchema } from "./users.schema";

export default async (fastify, opts) => {
    const userCtrl = usersCtrl(fastify);
    const userRepo : Repository<User> = fastify.db.getRepository(User);

    fastify.post("/users/auth", { schema: userAuthSchema },async (req, reply) => {
        const user = await userRepo.findOne({ where: { email: req.body.email }})
        if (!user) {
            return reply.code(401).send({ message: "User doesn't exist."})
        }
        if (!req.body.password) {
            return reply.code(401).send({ message: "Password wasn't sent."})
        }
        if (!(await user.comparePassword(req.body.password))) {
            return reply.code(401).send({ message: "Sent password doesn't match database password."})
        }
        else {
            const token = await fastify.jwt.sign({email: user.email, role: "User"})
            return reply.send({token: token});
        }
    })

    fastify.route({
        method: "GET",
        url: "/users",
        preValidation: fastify.adminAuth,
        handler: (await userCtrl).getAllUsers,
        schema: getAllUsersSchema
    })

    fastify.route({
        method: "GET",
        url: "/users/:id",
        preValidation: fastify.adminAuth,
        handler: (await userCtrl).getUser,
        schema: getUserSchema
    })

    fastify.route({
        method: "POST",
        url: "/users",
        preValidation: fastify.adminAuth,
        handler: (await userCtrl).createUser,
        schema: createUserSchema
    })

    fastify.route({
        method: "DELETE",
        url: "/users",
        preValidation: fastify.adminAuth,
        handler: (await userCtrl).deleteUser,
        schema: deleteUserSchema
    })

    fastify.route({
        method: "PUT",
        url: "/users",
        preValidation: fastify.adminAuth,
        handler: (await userCtrl).updateUser,
        schema: updateUserSchema
    })

    fastify.route({
        method: "PUT",
        url: "/users/addAddress",
        preValidation: fastify.userAuth,
        handler: (await userCtrl).addAddress,
        schema: addAddressSchema
    })

    fastify.route({
        method: "PUT",
        url: "/users/removeAddress",
        preValidation: fastify.userAuth,
        handler: (await userCtrl).removeAddress,
        schema: removeAddressSchema
    })

    fastify.route({
        method: "POST",
        url: "/users/addItem",
        preValidation: fastify.userAuth,
        handler: (await userCtrl).insertItem,
        schema: insertItemSchema
    })

    fastify.route({
        method: "DELETE",
        url: "/users/removeItem",
        preValidation: fastify.userAuth,
        handler: (await userCtrl).removeItem,
        schema: removeItemSchema
    })

    fastify.route({
        method: "PUT",
        url: "/users/request",
        preValidation: fastify.userAuth,
        handler: (await userCtrl).requestPasswordReset,
        schema: requestPasswordResetSchema
    })

    fastify.route({
        method: "PUT",
        url: "/users/reset",
        preValidation: fastify.userAuth,
        handler: (await userCtrl).resetPassword,
        schema: resetPasswordSchema
    })

    fastify.route({
        method: "GET",
        url: "/users/homeItems/:id",
        preValidation: fastify.userAuth,
        handler: (await userCtrl).getHomeItems,
        schema: getHomeItemsSchema
    })

    fastify.route({
        method: "GET",
        url: "/users/officeItems/:id",
        preValidation: fastify.userAuth,
        handler: (await userCtrl).getOfficeItems,
        schema: getHomeItemsSchema
    })
}