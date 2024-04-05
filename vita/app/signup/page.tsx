'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from 'react-icons/fa'; 
import swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { RegisterSchema } from "@/app/validations/RegisterSchema";
import Information from "@/app/components/information/Information";
import Input from "@/app/components/Inputs/Input";


const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    resolver: zodResolver(RegisterSchema), // Usa zodResolver con el esquema RegisterSchema
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    
    axios.post('/api/register', data)
      .then(() => {
        console.log("Registration successful!"); 
        router.push('/healthdata');
      })
      .catch((error) => {
        console.error("Registration error:", error); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div id="Background" className="min-h-screen bg-gradient-custom flex flex-col">
      <div id="Section" className="flex-1 flex flex-col lg:flex-row md:flex-row justify-center items-center">
        <div id="Section-Information" className="lg:w-3/8  flex flex-col lg:items-start md:items-start sm:items-center md:px-10 lg:px-20 items-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white pt-2 lg:w-[300px] md:w-[300px] sm:w-[300px] w-[300px]">
            ¡No lo dudes más y haz tu cuenta ahora mismo!
          </h2>
          <span> 
            <Information />
          </span>
        </div>
        
        <form 
          id="SignUp-Section" 
          className="flex flex-col items-center md:px-10 mt-4 lg:mt-0"
          onSubmit={handleSubmit(onSubmit)}>
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

          {errors.name && typeof errors.name.message === 'string' && (
              <span className="text-red-500">{errors.name.message}</span>
          )}

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
          
          {errors.email && typeof errors.email.message === 'string' && (
              <span className="text-red-500">{errors.email.message}</span>
          )}


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
                id="confirmPassword"
                label="Confirmar contraseña"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>

          </div>

          {errors.password && typeof errors.password.message === 'string' && (
              <span className="text-red-500">{errors.password.message}</span>
          )}

          {errors.confirmPassword && typeof errors.confirmPassword.message === 'string' && (
            <span className="text-red-500">{errors.confirmPassword.message}</span>
          )}

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
         
          <Button
            type="submit"
            borderColor="border-custom-green"
            label="Regístrate"
            outline
            big
          />
      
          <h3 className="text-white text-sm lg:text-lg font-bold leading-normal pt-4 ">
            ¿Ya tienes una cuenta?
            <span className="cursor-pointer hover:underline pl-4"> 
              <Link href="/login" >
                Iniciar Sesión
              </Link>
            </span>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
