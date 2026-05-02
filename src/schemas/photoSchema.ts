// src/schemas/photoSchema.ts
import { z } from "zod";

export const photoSchema = z.object({
  photo: z
    .any()
    .refine(
      (file) =>
        file instanceof File ||
        (file instanceof FileList && file.length > 0),
      "Debes seleccionar una imagen válida"
    ),
});

export type PhotoForm = z.infer<typeof photoSchema>;
