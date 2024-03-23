
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
import Input from "../components/Inputs/Input";
import Link from "next/link";
import Select from "../components/Inputs/Select";



/**
 * @description Pantalla de registro 
 * @author Bernardo de la Sierra
 * @version 1.0.1 
 * @returns {JSX.Element} Retorna un elemento JSX que representa el botón.
 */
const HealthData = () => {

  const [isLoading, setIsLoading] = useState(false);

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
      cellphone: '',
      password: ''
    },
  });

  return (
    <div id="Background" className="min-h-screen bg-gradient-custom flex flex-col">

      <div id="Section" className="flex-1 flex flex-col lg:flex-row 
      md:flex-row justify-center items-center gap-10">

        <div id="Health-Section" className=" flex flex-col items-center md:px-10
        mt-4 lg:mt-0  ">
           <h2 className="text-4xl font-bold text-white pt-2 md:lg:w-[500px] w-[300px] mb-16">
          Ingresa tus datos de salud
            </h2>

          
          <div className="md:lg:flex flex-row  ">
            <div className="md:lg:mr-8 pb-8">
                <Input
                    id="weight"
                    label="Peso(kg)* "
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>

            <div className="pb-8">
                <Input
                    id="height"
                    label="Altura(m)*"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        </div>

        <div className="sm:md:lg:flex flex-row  ">
            <div className="md:lg:mr-8 pb-8">
            <Select
              id="gender"
              label="Sexo*"
              options={[
           
                { value: "male", label: "Masculino" },
                { value: "female", label: "Femenino" },
              ]}
              register={register}
              errors={errors}
            />
            </div>

            <div className="pb-8">
                <Input
                  id="date"
                  label="Fecha de nacimiento*"
                  type="date"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
            </div>
        </div>
        <div className="md:lg:flex flex-row  ">
            <div className="md:lg:mr-8 pb-8">
                <Input
                    id="Corporal"
                    label="Grasa corporal(%)"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="pb-8">
                <Input
                    id="muscular"
                    label="Masa muscular(kg)"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
        
        <h3 className="text-custom-red text-xs lg:text-lg font-bold leading-normal pt-2 pb-4">
            * campo requerido
        </h3>
        <Link href="/home" >
            <Button
              borderColor="border-custom-red"
              label="Continuar"
              outline
              big
              onClick={() => {}}
              
            />
        </Link>

         

        </div>
      </div>
    </div>
  );
};

export default HealthData;
