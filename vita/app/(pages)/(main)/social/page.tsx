'use client';

import React, { useState, useEffect } from "react";
import { FaBed, FaRunning, FaBullseye } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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

  const generateRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    return suggestions[randomIndex];
  };

  const [randomSuggestion, setRandomSuggestion] = useState("");
  const [sleepHours, setSleepHours] = useState(7.3);

  const handleGenerateSuggestion = () => {
    const newRandomSuggestion = generateRandomSuggestion();
    setRandomSuggestion(newRandomSuggestion);
  };

  useEffect(() => {
    setRandomSuggestion(generateRandomSuggestion());
    
  }, []);

  return (
    <>
      <div className="flex px-5 py-4 text-5xl font-bold lg:justify-start md:justify-start justify-center">
        <h1 className="mr-2 text-white">Comunidad</h1>
        <FaBed size={36} color="white" />
      </div>
      
    </>
  );
};

export default Sleep;
