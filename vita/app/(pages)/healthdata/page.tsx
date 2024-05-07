
'use client';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from "react";
import Button from "@/components/buttons/Button";
import axios from  "axios"
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
import Select from '@/components/Inputs/Select';
import Input from '@/components/Inputs/Input';
import { useRouter } from "next/navigation";
import { HealthSchema } from '@/app/validations/HealthSchema';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * @description Pantalla de registro 
 * @author Bernardo de la Sierra
 * @version 1.0.1 
 * @returns {JSX.Element} Retorna un elemento JSX que representa el botón.
 */
const HealthData = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(HealthSchema),
    defaultValues: {
      sex: '',
      weight: '',
      height: '',
      bodyFat: '',
      muscularMass: '',
      birthDate: '',
      phoneNumber: '',
    },
  });


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/healthdata");
        const data = response.data;

        if(!data){ 
          return;
        } else {
          router.replace("/home")
        }

      } catch(error){
        console.log(error)
      }
    }

    getData();
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  
    setIsLoading(true); 

    try {
      const response = await axios.post("/api/healthdata", data);

      Swal.fire({
          title: 'Éxito',
          text: 'Se han guardado los datos con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
      });
      router.push("/home");
      router.refresh();
    } catch(error){
      console.error(error);
      Swal.fire({
          title: 'Error',
          text: "Ocurrió un error al guardar los datos",
          icon: 'error',
          confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false); 
    }
  };

  

  return (
    <div id="Background" className="min-h-screen bg-gradient-custom flex flex-col">

      <div id="Section" className="flex-1 flex flex-col lg:flex-row 
      md:flex-row justify-center items-center gap-10">

        <div id="Health-Section" className=" flex flex-col items-center md:px-10
        mt-4 lg:mt-0  ">
           <h2 className="text-4xl font-bold text-white pt-2 md:lg:w-[500px] w-[300px] mb-16">
              Ingresa tus datos de salud
            </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
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

        {errors.weight && typeof errors.weight.message === 'string' && (
              <span className="text-custom-red mb-5 block">{errors.weight.message}</span>
        )}
         {errors.height && typeof errors.height.message === 'string' && (
              <span className="text-custom-red mb-5 block">{errors.height.message}</span>
        )}

        <div className="sm:md:lg:flex flex-row  ">
            <div className="md:lg:mr-8 pb-8">
            <Select
              id="sex"
              label="Sexo*"
              options={[
           
                { value: "M", label: "Masculino" },
                { value: "F", label: "Femenino" },
              ]}
              register={register}
              errors={errors}
            />
            </div>

            <div className="pb-8">
                <Input
                  id="birthDate"
                  label="Fecha de nacimiento*"
                  type="date"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
            </div>
        </div>

        {errors.sex && typeof errors.sex.message === 'string' && (
              <span className="text-custom-red mb-5 block">{errors.sex.message}</span>
        )}

         {errors.birthDate && typeof errors.birthDate.message === 'string' && (
              <span className="text-custom-red mb-5 block">{errors.birthDate.message}</span>
        )}
        
        <div className="md:lg:flex flex-row  ">
            <div className="md:lg:mr-8 pb-8">
                <Input
                    id="bodyFat"
                    label="Grasa corporal(%)"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="pb-8">
                <Input
                    id="muscularMass"
                    label="Masa muscular(kg)"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
            </div>
        </div>

        {errors.bodyFat && typeof errors.bodyFat.message === 'string' && (
              <span className="text-custom-red mb-5 block">{errors.bodyFat.message}</span>
        )}

         {errors.muscularMass && typeof errors.muscularMass.message === 'string' && (
              <span className="text-custom-red mb-5 block">{errors.muscularMass.message}</span>
        )}

        <div className="pb-4">
            <Input
              id="phoneNumber"
              label="Teléfono"
              type="tel"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              big
            />
          </div>

          {errors.phoneNumber && typeof errors.phoneNumber.message === 'string' && (
              <span className="text-custom-red mb-5 block">{errors.phoneNumber.message}</span>
        )}
        
          <div className='items-center justify-center m-auto flex flex-col'>
              <h3 className=" text-custom-red text-xs lg:text-lg font-bold leading-normal pt-2 pb-4">
                * campo requerido
              </h3>
            
              <Button
                borderColor="border-custom-red"
                label="Continuar"
                outline
                big
                onClick={() => {}}
                type="submit"
              />
            </div>
        </form>
         

        </div>
      </div>
    </div>
  );
};

export default HealthData;
