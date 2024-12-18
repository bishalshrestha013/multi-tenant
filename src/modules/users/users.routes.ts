import { FastifyInstance } from "fastify";
import { AssignRoleToUserBody, assignRoleToUserJsonSchema, createUserJsonSchema, logingJsonSchema } from "./users.schemas";
import { assignRoleToUserHandler, createUserHandler, loginHandler } from "./users.controllers";
import { PERMISSIONS } from "../../config/permissions";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", { schema: createUserJsonSchema }, createUserHandler);
  app.post("/login", { schema: logingJsonSchema }, loginHandler);
  app.post<{ Body: AssignRoleToUserBody }>("/roles", { schema: assignRoleToUserJsonSchema, preHandler: [app.guard.scope(PERMISSIONS["users:roles:write"])] }, assignRoleToUserHandler);
}
