import { z } from "zod";

export const HealthSchema = z.object({
  weight: z
    .string()
    .min(1)
    .regex(/^(?:[2-9]|[1-7][0-9]|83)$/, {
      message: "Ingresa un peso válido en kilogramos (entre 2 y 82)",
    }),
  height: z
    .string()
    .min(1)
    .regex(/^(?:0\.[5-9]|[1-2](?:\.[0-9]{1,2})?|2\.([0-7][0-9]|80))$/, {
      message: "Ingresa una altura válida en metros (entre 0.5 y 2.80)",
    }),
  sex: z.string().min(1),
  birth_date: z
    .string()
    .min(1)
    .refine((value) => {
      const birthDate = new Date(value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
          currentDate.getDate() < birthDate.getDate())
      ) {
        return age - 1 >= 15; // Restamos 1 para ajustar si aún no ha cumplido años en este año
      }
      return age >= 15;
    }, {
      message: "Debes tener al menos 15 años para registrarte",
    }),
  body_fat: z
    .string()
    .min(1)
    .regex(/^(?:[0-5]?[0-9]|60)$/, {
      message:
        "Ingresa un valor válido para el porcentaje de grasa corporal (entre 0 y 60)",
    }),
  muscular_mass: z
    .string()
    .min(1)
    .regex(/^(?:[0-5]?[0-9]|80)$/, {
      message: "Ingresa un valor válido para la masa corporal (entre 0 y 80)",
    }),
});
