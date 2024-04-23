import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    })
    .max(200, {
      message: "El nombre debe tener menos de 200 caracteres",
    }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido",
  }),
  password: z.string()
  .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+*/])[A-Za-z\d@$!%*?&+.*/]{6,}$/, {
      message: "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: @ $ ! % * ? & + - * /"
  }),

  confirmPassword: z.string()
  .min(1, { message: "Se debe llenar este espacio" })
 
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas deben coincidir",
  path: ["confirmPassword"]
});
