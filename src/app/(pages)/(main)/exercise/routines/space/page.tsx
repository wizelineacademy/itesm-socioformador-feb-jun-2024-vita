'use client'

import ExercisesContext from '@/src/context/exercises'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { IconType } from 'react-icons'

import { FaDumbbell, FaHome, FaTree } from 'react-icons/fa'

import Swal from 'sweetalert2'

const TypeRoutine = () => {
  const spaces = ['En el gimnasio', 'En casa', 'Al aire libre']

  const icons: IconType[] = [FaDumbbell, FaHome, FaTree]

  const { state, setState } = useContext(ExercisesContext)

  const router = useRouter()

  const generatePrompt = (space: string) => {
    if (!space) {
      Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar un espacio',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return ''
    }

    const prompt = `Realizaré los ejercicios ${space}`

    const message = {
      role: 'user',
      content: prompt,
    }

    return message
  }

  const generateExercises = async (space: string) => {
    try {
      const message = generatePrompt(space)

      if (message === '') {
        return
      }

      const usageRecords = [
        {
          name: 'routine_space',
          detail: space,
        },
      ]
      await axios.post('/api/feature_usage', { usageRecords })

      Swal.fire({
        title: 'Cargando',
        text: 'Generando la rutina...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      const response = await axios.post('/api/routines/spaces', {
        message,
      })

      let data = response.data.content
      data = data.replaceAll('`', '')
      data = data.replace('json', '')

      const exercises = JSON.parse(data)

      setState({
        ...state,
        exercises,
      })

      router.push('/exercise/routines/list')
      Swal.close()
    } catch (error: any) {
      console.log(error)
      Swal.close()
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al generar la rutina. Inténtalo de nuevo',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <div className='ml-5 mr-5'>
      <h2 className={'mt-2 text-4xl font-semibold text-white md:mt-10'}>
        Rutinas
      </h2>
      <h3 className={'mt-5 text-xl text-white md:w-4/5 lg:w-3/5'}>
        Escoge dónde deseas realizar el ejercicio
      </h3>

      <div className='mb-10 mt-5 flex w-full flex-col justify-around md:flex-row md:flex-wrap md:items-stretch md:justify-center lg:mx-auto lg:w-2/3 lg:gap-x-8 lg:gap-y-3'>
        {spaces.map((space, index) => (
          <div
            key={space}
            onClick={async () => {
              await generateExercises(space)
            }}
            className={`mx-auto mt-5 flex w-11/12 max-w-[450px] items-center justify-between rounded-full bg-mid-green px-5 py-4 text-white transition-colors delay-75 ease-in hover:cursor-pointer hover:bg-dark-green md:w-2/5 md:flex-col md:items-start md:justify-center md:space-y-8 md:rounded-3xl md:py-10 lg:w-1/4 lg:min-w-[200px] lg:max-w-[400px] xl:h-64 xl:w-1/3`}
          >
            {React.createElement(icons[index], {
              className: 'ml-[5%] w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20',
            })}
            <p className='mr-2 text-lg font-semibold md:text-xl lg:ml-2'>
              {space}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TypeRoutine
