'use client'

import React, { useState, useEffect } from 'react'
import { FaRunning, FaBullseye, FaDumbbell } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

const Exercise = () => {
  // Define an array of suggestions
  const suggestions = [
    'Haz burpees para un rápido impulso de energía',
    'Prueba tabatas para quemar calorías en minutos',
    'Eleva pesas para tonificar en poco tiempo',
    'Corre en intervalos cortos para mejorar tu resistencia',
    'Practica flexiones para fortalecer tu pecho y brazos',
    'Realiza planchas para un núcleo más fuerte',
    'Salta la cuerda para un entrenamiento cardiovascular rápido',
    'Haz estocadas para trabajar piernas y glúteos',
    'Practica saltos de tijera para mejorar la agilidad',
    'Completa series de abdominales para un núcleo tonificado',
  ]

  // Function to generate a random suggestion
  const generateRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * suggestions.length)
    return suggestions[randomIndex]
  }

  // State to hold the current random suggestion
  const [randomSuggestion, setRandomSuggestion] = useState<string>('')

  // Function to generate a new random suggestion
  const handleGenerateSuggestion = () => {
    const newRandomSuggestion = generateRandomSuggestion()
    setRandomSuggestion(newRandomSuggestion)
  }

  // useEffect hook to generate a random suggestion when the component mounts
  useEffect(() => {
    setRandomSuggestion(generateRandomSuggestion())
  }, [])

  return (
    <>
      <div className='flex justify-center px-5 py-4 text-5xl font-bold md:justify-start lg:justify-start'>
        <h1 className='mr-2 text-white'>Ejercicios </h1>
        <FaRunning size={36} color='white' />
      </div>
      <span className='lg:mt-20'>
        <div className='flex flex-col items-center justify-center gap-x-6 lg:flex-row'>
          <div className='flex flex-col'>
            <Link href='/exercise/routines'>
              <div className='mt-4 flex w-[240px] cursor-pointer flex-row items-center justify-center rounded-3xl bg-mid-green px-8 py-6 transition-colors duration-300 ease-in-out hover:bg-dark-green sm:w-[330px] md:w-80 md:flex-col md:py-8 lg:w-[340px]'>
                <p className='mb-4 w-[240] pl-0 text-2xl font-bold text-white md:px-6 lg:text-3xl'>
                  Crea tu rutina
                  <span className='hidden md:flex'> personalizada </span>
                </p>
                <FaRunning size={80} color='white' className='hidden md:flex' />
              </div>
            </Link>
            <Link
              href='/exercise/self_evaluation'
              className='mt-4 flex w-[240px] cursor-pointer items-center justify-center rounded-3xl bg-mid-green px-8 py-6 transition-colors duration-300 ease-in-out hover:bg-dark-green sm:w-[330px] md:py-12 lg:w-[340px]'
            >
              <h3 className='w-[240px] pt-1 text-2xl font-bold text-white md:pl-4 lg:text-3xl'>
                Autoevaluación
              </h3>
              <Image
                src='/icons/Pass.svg'
                alt='Imagen 2'
                width={60}
                height={60}
                className='hidden pr-2 md:flex'
              />
            </Link>
          </div>
          <div className='flex flex-col'>
            <Link
              href={'/exercise/goals'}
              className='z-10 mt-4 flex w-[240px] cursor-pointer items-center justify-center rounded-3xl bg-mid-green px-8 py-6 transition-colors duration-300 ease-in-out hover:bg-dark-green sm:w-[330px] md:py-6 lg:mt-8 lg:w-[340px]'
            >
              <h3 className='w-[240px] pt-1 text-2xl font-bold text-white lg:text-3xl'>
                Mi meta de ejercicio
              </h3>
              <FaBullseye size={60} className='pr-2' color='white' />
            </Link>

            <div className='z-10 mt-4 flex w-[240px] flex-col items-center justify-center gap-y-3 rounded-3xl bg-mid-green px-8 py-6 transition-colors duration-300 ease-in-out sm:w-[330px] md:py-6 lg:w-[340px]'>
              <h3 className='w-[240px] pl-8 pt-1 text-2xl font-bold text-white lg:pl-2 lg:text-3xl'>
                Recomendación del día
              </h3>
              <FaDumbbell size={60} className='pr-2' color='white' />
              <h4 className='w-[240px] pl-8 pt-1 text-lg text-white lg:pl-2 lg:text-2xl'>
                {randomSuggestion}
              </h4>
            </div>
          </div>
        </div>
      </span>
    </>
  )
}

export default Exercise
