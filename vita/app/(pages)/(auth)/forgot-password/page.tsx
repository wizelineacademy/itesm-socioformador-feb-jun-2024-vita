'use client';
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Inputs/Input';
import Button from "@/components/buttons/Button";
import { ForgotPasswordSchema } from '@/app/validations/ForgotPasswordSchema';
import { useRouter } from "next/navigation";
import axios from 'axios';

/**
 * @description 
 * @returns {JSX.Element} 
 */
const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/send-reset-password-link', { email: data.email });
      alert('Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.');
      router.push('/login');
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al enviar el enlace de restablecimiento de contraseña.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-custom">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Restablecer Contraseña</h2>
        <div className="mb-4">
          <Input
            id="email"
            label="Correo Electrónico"
            type="email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        <Button
          type="submit"
          label="Enviar Enlace de Restablecimiento"
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
