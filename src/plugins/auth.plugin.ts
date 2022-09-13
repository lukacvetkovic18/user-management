import fp from "fastify-plugin";
import jwt from "fastify-jwt"

export default fp (async (fastify, opts, done) => {
  fastify.register(jwt, {
    secret: "test"
  });

  //If role sent in token is 'SuperAdmin', user will be registered as superAdmin
  fastify.decorate("superAdminAuth", async (req, reply) => {
    try {
      const token = await req.jwtVerify()
      if (token.role !== "SuperAdmin") {
        reply.send("Unauthorized")
      } else {}
    } catch (e) {
      reply.send(e)
    }
  })

  //If role sent in token is 'Admin', user will be registered as admin
  fastify.decorate("adminAuth", async (req, reply) => {
    try {
      const token = await req.jwtVerify()
      if (token.role !== "SuperAdmin" && token.role !== "Admin") {
        reply.send("Unauthorized")
      } else {}
    } catch (e) {
      reply.send(e)
    }
  })

  //If role sent in token is 'User', user will be registered as user
  fastify.decorate("userAuth", async (req, reply) => {
    try {
      const token = await req.jwtVerify()
      if (token.role !== "SuperAdmin" && token.role !== "Admin" && token.role !== "User") {
        reply.send("Unauthorized")
      } else {}
    } catch (e) {
      reply.send(e)
    }
  })

  done()
})