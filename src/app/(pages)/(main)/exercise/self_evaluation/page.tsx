'use client'

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import FaceScale from '@/src/components/scales/FaceScale'
import ButtonEvaluation from '@/src/components/buttons/ButtonEvaluation.'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import AutoevaluationContext from '@/src/context/autoevaluation'
import { exerciseGoals } from '@/src/data/exercise_goals'
import { isNumericGoal } from '@/src/data/datatypes/goal'

const ExerciseEvalPage = () => {
  const [progress, setProgress] = useState(0)
  const [routineAdherence, setRoutineAdherence] = useState(0)
  const [goal, setGoal] = useState({ name: '', idGoal: 0 })
  const [goalId, setGoalId] = useState(0) //goal id based on the different available goals, it is not the idGoal stored in the db
  const [hasDetail, setHasDetail] = useState(false)
  const { state, setState } = useContext(AutoevaluationContext)

  const router = useRouter()

  //set goal id and if extra information is necessary
  const setGoalDetails = (name: string) => {
    const selectedGoal = exerciseGoals.find((goal) => {
      return goal.title === name
    })
    setGoalId(selectedGoal?.id ?? 0)
    setHasDetail(isNumericGoal(selectedGoal!))
  }

  //verify if all questions have been asnswered
  const verifyData = (): boolean => {
    if (progress === 0 || routineAdherence === 0) {
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
          name: 'routine_adherence',
          value: routineAdherence,
          idGoal: goal.idGoal,
        },
      ],
    })

    if (hasDetail) {
      router.push(`/exercise/self_evaluation/goals/${goalId}`)
    } else {
      router.push('/exercise/self_evaluation/feature_evaluation')
    }
  }

  //fetch goal
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get('/api/goals/exercise')
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
            router.push('/exercise')
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
      <p className='mt-5 w-full max-w-[500px] rounded-2xl bg-input-green py-3 pl-4 text-lg'>
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
            ¿Qué tan bien estás siguiendo tu rutina?
          </p>
          <FaceScale
            quality={routineAdherence}
            setQuality={(value) => {
              setRoutineAdherence(value)
            }}
          />
        </div>
      </div>

      <ButtonEvaluation
        disabled={!goal || progress === 0 || routineAdherence === 0}
        onClick={movePage}
        text='Continuar'
      />
    </div>
  )
}

export default ExerciseEvalPage
