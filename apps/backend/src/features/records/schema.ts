import { z } from "zod";
import { RECORD_STATUSES } from "../../db/schema/records.js";

export const recordBodySchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  category: z.string().trim().min(1, "Category is required."),
  status: z.enum(RECORD_STATUSES),
  value: z.number().finite("Value must be a number.")
});

export const recordPatchSchema = recordBodySchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: "Provide at least one field to update."
});

export const recordIdSchema = z.object({
  id: z.string().min(1)
});

export type RecordInput = z.infer<typeof recordBodySchema>;
export type RecordPatch = z.infer<typeof recordPatchSchema>;
