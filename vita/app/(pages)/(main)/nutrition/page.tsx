"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * @author: Bernardo de la Sierra
 * @version 2.0.0 
 * Component representing the Nutrition Home page
 */
const Nutrition = () => {
  // Array containing objects with number and corresponding image source
  const numeros = [
    {
      number: 1,
      imageSrc: "/icons/Grape.svg"
    },
    {
        number: 2,
        imageSrc: "/icons/Carrot.svg"
    },
    {
      number: 3,
      imageSrc: "/icons/Soy.svg" 
    },
    {
      number: 4,
      imageSrc: "/icons/Meat.svg"
    },
    {
      number: 5,
      imageSrc: "/icons/Milk.svg"  
    },
    {
      number: 6,
      imageSrc: "/icons/Porridge.svg"
    },
    {
      number: 7,
      imageSrc: "/icons/Sugar.svg"  
    },
    {
      number: 8,
      imageSrc: "/icons/Avocado.svg"
    },
  ];
  
  return (
    <div className="mb-4">
      {/* Title */}
      <div className="flex text-white sm:px-5 sm:py-4  text-5xl sm:text-6xl font-bold 
        lg:justify-start md:justify-start sm:justify-center justify-start ">
        <h1 className=" pl-2 sm:pl-0 mr-2">Nutrición</h1>
        <Image src="/icons/Food.svg" alt="Food" width={45} height={45} />
      </div>

      {/* Subtitle */}
      <h2 className="flex items-center text-white px-5 py-4 sm:text-3xl  text-2xl
        lg:justify-start md:justify-start sm:justify-center justify-start">
        Mis porciones de hoy
      </h2>

      {/* Displaying portion numbers and corresponding images */}
      <div className='lg:justify-start md:justify-start justify-center items-center 
      flex flex-col'>
        <div className="flex flex-wrap bg-custom-lightpurple 
        px-5 rounded-3xl lg:w-[500px]  md:w-[360px] sm:w-[330px]  w-[160px] ml-4">
          {numeros.map((numero, index) => (
            <div key={index} className="flex flex-col items-center lg:mx-4 md:mx-2 sm:mx-6 mx-4 my-2 py-2">
              <h3 className="text-white lg:text-3xl md:text-3xl text-2xl">{numero.number}</h3>
              <Image src={numero.imageSrc} alt={`Imagen ${index}`} width={24} height={24} />
            </div>
          ))}
        </div>
 
        {/* Options for nutrition */}
        <div className="flex lg:flex-row  flex-col pt-4 pl-4 pr-4  ">
          <div className="lg:w-1/2 lg:mr-10 w-full ">

            {/* Custom option 1 */}
            <Link href="/nutrition/recipes" >
              <div className='bg-custom-purple3 lg:rounded-2xl md:rounded-2xl rounded-full  
              lg:w-[340px]  sm:w-[330px]  w-[240px] lg:px-6 px-4 py-4 flex justify-between transition-colors 
              duration-300 ease-in-out hover:bg-custom-purple4'>
                  <h3 className= 'pt-1 pl-2 text-white font-bold lg:text-3xl text-xl   lg:w-[240px] md:w-[240px]'>
                      Buscar opciones de comidas personalizadas
                  </h3>
                  <Image src="/icons/Filter.svg" alt="Imagen 2" width={45} height={45} className='pr-2'/>
              </div>
            </Link>

            {/* Custom option 2 */}
            <Link href="/nutrition/goals">
              <div className='bg-custom-purple3 lg:rounded-2xl  md:rounded-2xl rounded-full  
              lg:w-[320px]  w-[330px]px-4 lg:py-4  md:py-4 py-2 flex justify-between 
              lg:mt-[75px] mt-4 transition-colors duration-300 ease-in-out hover:bg-custom-purple4'>
                
                <h3 className='pt-1 pl-2 text-white font-bold lg:text-2xl text-xl  
                  lg:w-[140px] md:w-[140px] w-[280px] '>
                    Mi meta de nutrición
                </h3>
                <Image src="/Healthy.svg" alt="Imagen 2" width={45} height={45} className='pr-2'/>
              </div>
            </Link>
            
          </div>
          <div className="lg:w-1/2 w-full">
            {/* Custom option 3 */}
            <Link href="/nutrition/autoevaluacion">
            <div className="flex justify-between px-4 lg:py-2.5  md:py-2.5 py-2
             bg-custom-purple3 lg:rounded-2xl  md:rounded-2xl rounded-full lg:w-[340px] sm:w-[330px]  w-[240px] mt-4 
             lg:mt-0 transition-colors duration-300 ease-in-out hover:bg-custom-purple4">
              <h3 className='pt-1 pl-2 text-white font-bold lg:text-3xl text-xl w-[240px] '>
                  Autoevaluación
              </h3>
              <Image src="/icons/Pass.svg" alt="Imagen 2" width={45} height={45}  className='pr-2'/>
            </div>
            </Link>

            {/* Custom option 4 */}
            <Link href="/nutrition/portions">
            <div className="flex justify-between px-4 lg:py-2.5 md:py-2.5 py-2
            bg-custom-purple3 lg:rounded-2xl md:rounded-2xl rounded-full  lg:w-[340px] sm:w-[330px]  w-[240px] 
            mt-7 transition-colors duration-300 ease-in-out hover:bg-custom-purple4">
              <h3 className="pt-1 pl-2 text-white font-bold lg:text-3xl text-xl w-[240px] ">
                Mis porciones
              </h3>
              <Image src="/icons/Food.svg" alt="Imagen 2" width={45} height={45} className="pr-2" />
              </div>
          </Link>

            {/* Custom option 5 */}
            
              <div className="flex justify-between px-4 lg:py-2.5  md:py-2.5 py-2
              bg-custom-purple3 lg:rounded-2xl md:rounded-2xl rounded-full  lg:w-[340px] sm:w-[330px]  w-[240px] mt-7
              transition-colors duration-300 ease-in-out hover:bg-custom-purple4">
                <h3 className='pt-1 pl-2 text-white font-bold lg:text-3xl text-xl w-[240px] '>
                    Detección de calorías
                </h3>
                <Image src="/icons/Healthy.svg" alt="Imagen 2" width={45} height={45} className='pr-2'/>
              </div>
            
            {/* Custom option 6 */}
            <Link id="Enlace"  href="/nutrition/nutritional_plan" >
              <div className="flex justify-between px-4 lg:py-2.5  md:py-2.5 py-2
              bg-custom-purple3 lg:rounded-2xl md:rounded-2xl rounded-full lg:w-[340px] sm:w-[330px]  w-[240px] mt-7
              transition-colors duration-300 ease-in-out hover:bg-custom-purple4">
                <h3 className='pt-1 pl-2 text-white font-bold lg:text-3xl text-xl  w-[240px] '>
                    Generar un plan nutricional
                </h3>
                <Image src="/icons/ToDo.svg" alt="Imagen 2" width={45} height={45} className='pr-2' />
              </div>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Nutrition;
