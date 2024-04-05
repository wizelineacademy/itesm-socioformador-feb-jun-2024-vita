import {z} from "zod"

export const RegisterSchema = z.object({
    name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(200, {
      message: "Name must be less than 200 characters long",
    }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
})