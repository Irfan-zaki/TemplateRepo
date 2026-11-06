import { authHandlers } from "./auth.handlers";
import { recordsHandlers } from "./records.handlers";

export const handlers = [
  ...authHandlers,
  ...recordsHandlers
];
