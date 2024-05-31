'use client'

import React, { useState, useEffect } from 'react'
import { FaBed, FaBullseye } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { GiNightSleep } from 'react-icons/gi'
import axios from 'axios'

const Sleep = () => {
  const suggestions = [
    'Mantén un horario de sueño constante.',
    'Practica un ritual de relajación antes de dormir.',
    'Si tienes problemas para dormir, evita las siestas, especialmente por la tarde.',
    'Ejercítate diariamente.',
    'Evalúa tu habitación para asegurar una temperatura ideal.',
    'Duerme en un colchón y almohadas cómodos.',
    'Utiliza luz brillante para ayudar a manejar tus ritmos circadianos.',
    'Evita el alcohol, los cigarrillos y comidas pesadas por la noche.',
    'Relaja tu mente antes de dormir leyendo o practicando ejercicios de relajación.',
    'Apaga los dispositivos electrónicos al menos 30 minutos antes de ir a la cama.',
  ]

  const [randomSuggestion, setRandomSuggestion] = useState('')
  const [sleepHours, setSleepHours] = useState(0)

  const generateRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * suggestions.length)
    return suggestions[randomIndex]
  }

  const getLastRecord = async () => {
    try {
      const res = await axios.get('/api/records/sleep/last')
      const data = res.data
      setSleepHours(data.value)
    } catch (error) {
      console.log(error)
      setSleepHours(-1)
    }
  }

  useEffect(() => {
    setRandomSuggestion(generateRandomSuggestion())
    getLastRecord()
  }, [])

  return (
    <>
      <div className='flex justify-center px-5 py-4 text-5xl font-bold md:justify-start lg:justify-start'>
        <h1 className='mr-2 text-white'>Sueño</h1>
        <FaBed size={36} color='white' />
      </div>

      <span className='lg:mt-20'>
        <div className='mb-5 flex flex-col items-center justify-center gap-x-6 lg:flex-row'>
          <div className='flex flex-col'>
            <div className='mt-4 flex w-[240px] flex-row items-center justify-center rounded-3xl bg-sleep-mid px-8 py-6 sm:w-[330px] md:w-80 md:flex-col md:py-8 lg:w-[340px]'>
              <div className='relative flex h-40 w-40 items-center justify-center'>
                <CircularProgressbar
                  value={sleepHours >= 0 ? (sleepHours / 8) * 100 : 0}
                  styles={buildStyles({
                    textSize: '16px',
                    pathColor: '#8EFCA6', // Color del camino de progreso
                    textColor: '#ffffff',
                    trailColor: 'transparent', // Hacer el color de abajo del fondo
                  })}
                />
                <div className='absolute text-center text-[28px] text-white'>
                  <div>{sleepHours >= 0 ? sleepHours.toFixed(0) : 0}</div>
                  <div className='text-[28px]'>horas</div>
                </div>
              </div>
            </div>

            <div className='z-10 mt-4 flex w-[240px] cursor-pointer flex-col items-center justify-center gap-y-3 rounded-3xl bg-sleep-high px-8 py-6 transition-colors duration-300 ease-in-out sm:w-[330px] md:py-6 lg:w-[340px]'>
              <div className='flex flex-col'>
                <h3 className='w-[240px] pl-4 pr-2 pt-1 text-2xl font-bold text-white sm:pl-8 lg:pl-2 lg:text-3xl'>
                  Recomendación del día
                </h3>
              </div>
              <h4 className='w-[240px] pl-4 pr-2 pt-1 text-lg text-white sm:pl-8 lg:pl-2 lg:text-2xl'>
                {randomSuggestion}
              </h4>
            </div>
          </div>

          <div className='flex flex-col items-center'>
            <Link
              href='/sleep/records'
              className='z-10 mt-4 flex w-[240px] items-center justify-center rounded-3xl bg-sleep-high px-8 py-6 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-sleep-low sm:w-[330px] md:py-12 lg:w-[340px]'
            >
              <h3 className='w-[240px] pt-1 text-2xl font-bold text-white md:w-[220px] md:pl-4 lg:text-2xl'>
                Ingresar horas de sueño
              </h3>
              <GiNightSleep
                size={60}
                color='white'
                className='hidden pr-2 md:flex'
              />
            </Link>

            <Link
              href='/sleep/self_evaluation'
              className='z-10 mt-4 flex w-[240px] items-center justify-center rounded-3xl bg-sleep-high px-8 py-6 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-sleep-low sm:w-[330px] md:py-12 lg:w-[340px]'
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

            <Link
              href='/sleep/goals/detail'
              className='z-10 mt-4 flex w-[240px] items-center justify-center rounded-3xl bg-sleep-mid px-8 py-6 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-sleep-low sm:w-[330px] md:py-6 lg:mt-8 lg:w-[340px]'
            >
              <h3 className='w-[240px] pt-1 text-2xl font-bold text-white lg:text-3xl'>
                Mi meta de sueño
              </h3>
              <FaBullseye size={60} className='pr-2' color='white' />
            </Link>
          </div>
        </div>
      </span>
    </>
  )
}

export default Sleep
