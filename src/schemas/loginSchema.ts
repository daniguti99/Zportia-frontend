import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Formato de correo inválido"),
  password: z.string().min(4, "La contraseña debe tener mínimo 4 caracteres")
});

// Tipo generado automáticamente por Zod
export type LoginForm = z.infer<typeof loginSchema>;
