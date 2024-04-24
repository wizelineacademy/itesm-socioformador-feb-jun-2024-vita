import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: "Debes ingresar un correo electrónico",
  }),
  password: z.string().min(1, { message: "Debes ingresar una contraseña" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+*/])[A-Za-z\d@$!%*?&+*/]{6,}$/, {
      message: "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: @ $ ! % * ? & + - * /"
  }),
});
