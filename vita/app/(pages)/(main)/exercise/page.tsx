
'use client';

import React, { useState, useEffect } from "react";
import { FaRunning, FaBullseye,  FaDumbbell} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Exercise = () => {
     // Define an array of suggestions
  const suggestions = [
    "Haz burpees para un rápido impulso de energía",
    "Prueba tabatas para quemar calorías en minutos",
    "Eleva pesas para tonificar en poco tiempo",
    "Corre en intervalos cortos para mejorar tu resistencia",
    "Practica flexiones para fortalecer tu pecho y brazos",
    "Realiza planchas para un núcleo más fuerte",
    "Salta la cuerda para un entrenamiento cardiovascular rápido",
    "Haz estocadas para trabajar piernas y glúteos",
    "Practica saltos de tijera para mejorar la agilidad",
    "Completa series de abdominales para un núcleo tonificado",
  ];

  // Function to generate a random suggestion
  const generateRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    return suggestions[randomIndex];
  };

  // State to hold the current random suggestion
  const [randomSuggestion, setRandomSuggestion] = useState(generateRandomSuggestion());

  // Function to generate a new random suggestion
  const handleGenerateSuggestion = () => {
    const newRandomSuggestion = generateRandomSuggestion();
    setRandomSuggestion(newRandomSuggestion);
  };

  // useEffect hook to generate a random suggestion when the component mounts
  useEffect(() => {
    setRandomSuggestion(generateRandomSuggestion());
  }, []);

  return (
    <>
       <div className="flex   px-5 py-4 text-5xl font-bold 
        lg:justify-start md:justify-start justify-center">
        <h1 className="mr-2 text-white ">Ejercicios  </h1>
        <FaRunning  size={36}  color="white"/>
      </div>
      <span className="lg:mt-28"> 
        <div className="flex  flex-col lg:flex-row items-center justify-center gap-x-6   ">
                <div className="flex flex-col ">
                    <Link href="/exercise/routines" >
                        <div className="bg-mid-green flex  flex-row md:flex-col px-8 py-6 md:py-8 items-center 
                        justify-center md:w-80 lg:w-[340px] sm:w-[330px]  w-[240px]  mt-4  rounded-3xl
                        transition-colors duration-300 ease-in-out hover:bg-dark-green">
                            <p className="text-white font-bold lg:text-3xl text-2xl mb-4 md:px-6  w-[240] pl-0">
                                Crea tu rutina 
                                <span className="hidden md:flex"> personalizada </span>
                            </p>
                            <FaRunning size={80} color="white"  className="hidden md:flex" />
                        </div>
                    </Link>
                    <div className="flex justify-center items-center px-8   py-6 md:py-12
                    bg-mid-green  rounded-3xl lg:w-[340px] sm:w-[330px]  w-[240px] mt-4 
                    transition-colors duration-300 ease-in-out hover:bg-dark-green">
                        <h3 className='pt-1 pl-4 text-white font-bold lg:text-3xl text-2xl w-[240px] '>
                            Autoevaluación
                        </h3>
                        <Image src="/Pass.svg" alt="Imagen 2" width={60} height={60}  className='pr-2 hidden md:flex'/>
                    </div>
                </div>
                <div className="flex flex-col ">
                    <div className="flex justify-center items-center px-8   py-6 md:py-6
                    bg-mid-green  rounded-3xl lg:w-[340px] sm:w-[330px]  w-[240px] mt-4 lg:mt-8 
                transition-colors duration-300 ease-in-out hover:bg-dark-green z-10">
                        <h3 className='pt-1  text-white font-bold lg:text-3xl text-2xl w-[240px] '>
                            Mi meta de ejercicio
                        </h3>
                        < FaBullseye size={60} className='pr-2' color="white"/> 
                      
                    </div>

                    <div className="flex flex-col justify-center items-center px-8   py-6 md:py-6
                    bg-mid-green  rounded-3xl lg:w-[340px] sm:w-[330px]  w-[240px] mt-4 
                    transition-colors duration-300 ease-in-out hover:bg-dark-green gap-y-3 z-10">
                        <h3 className='pt-1 lg:pl-2 pl-8 text-white font-bold lg:text-3xl  text-2xl w-[240px] '>
                            Recomendación del día 
                        </h3>
                        < FaDumbbell size={60} className='pr-2' color="white"/> 
                        <h4 className='pt-1 lg:pl-2 pl-8 text-white lg:text-2xl  text-lg w-[240px] '>
                            {randomSuggestion}
                        </h4>
                    </div>

                </div>
        </div>
     </span>
    </>
  );
};

export default Exercise;
