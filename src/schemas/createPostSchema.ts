import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .max(500, "El contenido no puede superar los 500 caracteres")
    .optional()
    .or(z.literal("")),

  location: z.string().optional(),

  sport: z
    .string()
    .min(1, "Debes seleccionar un deporte")
    .max(50, "El deporte no puede superar los 50 caracteres"),

  file: z
    .any()
    .refine((value) => value instanceof FileList && value.length > 0, {
      message: "Debes subir una imagen o un video",
    })
    .transform((value) => value[0]) // ← convierte FileList → File
    .refine(
      (file) =>
        file.type.startsWith("image/") || file.type === "video/mp4",
      {
        message: "El archivo debe ser una imagen o un video MP4",
      }
    ),
});

export type CreatePostForm = z.infer<typeof createPostSchema>;
