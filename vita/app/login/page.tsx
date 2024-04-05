
'use client';

import React, { useState } from "react";
import Information from "../components/information/Information";
import Button from "../../components/Button";
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


/**
 * @description Pantalla de registro 
 * @author Bernardo de la Sierra
 * @version 1.0.1 
 * @returns {JSX.Element} Retorna un elemento JSX que representa el botón.
 */
const Login = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

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

        <div id="SignUp-Section" className=" flex flex-col  items-center md:px-10
        mt-4 lg:mt-0  ">
           <h2 className="lg:text-4xl md:text-4xl text-3xl font-bold text-white pt-2 lg:w-[400px]
           md:w-[400px]     mb-16 mx-auto">
              ¡Bienvenid@ de nuevo!
            </h2>
            <div className="pb-4">
                <Input
                    id="email"
                    label="Correo"
                    type="email"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>

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

            <div className=" pb-4">

            <Button 
                outline 
                label="Continuar con  Google"
                icon={FcGoogle}
                onClick={() => {}}
            
              />
            </div>
            <div className="pb-8"> 
            <Button 
              outline 
              label="Continuar con Facebook"
              icon={FaFacebook}
              onClick={() => {}}
          
            />
            </div>
        
          <Link href="/home" >
            <Button
              borderColor="border-custom-green"
              label="Iniciar sesión"
              outline
              big
              onClick={() => {}}

            />
          </Link>
          <h3 className="text-white text-sm lg:text-lg font-bold leading-normal pt-4">
            ¿No tienes una cuenta? 
            <span className="cursor-pointer hover:underline pl-4"> 
                <Link href="/signup" >
                    Regístrate 
                </Link>
            </span>
          </h3>

        </div>
      </div>
    </div>
  );
};

export default Login;
