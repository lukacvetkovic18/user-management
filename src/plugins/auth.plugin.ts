import fp from "fastify-plugin";
import jwt from "fastify-jwt"

export default fp (async (fastify, opts, done) => {
  fastify.register(jwt, {
    secret: "test"
  });

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