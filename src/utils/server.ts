import fastify from "fastify";
import { logger } from "./logger";
import { applicationRoutes } from "../modules/applications/applications.routes";
import { usersRoutes } from "../modules/users/users.routes";
import { roleRoutes } from "../modules/roles/roles.routes";
import guard from "fastify-guard";
import jwt from "jsonwebtoken";

type User = {
  id: string;
  applicationId: string;
  scopes: Array<string>;
};

declare module "fastify" {
  interface FastifyRequest {
    user: User;
  }
}

export async function buildServer() {
  const app = fastify({
    logger,
  });

  app.decorateRequest("user");

  // Add hook for on every request we attach user to the request
  app.addHook("onRequest", async function (request, reply) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return;
    }

    try {
      const token = authHeader.replace("Bearer", "")

      const decoded = jwt.verify(token, 'secret') as User;

      request.user = decoded;
    } catch (error) {

    }
  })

  // register plugins
  app.register(guard, {
    // need to tell guard which property in the request we can find our user
    requestProperty: "user",
    // tell inside of our user where we can find our scopes property (we have scope in jwt)
    scopeProperty: "scopes",
    errorHandler: (result, request, reply) => {
      reply.send("You can not do that")
    }
  })


  // register routes
  app.register(applicationRoutes, { prefix: "/api/applications" });
  app.register(usersRoutes, { prefix: "/api/users" });
  app.register(roleRoutes, { prefix: "/api/roles" });

  return app;
}
