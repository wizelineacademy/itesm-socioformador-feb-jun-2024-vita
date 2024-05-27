'use client';

import React, { useState, useEffect } from "react";
import { FaBed, FaRunning, FaBullseye } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { GiNightSleep } from "react-icons/gi";
import axios from "axios";


const Sleep = () => {

  const suggestions = [
    "Mantén un horario de sueño constante.",
        "Practica un ritual de relajación antes de dormir.",
        "Si tienes problemas para dormir, evita las siestas, especialmente por la tarde.",
        "Ejercítate diariamente.",
        "Evalúa tu habitación para asegurar una temperatura ideal.",
        "Duerme en un colchón y almohadas cómodos.",
        "Utiliza luz brillante para ayudar a manejar tus ritmos circadianos.",
        "Evita el alcohol, los cigarrillos y comidas pesadas por la noche.",
        "Relaja tu mente antes de dormir leyendo o practicando ejercicios de relajación.",
        "Apaga los dispositivos electrónicos al menos 30 minutos antes de ir a la cama."
  ];

  const [randomSuggestion, setRandomSuggestion] = useState("");
  const [sleepHours, setSleepHours] = useState(0);

  const generateRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    return suggestions[randomIndex];
  };

  const getLastRecord = async () => {
    try {
      const res = await axios.get("/api/records/sleep/last");
      const data = res.data;
      setSleepHours(data.value);
    } catch(error){
      console.log(error);
      setSleepHours(-1);
    }
  }

  useEffect(() => {
    setRandomSuggestion(generateRandomSuggestion());
    getLastRecord();
  }, []);

  return (
    <>
      <div className="flex px-5 py-4 text-5xl font-bold lg:justify-start md:justify-start justify-center">
        <h1 className="mr-2 text-white">Sueño</h1>
        <FaBed size={36} color="white" />
      </div>

      <span className="lg:mt-20">

        <div className="flex flex-col lg:flex-row items-center justify-center gap-x-6 mb-5">

          <div className="flex flex-col">

            <div className="bg-sleep-mid flex flex-row md:flex-col px-8 py-6 md:py-8 items-center justify-center md:w-80 lg:w-[340px] 
            sm:w-[330px] w-[240px] mt-4 rounded-3xl  ">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <CircularProgressbar
                    value={sleepHours >= 0 ? (sleepHours / 8) * 100 : 0}  
                    styles={buildStyles({
                      textSize: '16px',
                      pathColor: '#8EFCA6', // Color del camino de progreso
                      textColor: '#ffffff',
                      trailColor: 'transparent', // Hacer el color de abajo del fondo
                    })}
                  />
                  <div
                    className="absolute text-white text-center text-[28px]"
                  >
                    <div>{sleepHours >= 0 ? sleepHours.toFixed(0) : 0}</div>
                    <div className="text-[28px]">horas</div>
                  </div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center px-8 py-6 md:py-6 bg-sleep-high 
              rounded-3xl lg:w-[340px] sm:w-[330px] w-[240px] mt-4 transition-colors duration-300 
              ease-in-out gap-y-3 z-10 cursor-pointer">
                <div className="flex flex-col">
                  <h3 className='pt-1 lg:pl-2 sm:pl-8 pl-4 pr-2 text-white font-bold lg:text-3xl text-2xl w-[240px]'>
                    Recomendación del día
                  </h3>
                </div>
                <h4 className='pt-1 lg:pl-2 sm:pl-8 pl-4 pr-2 text-white lg:text-2xl text-lg w-[240px]'>
                  {randomSuggestion}
                </h4>
              </div>
            
          </div>

          <div className="flex flex-col items-center">

            <Link href="/sleep/records" className="flex justify-center items-center px-8 py-6 md:py-12 bg-sleep-high rounded-3xl 
            lg:w-[340px] sm:w-[330px] w-[240px] mt-4 transition-colors duration-300 ease-in-out 
            hover:bg-sleep-low z-10 hover:cursor-pointer">
              <h3 className='pt-1 md:pl-4 text-white font-bold lg:text-2xl text-2xl w-[240px] md:w-[220px]'>
                Ingresar horas de sueño
              </h3>
              <GiNightSleep size={60} color="white" className='pr-2 hidden md:flex'/>
            </Link>

            <Link href="/sleep/self_evaluation" className="flex justify-center items-center px-8 py-6 md:py-12 bg-sleep-high rounded-3xl 
              lg:w-[340px] sm:w-[330px] w-[240px] mt-4 transition-colors duration-300 ease-in-out 
              hover:bg-sleep-low z-10 hover:cursor-pointer">
                <h3 className='pt-1 md:pl-4 text-white font-bold lg:text-3xl text-2xl w-[240px]'>
                  Autoevaluación
                </h3>
                <Image src="/icons/Pass.svg" alt="Imagen 2" width={60} height={60} className='pr-2 hidden md:flex' />
            </Link>

            <Link href="/sleep/goals/detail" className="flex justify-center items-center px-8 py-6 md:py-6
            bg-sleep-mid  rounded-3xl lg:w-[340px] sm:w-[330px] w-[240px] mt-4 lg:mt-8 transition-colors duration-300 ease-in-out
            hover:bg-sleep-low z-10 hover:cursor-pointer">
              <h3 className='pt-1 text-white font-bold lg:text-3xl text-2xl w-[240px]'>
                Mi meta de sueño
              </h3>
              <FaBullseye size={60} className='pr-2' color="white" />
            </Link>

          </div>
        </div>
      </span>
    </>
  );
};

export default Sleep;
