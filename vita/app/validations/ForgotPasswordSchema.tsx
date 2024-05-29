import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un correo electrónico válido' })
});


