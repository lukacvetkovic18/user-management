import fastify, {FastifyInstance} from "fastify"
import { join } from "path";
import { config } from "dotenv";
import { oas } from "./configs/oas";
import autoLoad from "fastify-autoload";
import fastifyOAS from "fastify-oas";
import fastifySensible from "fastify-sensible";
import fastifyBcrypt from "fastify-bcrypt";

config();

const PORT = process.env.PORT || "3100";
const HOST = process.env.host || "0.0.0.0";

const init = async () => {
    const server: FastifyInstance = fastify({
        logger: true,
    })

    server.register(fastifySensible);
    
    if (process.env.OAS) {
        server.register(fastifyOAS, oas);
    }
    
    server.register(require('fastify-cors'), {
        origin: true,
    })
    
    await server.register(autoLoad, {
        dir: join(__dirname, "./plugins"),
    });
    
    await server.register(autoLoad, {
        dir: join(__dirname, './modules'),
        indexPattern: /.*routes(\.ts|\.js|\.cjs|\.mjs)$/,
        dirNameRoutePrefix: false,
        ignorePattern: /.*(DAL).js/
    });
    
    await server.register(fastifyBcrypt, {
        saltWorkFactor: 12
    })
    
    await server.ready();
    console.info("Everything loaded!");
    return server;
}
    
const start = async () => {
    try {
        const server = await init();
        await server.listen(+PORT,HOST);
    }
    catch (err){
        console.error(err);
        process.exit(1);
    }
}

start();