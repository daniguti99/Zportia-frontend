import { z } from "zod";

export function createRegisterSchema() {
  return z
    .object({
      username: z
        .string()
        .min(5, "El nombre de usuario debe tener mínimo 5 caracteres"),

      firstName: z
        .string()
        .min(2, "El nombre debe tener mínimo 2 caracteres"),

      lastName: z
        .string()
        .min(2, "Los apellidos deben tener mínimo 2 caracteres"),

      email: z.string().email("Formato de correo inválido"),

      password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
        .regex(/[a-z]/, "Debe contener al menos una minúscula")
        .regex(/[0-9]/, "Debe contener al menos un número"),

      repeatPassword: z.string().min(1, "Debes repetir la contraseña"),

      sports: z.array(z.number()).min(1, "Debes seleccionar al menos un deporte"),

      isPrivate: z.boolean().optional()
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: "Las contraseñas no coinciden",
      path: ["repeatPassword"]
    });
}

export type RegisterForm = z.infer<ReturnType<typeof createRegisterSchema>>;
