
'use client';
import { signIn, useSession } from 'next-auth/react';
import React, { useCallback,useEffect,useState } from "react";
import Information from '@/app/components/information/Information';
import Button from "@/components/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from 'react-icons/fa'; 
import { redirect, useRouter } from "next/navigation";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
import Input from '@/app/components/Inputs/Input';
import Link from "next/link";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/app/validations/LoginSchema';

/**
 * @description Pantalla de registro 
 * @author Bernardo de la Sierra
 * @version 1.0.1 
 * @returns {JSX.Element} Retorna un elemento JSX que representa el botón.
 */
const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const swal = require('sweetalert2')

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = 
  async (data) => {

    const {email, password} = data;

    try {

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if(!response?.error){
        router.push("/home");
        router.refresh();
      }

      if (!response?.ok) {
        const error = JSON.parse(response?.error ?? "{errors: \"Ocurrió un error durante el inicio de sesión\"}")
        throw new Error(error.errors);
      }
      // Process response here
      console.log("Login Successful", response);
      swal.fire({
        title: 'Se ha iniciado sesión',
        text: 'Se realizó el inicio de sesión con éxito',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      router.push("/home");
    } catch (error: any) {
      swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  return (
    <div id="Background" className="min-h-screen bg-gradient-custom flex flex-col">

      <div id="Section" className="flex-1 flex flex-col lg:flex-row 
      md:flex-row justify-center items-center">

        <div id="Section-Information" className="lg:w-3/8  flex flex-col lg:items-start
         md:items-start sm:items-center md:px-10 lg:px-20 items-center">
          <span> 
            <Information />
          </span>
        </div>

        <form id="SignUp-Section" className=" flex flex-col  items-center md:px-10
        mt-4 lg:mt-0  " onSubmit={handleSubmit(onSubmit)} >
           <h2 className="lg:text-4xl md:text-4xl text-3xl font-bold text-white pt-2 lg:w-[400px]
           md:w-[400px]     mb-16 mx-auto">
              ¡Bienvenid@ de nuevo!
            </h2>
            <div className="pb-4">
                <Input
                    id="email"
                    label="Correo electrónico"
                    type="email"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>

            {errors.email && typeof errors.email.message === 'string' && (
              <span className="text-red-500 mb-5">{errors.email.message}</span>
            )}

            <div className=" pb-4">
                <Input
                  id="password"
                  label="Contraseña"
                  type="password"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
            </div>

            {errors.password && typeof errors.password.message === 'string' && (
              <span className="text-red-500 mb-5">{errors.password.message}</span>
            )}

            <div className=" pb-4">

            <Button 
                outline 
                label="Continuar con  Google"
                icon={FcGoogle}
                onClick={() => signIn('google', {
                  callbackUrl: "/home"
                })}
            
              />

            </div>
            <div className="pb-8"> 
            <Button 
              outline 
              label="Continuar con Facebook"
              icon={FaFacebook}
              onClick={() => signIn('facebook', {
                callbackUrl: "/home"
              })}
          
            />
            </div>
        
            <Button
              type="submit"
              borderColor="border-custom-green"
              label="Iniciar sesión"
              outline
              big
            />

          <h3 className="text-white text-sm lg:text-lg font-bold leading-normal pt-4">
            ¿No tienes una cuenta? 
            <span className="cursor-pointer hover:underline pl-4"> 
                <Link href="/signup" >
                    Regístrate 
                </Link>
            </span>
          </h3>


          </form>


      </div>
    </div>
  );
};

export default Login;
