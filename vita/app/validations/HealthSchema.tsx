import { z } from "zod";

export const HealthSchema = z.object({
    
    weight: z.string().min(1).regex(/^\d+$/, {
      message: "Ingresa un peso válido en kilogramos (10)"
    }),
    height: z.string().min(1).regex(/^\d+(\.\d{1,2})?$/, {
      message: "Ingresa una altura válida en metros (formato: xx.xx)"
    }),
    sex: z.string().min(1),
    birth_date: z.string().min(1),
    body_fat:  z.string().min(1).regex(/^\d+$/, {
      message: "Ingresa un valor válido para el porcentaje de grasa corporal (20) "
    }),
  
    muscular_mass: z.string().min(1).regex(/^\d+$/, {
      message:  "Ingresa un valor válido para la masa corporal (40)"
    }),
    
   
  });
  