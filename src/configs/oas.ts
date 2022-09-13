//Here are configured options for Fastify Swagger
export const oas = {
    routePrefix: "/docs",
    swagger: {
        info: {
            title: "User management system",
            description: "System for managing users' info and their belongings.",
            version: "0.0.1",
        },
        servers: [
            {
                url: "http://localhost:3100",
                description: "Local"
            }
        ],
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here',
        },
        consumes: ['application/json'],
        produces: ['application/json'],
        security: [{ BearerAuth: [], BasicAuth: [] }],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                },
                BasicAuth: {
                    type: 'http',
                    scheme: 'basic',
                },
            },
        },
    },
    exposeRoute: true
}