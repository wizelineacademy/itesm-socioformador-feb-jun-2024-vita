import React from 'react';
import Image from 'next/image';
import { FaUtensils, FaHome, FaPoll } from 'react-icons/fa';
import { BiFilter, BiChevronRight } from 'react-icons/bi';

const numeros = [
  {
      number: 1,
      icon: FaHome  
  },
  {
      number: 2,
      icon: FaUtensils
  },
  {
    number: 3,
    icon: FaHome  
  },
  {
      number: 4,
      icon: FaUtensils
  },
  {
    number: 5,
    icon: FaHome  
  },
  {
    number: 6,
    icon: FaUtensils
  },
  {
    number: 7,
    icon: FaHome  
  },
  {
    number: 8,
    icon: FaUtensils
  },
]

const Nutrition = () => {
  
  return (
    <div className="h-screen overflow-auto bg-nutrition-background flex flex-col relative m-0">
      {/* Solucion temporal para el problema de responsividad */}
      <div className="hidden md:block absolute right-0">
        <Image src="/DE_Nutrition.svg" alt="Imagen 1" width={200} height={160} />
      </div>
      <div className="hidden md:block lg:hidden absolute right-0">
        <Image src="/DE_Nutrition2.svg" alt="Imagen 2" width={160} height={120} />
      </div>

      <div className="hidden lg:block absolute right-0 ">
        <Image src="/DE_Nutrition.svg" alt="Imagen 1" width={480} height={320} />
      </div>
      <div className="hidden lg:block absolute right-0">
        <Image src="/DE_Nutrition2.svg" alt="Imagen 2" width={440} height={280} />
      </div>
      

      <div className="flex items-center text-white px-5 py-4 text-5xl font-bold">
        <h1 className="mr-2">Nutrición</h1>
        <FaUtensils />
      </div>

      <h2 className="flex items-center text-white px-5 py-4 text-3xl ">
        Mis porciones de hoy
      </h2>

      <div className="flex flex-wrap bg-custom-lightpurple justify-center 
      px-5 rounded-3xl lg:w-[560px]  md:w-[340px] w-[360px] ml-4">
        {numeros.map((numero, index) => (
          <div key={index} className="flex flex-col items-center lg:mx-4  md:mx-4 mx-2 my-2 py-2">
            <h3 className="text-white lg:text-3xl md:text-3xl text-2xl ">{numero.number}</h3>
            {<numero.icon className="text-white  lg:text-3xl md:text-3xl text-2xl mt-2" />}
          </div>
        ))}
      </div>

      <div className="flex pt-4 pl-4 pr-4  ">
        <div className="w-1/2 ">

          <div className='bg-custom-purple2 rounded-2xl  w-[320px] px-4 py-4'>
            <h3 className='text-white lg:text-3xl md:text-2xl   w-[320px] '>
                Buscar Opciones de Comidas Personalizadas
            </h3>
            <div className="flex justify-between">
              
                <BiFilter className="text-white h-12 w-12 " />
               
                <BiChevronRight className="text-white h-12 w-12 " />
            </div>
          </div>

          <div className='bg-custom-purple2 rounded-2xl  w-[320px] px-4 py-4 flex justify-between mt-20'>
            <h3 className='text-white lg:text-3xl md:text-2xl   w-[140px] '>
                Mi Meta de nutrición
            </h3>
            <BiFilter className="text-white h-20 w-20 " />
          </div>

        </div>
        <div className="w-1/2 ">
          <div className="flex justify-between px-4 py-4 bg-custom-purple3 rounded-2xl   w-[420px] ">
            <h3 className='text-white lg:text-3xl md:text-2xl w-[240px] '>
                Autoevaluación
            </h3>
            <div className='flex' >
                  <FaPoll className="text-white h-12 w-12 " />
                  <BiChevronRight className="text-white h-12 w-12 " />
              </div>
          </div>

          <div className="flex justify-between px-4 py-4 bg-custom-purple2 rounded-2xl  
          w-[420px]  mt-4">
            <h3 className='text-white lg:text-3xl md:text-2xl w-[240px] '>
                Mis porciones
            </h3>
            <div className='flex' >
                  <FaUtensils  className="text-white h-12 w-12 " />
                  <BiChevronRight className="text-white h-12 w-12 " />
              </div>
          </div>


          <div className="flex justify-between px-4 py-4 bg-custom-purple2 rounded-2xl    w-[420px] mt-4">
            <h3 className='text-white lg:text-3xl md:text-2xl w-[240px] '>
                Detección de calorías
            </h3>
            <div className='flex' >
                  <FaUtensils  className="text-white h-12 w-12 " />
                  <BiChevronRight className="text-white h-12 w-12 " />
              </div>
          </div>

          <div className="flex justify-between px-4 py-4 bg-custom-purple3 rounded-2xl    w-[420px] mt-4">
            <h3 className='text-white lg:text-3xl md:text-2xl w-[240px] '>
                Generar un plan nutricional
            </h3>
            <div className='flex' >
                  <FaUtensils  className="text-white h-12 w-12 " />
                  <BiChevronRight className="text-white h-12 w-12 " />
              </div>
          </div>
          
        
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
