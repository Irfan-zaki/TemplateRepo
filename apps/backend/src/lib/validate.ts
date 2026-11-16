import type { FastifyReply } from "fastify";
import type { ZodType } from "zod";

export function parseOrReply<T>(schema: ZodType<T>, value: unknown, reply: FastifyReply): T | undefined {
  const result = schema.safeParse(value);
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "Invalid request.";
    reply.status(400).send({ success: false, message });
    return undefined;
  }
  return result.data;
}

export function isUniqueViolation(error: unknown): boolean {
  if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "23505") {
    return true;
  }
  if (typeof error === "object" && error !== null && "cause" in error) {
    return isUniqueViolation((error as { cause: unknown }).cause);
  }
  return false;
}
