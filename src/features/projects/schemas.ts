import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(3).max(50),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((val) => (val === "" ? undefined : val)),
    ])
    .optional(),
  workspaceId: z.string(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((val) => (val === "" ? undefined : val)),
    ])
    .optional(),
});
