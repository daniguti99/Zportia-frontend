// src/schemas/editProfileSchema.ts
import { z } from "zod";

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(5, "El nombre de usuario debe tener mínimo 5 caracteres"),

  firstName: z
    .string()
    .min(2, "El nombre debe tener mínimo 2 caracteres"),

  lastName: z
    .string()
    .min(2, "Los apellidos deben tener mínimo 2 caracteres"),

  isPrivate: z.boolean().optional(),
});

export type EditProfileForm = z.infer<typeof editProfileSchema>;
