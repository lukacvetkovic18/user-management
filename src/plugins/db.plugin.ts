import fp from "fastify-plugin"
import "reflect-metadata"
import { createConnection, getConnectionOptions, getCustomRepository } from "typeorm"
import { UsersRepository } from "../modules/users/users.repo";
import { AdminsRepository } from "../modules/admins/admins.repo";
import { AddressesRepository } from "../modules/addresses/addresses.repo";
import { ItemsRepository } from "../modules/items/items.repo";

export default fp (async (server, opts, done) => {
    try {
        const connectionOptions = await getConnectionOptions();
        const connection = await createConnection(connectionOptions);

        server.decorate("db", connection);

        server.decorate("repos", {
            users: getCustomRepository(UsersRepository),
            admins: getCustomRepository(AdminsRepository),
            addresses: getCustomRepository(AddressesRepository),
            items: getCustomRepository(ItemsRepository)
        });
        done();
    }
    catch(e) {
        console.error(e);
    }
})
