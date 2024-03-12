
'use client';

import React, { useState } from "react";
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
import Input from "../components/Input";
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

        <div id="SignUp-Section" className=" flex flex-col items-center md:px-10
        mt-4 lg:mt-0  ">
           <h2 className="text-4xl font-bold text-white pt-2 w-[400px] mb-16">
          ¡Bienvenid@ de nuevo!
            </h2>
       
            <div className="md:lg:mr-4 pb-4">
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

            <div className="pb-4">
                <Input
                    id="name"
                    label="Nombre"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
       
            <div className="md:lg:mr-4 pb-4">

           <Button 
              outline 
              label="Continue with Google"
              icon={FcGoogle}
              onClick={() => {}}
          
            />
            </div>
            <div className="pb-4"> 
            <Button 
              outline 
              label="Continue with Meta"
              icon={FaFacebook}
              onClick={() => {}}
          
            />
            </div>
        
          <Button
            borderColor="border-custom-green"
            label="Regístrate"
            outline
            small
            onClick={() => {}}
            
          />
          
          <h3 className="text-white text-sm lg:text-lg font-bold leading-normal pt-2">
            ¿No tienes una cuenta?
            <span className="cursor-pointer hover:underline"> 
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
