'use client'

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import FaceScale from '@/src/components/scales/FaceScale'
import ButtonEvaluation from '@/src/components/buttons/ButtonEvaluation.'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import AutoevaluationContext from '@/src/context/autoevaluation'

const SleepSelfEvaluationPage = () => {
  const [progress, setProgress] = useState(0)
  const [improvement, setImprovement] = useState(0)
  const [goal, setGoal] = useState({ name: '', idGoal: 0 })
  const { state, setState } = useContext(AutoevaluationContext)

  const router = useRouter()

  //verify if all questions have been asnswered
  const verifyData = (): boolean => {
    if (progress === 0 || improvement === 0) {
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
  const movePage = () => {
    if (!verifyData()) {
      return
    }

    setState({
      ...state,
      goalMetrics: [
        {
          name: 'goal_progress',
          value: progress,
          idGoal: goal.idGoal,
        },
        {
          name: 'sleep_improvement',
          value: improvement,
          idGoal: goal.idGoal,
        },
      ],
    })

    router.push('/sleep/self_evaluation/feature_evaluation')
  }

  //fetch goal
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get('/api/goals/sleep')
        const data = response.data

        setGoal(data)
      } catch (error) {
        Swal.fire({
          title: 'Recuerda',
          text: 'Debes elegir una meta antes de realizar una evaluación',
          icon: 'info',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/sleep')
          }
        })
        console.log(error)
      }
    }

    fetchGoal()
  }, [])

  return (
    <div className='flex flex-col items-start justify-start gap-y-3 space-y-4 p-4 pt-10 text-white md:items-start'>
      <h2 className='mb-4 text-4xl font-bold md:text-5xl'>Autoevaluación</h2>

      <h3 className='text-2xl font-bold'>Meta actual</h3>
      <p className='mt-5 w-full max-w-[500px] rounded-2xl bg-input-purple py-3 pl-4 text-lg'>
        {goal.name}
      </p>

      <div className='align-center flex w-full flex-col gap-y-10'>
        <div className='flex w-full flex-col'>
          <p className='mb-4 text-xl font-bold'>
            ¿Qué tanto progreso has tenido en tu calidad de sueño?
          </p>
          <FaceScale
            quality={progress}
            setQuality={(progress) => {
              setProgress(progress)
            }}
          />
        </div>

        <div className='mb-5 flex w-full flex-col'>
          <p className='mb-4 text-xl font-bold'>
            ¿Qué tanto progreso has tenido en la cantidad de sueño que deseas
            dormir?
          </p>
          <FaceScale
            quality={improvement}
            setQuality={(value) => {
              setImprovement(value)
            }}
          />
        </div>
      </div>

      <ButtonEvaluation
        disabled={!goal || progress === 0 || improvement === 0}
        onClick={movePage}
        text='Continuar'
      />
    </div>
  )
}

export default SleepSelfEvaluationPage
