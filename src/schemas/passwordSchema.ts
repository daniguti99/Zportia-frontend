import { z } from "zod";

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Debes introducir tu contraseña actual"),

    newPassword: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una minúscula")
      .regex(/[0-9]/, "Debe contener al menos un número"),

    repeatPassword: z
      .string()
      .min(1, "Debes repetir la contraseña"),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"],
  });

export type PasswordForm = z.infer<typeof passwordSchema>;
