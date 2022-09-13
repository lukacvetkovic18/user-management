import { Repository } from "typeorm";
import adminsCtrl from "./admins.ctrl";
import { Admin } from "./admins.entity";
import { adminAuthSchema, createAdminSchema, deleteAdminSchema, getAdminSchema, getAllAdminsSchema, updateAdminSchema } from "./admins.schema";

export default async (fastify, opts) => {
    const adminCtrl = adminsCtrl(fastify);
    const adminRepo : Repository<Admin> = fastify.db.getRepository(Admin);

    //This route allow admins to login as admin or superAdmin
    fastify.post("/admins/auth", { schema: adminAuthSchema },async (req, reply) => {
        const admin = await adminRepo.findOne({ where: { email: req.body.email }})
        if (!admin) {
            return reply.code(401).send({ message: "Admin doesn't exist."})
        }
        if (!req.body.password) {
            return reply.code(401).send({ message: "Password wasn't sent."})
        }
        if (!(await admin.comparePassword(req.body.password))) {
            return reply.code(401).send({ message: "Sent password doesn't match database password."})
        }
        else {
            //if attribute 'isSuperAdmin' is marked true, admin will be logged in as superAdmin
            let role : string;
            if (admin.isSuperAdmin) {
                role = "SuperAdmin"
            } else {
                role = "Admin"
            }
            const token = await fastify.jwt.sign({email: admin.email, role: role})
            return reply.send({token: token});
        }
    })

    fastify.route({
        method: "GET",
        url: "/admins",
        preValidation: fastify.superAdminAuth,
        handler: (await adminCtrl).getAllAdmins,
        schema: getAllAdminsSchema
    })

    fastify.route({
        method: "GET",
        url: "/admins/:id",
        preValidation: fastify.superAdminAuth,
        handler: (await adminCtrl).getAdmin,
        schema: getAdminSchema
    })

    fastify.route({
        method: "POST",
        url: "/admins",
        preValidation: fastify.superAdminAuth,
        handler: (await adminCtrl).createAdmin,
        schema: createAdminSchema
    })

    fastify.route({
        method: "DELETE",
        url: "/admins",
        preValidation: fastify.superAdminAuth,
        handler: (await adminCtrl).deleteAdmin,
        schema: deleteAdminSchema
    })

    fastify.route({
        method: "PUT",
        url: "/admins",
        preValidation: fastify.superAdminAuth,
        handler: (await adminCtrl).updateAdmin,
        schema: updateAdminSchema
    })
}