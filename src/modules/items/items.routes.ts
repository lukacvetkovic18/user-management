import itemsCtrl from "./items.ctrl";
import { getAllItemsSchema, getItemSchema } from "./items.schema";


export default async (fastify, opts) => {
    const itemCtrl = itemsCtrl(fastify);

    fastify.route({
        method: "GET",
        url: "/items",
        //preValidation
        handler: (await itemCtrl).getAllItems,
        schema: getAllItemsSchema
    })

    fastify.route({
        method: "GET",
        url: "/items/:id",
        //preValidation
        handler: (await itemCtrl).getItem,
        schema: getItemSchema
    })
}