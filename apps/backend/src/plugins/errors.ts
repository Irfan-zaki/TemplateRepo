import type { FastifyInstance } from "fastify";

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    const statusCode = error.statusCode && error.statusCode >= 400 ? error.statusCode : 500;
    const message = statusCode >= 500 ? "Internal server error." : error.message;
    reply.status(statusCode).send({ success: false, message });
  });
}
