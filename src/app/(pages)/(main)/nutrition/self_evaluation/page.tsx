'use client'

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import FaceScale from '@/src/components/scales/FaceScale'
import ButtonEvaluation from '@/src/components/buttons/ButtonEvaluation.'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { nutritionGoals } from '@/src/data/nutrition_goals'
import AutoevaluationContext from '@/src/context/autoevaluation'

const SelfEvaluationPage = () => {
  const [progress, setProgress] = useState(0)
  const [planAdherence, setPlanAdherence] = useState(0)
  const [goal, setGoal] = useState({ name: '', idGoal: 0 })
  const [goalId, setGoalId] = useState(0)
  const [hasDetail, setHasDetail] = useState(false)
  const { state, setState } = useContext(AutoevaluationContext)

  const router = useRouter()

  //set goal id and if extra information is necessary
  const setGoalDetails = (name: string) => {
    const selectedGoal = nutritionGoals.find((goal) => {
      return goal.title === name
    })
    setGoalId(selectedGoal?.id ?? 0)
    setHasDetail(selectedGoal?.variable ? true : false)
  }

  //verify if all questions have been asnswered
  const verifyData = (): boolean => {
    if (progress === 0 || planAdherence === 0) {
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
          name: 'plan_adherence',
          value: planAdherence,
          idGoal: goal.idGoal,
        },
      ],
    })

    if (hasDetail) {
      router.push(`/nutrition/self_evaluation/goals/${goalId}`)
    } else {
      router.push('/nutrition/self_evaluation/feature_evaluation')
    }
  }

  //fetch goal
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get('/api/goals/nutrition')
        const data = response.data

        setGoal(data)
        setGoalDetails(data.name)
      } catch (error) {
        Swal.fire({
          title: 'Recuerda',
          text: 'Debes elegir una meta antes de realizar una evaluación',
          icon: 'info',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/nutrition')
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
      <p className='mt-5 w-full max-w-[500px] rounded-2xl bg-custom-lightpurple py-3 pl-4 text-lg'>
        {goal.name}
      </p>

      <div className='align-center flex w-full flex-col gap-y-10'>
        <div className='flex w-full flex-col'>
          <p className='mb-4 text-xl font-bold'>
            ¿Qué tanto progreso has tenido en tu meta?
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
            ¿Qué tan bien estás siguiendo tu plan de nutrición?
          </p>
          <FaceScale
            quality={planAdherence}
            setQuality={(value) => {
              setPlanAdherence(value)
            }}
          />
        </div>
      </div>

      <ButtonEvaluation
        disabled={!goal || progress === 0 || planAdherence === 0}
        onClick={movePage}
        text='Continuar'
      />
    </div>
  )
}

export default SelfEvaluationPage
