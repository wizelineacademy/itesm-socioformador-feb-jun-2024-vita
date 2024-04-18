import { z } from "zod";

export const HealthSchema = z.object({
  weight: z.coerce
    .number({
      invalid_type_error: "El valor del peso debe ser un número"
    })
    .gt(0, {
      message: "Debes ingresar un peso mayor a 0 kg"
    })
    .lte(200, {
      message: "Debes ingresar un peso menor o igual a 200 kg"
    }),
  height: z.coerce
    .number({
      invalid_type_error: "El valor de la altura debe ser un número"
    })
    .gte(0.5, {
      message: "Debes ingresar una altura mayor o igual a 0.5 m"
    })
    .lte(2.8, {
      message: "Debes ingresar un peso menor o igual a 2.8 m"
    }),
  sex: z.string()
    .min(1, {
      message: "Debes ingresar el sexo"
    }),
  birth_date: z
    .string()
    .min(1, {
      message: "Debes ingresar la fecha de nacimiento"
    })
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
  body_fat: z.coerce
    .number({
      invalid_type_error: "El valor de la grasa corporal debe ser un número"
    })
    .gt(0, {
      message: "Debes ingresar una grasa corporal mayor a 0%"
    })
    .lte(60, {
      message: "Debes ingresar una grasa corporal menor o igual a 60%"
    }),
  muscular_mass: z.coerce
    .number({
      invalid_type_error: "El valor de la masa muscular debe ser un número"
    })
    .gt(0, {
      message: "Debes ingresar una masa muscular mayor a 0 kg"
    })
    .lte(80, {
      message: "Debes ingresar una masa muscular menor o igual a 80 kg"
    })
});
