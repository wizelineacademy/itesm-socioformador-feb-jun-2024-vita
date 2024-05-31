'use client'

import React, { useContext, useState } from 'react'
import axios from 'axios'
import FaceScale from '@/src/components/scales/FaceScale'
import ButtonEvaluation from '@/src/components/buttons/ButtonEvaluation.'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import AutoevaluationContext from '@/src/context/autoevaluation'
import { LbMsrInput } from '@/src/components/Inputs/LbMsrInput'
import { Autoevaluation } from '@/src/data/datatypes/autoeval'

const SleepFeatureEvalPage = () => {
  const [hours, setHours] = useState(0)
  const [grade, setGrade] = useState<number>(0)
  const { state, setState } = useContext(AutoevaluationContext)

  const router = useRouter()

  //verify if all questions have been asnswered
  const verifyData = (): boolean => {
    if (grade === 0 || hours === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Debes completar todas las preguntas',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return false
    }
    return true
  }

  //update state and move page
  const storeData = (): Autoevaluation | null => {
    if (!verifyData()) {
      return null
    }

    const newState = {
      ...state,
      featureMetrics: [
        {
          name: 'sleep_recommendations',
          value: grade,
        },
      ],
      records: [
        {
          name: 'sleep_hours',
          value: hours,
          category: 'sleep',
        },
      ],
    }

    setState(newState)

    return newState
  }

  const sendData = async () => {
    const evalData = storeData()

    if (evalData) {
      try {
        if (
          evalData.goalMetrics.length === 0 ||
          evalData.featureMetrics.length === 0 ||
          evalData.records.length === 0
        ) {
          throw Error('Incomplete data')
        }

        await axios.post('/api/goal_evaluations', {
          evaluations: evalData.goalMetrics,
        })
        await axios.post('/api/feature_evaluations', {
          evaluations: evalData.featureMetrics,
        })
        await axios.post('/api/records', {
          records: evalData.records,
        })

        Swal.fire({
          title: 'Éxito',
          text: 'Se han guardado las respuestas con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            setState({
              goalMetrics: [],
              featureMetrics: [],
              records: [],
            })
            router.push('/sleep')
          }
        })
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al enviar los datos',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    }
  }

  return (
    <div className='flex flex-col items-start justify-start gap-y-3 space-y-4 p-4 pt-10 text-white md:items-start'>
      <h2 className='mb-4 text-4xl font-bold md:text-5xl'>Autoevaluación</h2>

      <div className='align-center flex w-full flex-col gap-y-10'>
        <div className='flex w-full max-w-[1000px] flex-col gap-y-8'>
          <LbMsrInput
            color='bg-input-purple'
            label={'¿Cuántas horas duermes actualmente?'}
            variable={'horas'}
            min={0}
            max={12}
            measure={'Horas'}
            value={hours}
            setValue={setHours}
          />
        </div>

        <div className={`mb-5 flex w-full flex-col`}>
          <p className='mb-4 text-xl font-bold'>
            ¿Qué tan útiles te ha sido las recomendaciones de sueño?
          </p>
          <FaceScale
            quality={grade}
            setQuality={(value) => {
              setGrade(value)
            }}
          />
        </div>
      </div>

      <ButtonEvaluation
        onClick={sendData}
        text='Enviar'
        disabled={grade === 0 || hours === 0}
      />
    </div>
  )
}

export default SleepFeatureEvalPage
