
'use client';

import React, { useState, useCallback } from "react";
import Information from "../components/information/Information";
import Button from "../components/Button";
import axios from  "axios"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from 'react-icons/fa'; 


import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
import Input from "../components/Inputs/Input";
import Link from "next/link";
import useLogin from "@/app/hooks/useLogin";
import useRegister from "@/app/hooks/useRegister";

/**
 * @description Pantalla de registro 
 * @author Bernardo de la Sierra
 * @version 1.0.1 
 * @returns {JSX.Element} Retorna un elemento JSX que representa el botón.
 */
const SignUp = () => {

  const [isLoading, setIsLoading] = useState(false);
  const registerModal = useRegister();
  const loginModal = useLogin();

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() => {
      // toast.success('Registered!');
      registerModal.onClose();
      loginModal.onOpen();
    })
    // .catch((error) => {
      // toast.error(error);
    // })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  return (
    <div id="Background" className="min-h-screen bg-gradient-custom flex flex-col">

      <div id="Section" className="flex-1 flex flex-col lg:flex-row 
      md:flex-row justify-center items-center">

        <div id="Section-Information" className="lg:w-3/8  flex flex-col lg:items-start
         md:items-start sm:items-center md:px-10 lg:px-20 items-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white pt-2 
          lg:w-[300px] md:w-[300px] sm:w-[300px] w-[300px]">
            ¡No lo dudes más y haz tu cuenta ahora mismo!
          </h2>
          <span> 
            <Information />
          </span>
        </div>

        <div id="SignUp-Section" className=" flex flex-col items-center md:px-10
        mt-4 lg:mt-0  ">
          <div className="pb-4">
           <Input
            id="name"
            label="Nombre"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            big
                />
          </div>
          
          <div className=" pb-4">
              <Input
                  id="email"
                  label="Correo"
                  type="email"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  big
                  required
              />
          </div>

        <div className="sm:md:lg:flex flex-row  ">
            <div className="md:lg:mr-4 pb-4">
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

            <div className="pb-4">
                <Input
                  id="password"
                  label="Confirmar contraseña"
                  type="password"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
            </div>
        </div>
        <div> 
        
         </div>
        
          
         <div className="md:lg:flex flex-row  ">
            <div className="md:lg:mr-4 pb-4 pt-8">

           <Button 
              outline 
              label="Continuar con Google"
              icon={FcGoogle}
              onClick={() => {}}
          
            />
            </div>
            <div className="lg:pt-8 pb-8"> 
            <Button 
              outline 
              label="Continuar con Facebook"
              icon={FaFacebook}
              onClick={() => {}}
          
            />
            </div>
           </div>
           {/* Enlace temporal a healt data */}
           <Link href="/healthdata" >
            <Button
              borderColor="border-custom-green"
              label="Regístrate"
              outline
              big
           
              onSubmit={handleSubmit(onSubmit)}
              
            />
          </Link>
          <h3 className="text-white text-sm lg:text-lg font-bold leading-normal pt-4 ">
            ¿Ya tienes una cuenta?
          
            <span className="cursor-pointer hover:underline pl-4"> 
                <Link href="/login" >
                      Iniciar Sesión
                </Link>
            </span>
         
          </h3>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
