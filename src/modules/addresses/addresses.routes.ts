import addressesCtrl from "./addresses.ctrl";
import { createAddressSchema, deleteAddressSchema, getAddressSchema, getAllAddressesSchema, updateAddressSchema } from "./addresses.schema";

export default async (fastify, opts) => {
    const addressCtrl = addressesCtrl(fastify);

    fastify.route({
        method: "GET",
        url: "/addresses",
        //preValidation
        handler: (await addressCtrl).getAllAddresses,
        schema: getAllAddressesSchema
    })

    fastify.route({
        method: "GET",
        url: "/addresses/:id",
        //preValidation
        handler: (await addressCtrl).getAddress,
        schema: getAddressSchema
    })

    fastify.route({
        method: "POST",
        url: "/addresses",
        //preValidation
        handler: (await addressCtrl).createAddress,
        schema: createAddressSchema
    })

    fastify.route({
        method: "DELETE",
        url: "/addresses",
        //preValidation
        handler: (await addressCtrl).deleteAddress,
        schema: deleteAddressSchema
    })

    fastify.route({
        method: "PUT",
        url: "/addresses",
        //preValidation
        handler: (await addressCtrl).updateAddress,
        schema: updateAddressSchema
    })
}