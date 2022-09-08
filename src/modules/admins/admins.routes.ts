import adminsCtrl from "./admins.ctrl";
import { createAdminSchema, deleteAdminSchema, getAdminSchema, getAllAdminsSchema, updateAdminSchema } from "./admins.schema";

export default async (fastify, opts) => {
    const adminCtrl = adminsCtrl(fastify);

    fastify.route({
        method: "GET",
        url: "/admins",
        //preValidation
        handler: (await adminCtrl).getAllAdmins,
        schema: getAllAdminsSchema
    })

    fastify.route({
        method: "GET",
        url: "/admins/:id",
        //preValidation
        handler: (await adminCtrl).getAdmin,
        schema: getAdminSchema
    })

    fastify.route({
        method: "POST",
        url: "/admins",
        //preValidation
        handler: (await adminCtrl).createAdmin,
        schema: createAdminSchema
    })

    fastify.route({
        method: "DELETE",
        url: "/admins",
        //preValidation
        handler: (await adminCtrl).deleteAdmin,
        schema: deleteAdminSchema
    })

    fastify.route({
        method: "PUT",
        url: "/admins",
        //preValidation
        handler: (await adminCtrl).updateAdmin,
        schema: updateAdminSchema
    })
}