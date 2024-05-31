'use client'

import { LbMsrInput } from '@/src/components/Inputs/LbMsrInput'
import MainButton from '@/src/components/buttons/MainButton'
import FaceScale from '@/src/components/scales/FaceScale'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'

const SleepGoalsDetailPage = () => {
  const [quality, setQuality] = useState<number>(0)
  const [previous, setPrevious] = useState<number>(0)
  const [next, setNext] = useState<number>(0)

  const router = useRouter()

  //veify that the data has been set
  const validateGoal = (): boolean => {
    if (!next || !previous || quality === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Debes ingresar el valor actual y el deseado',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return false
    }

    return true
  }

  //POST goal
  const createGoal = async () => {
    try {
      const valid = validateGoal()
      if (!valid) {
        return
      }

      await axios.post('/api/goals/sleep/hours', {
        name: 'Mejorar mis horas de sueño',
        category: 'sleep',
        variable: 'Horas de sueño',
        currentValue: previous,
        desiredValue: next,
      })

      await axios.post('/api/goals/sleep/quality', {
        name: 'Mejorar mi calidad de sueño',
        category: 'sleep',
        variable: 'Calidad de sueño',
        desiredValue: quality,
      })

      Swal.fire({
        title: 'Meta agregada',
        text: 'Se agregó la meta con éxito',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/sleep/goals')
        }
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al agregar la meta',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <div className='flex flex-col items-start justify-start space-y-4 p-4 text-white md:items-start md:pt-10'>
      <h2 className='mb-4 text-5xl font-bold'>Mi Meta</h2>

      <>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            createGoal()
          }}
          className='flex w-full max-w-[1000px] flex-col gap-y-8'
        >
          <LbMsrInput
            color='bg-input-purple'
            label={`¿Cuántas horas duermes actualmente?`}
            variable={'Horas de sueño'}
            min={0}
            max={12}
            measure={'horas'}
            value={previous}
            setValue={setPrevious}
          />

          <LbMsrInput
            color='bg-input-purple'
            label={`¿Cuántas horas te gustaría dormir?`}
            variable={'Horas de sueño'}
            min={0}
            max={12}
            measure={'horas'}
            value={next}
            setValue={setNext}
          />

          <div className='w-full'>
            <p className='mb-4 text-xl font-bold'>¿Cómo te despiertas?</p>
            <FaceScale
              quality={quality}
              setQuality={(quality) => {
                setQuality(quality)
              }}
            />
          </div>

          <MainButton onClick={() => {}} text='Guardar meta' />
        </form>
      </>
    </div>
  )
}

export default SleepGoalsDetailPage
