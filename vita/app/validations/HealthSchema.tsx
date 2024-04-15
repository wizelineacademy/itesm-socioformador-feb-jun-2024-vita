import { z } from "zod";

export const HealthSchema = z.object({
    weight: z.string().min(1).regex(/^\d+(\.\d{1,2})?$/, {
      message: "Ingresa un peso válido en kilogramos (formato: xx.xx)"
    }),
    height: z.string().min(1).regex(/^\d+(\.\d{1,2})?$/, {
      message: "Ingresa una altura válida en metros (formato: xx.xx)"
    }),
    sex: z.string().min(1),
    birth_date: z.string().min(1),
    body_fat: z.string().regex(/^\d+(\.\d{1,2})?$/, {
      message: "Ingresa un valor válido para el porcentaje de grasa corporal (formato: xx.xx)"
    }).nullable(),
    corporal: z.string().regex(/^\d+(\.\d{1,2})?$/, {
      message: "Ingresa un valor válido para la masa corporal (formato: xx.xx)"
    }).nullable(),
  });
  