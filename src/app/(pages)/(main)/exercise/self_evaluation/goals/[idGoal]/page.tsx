'use client'

import { LbMsrInput } from '@/src/components/Inputs/LbMsrInput'
import MainButton from '@/src/components/buttons/MainButton'
import AutoevaluationContext from '@/src/context/autoevaluation'
import { GoalRecord } from '@/src/data/datatypes/GoalRecord'
import { NumericGoal } from '@/src/data/datatypes/goal'
import { exerciseGoals, exerciseQuestions } from '@/src/data/exercise_goals'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const ExerciseEvalGoalPage = ({ params }: { params: { idGoal: string } }) => {
  const [goal, setGoal] = useState<NumericGoal>()
  const [question, setQuestion] = useState<GoalRecord>()
  const [current, setCurrent] = useState<number>(0)
  const { state, setState } = useContext(AutoevaluationContext)

  const router = useRouter()

  const fetchHealthData = async (goal: NumericGoal) => {
    const data = await axios.get('/api/healthdata')
    setCurrent(goal?.data ? data.data[goal.data] : 0)
  }

  useEffect(() => {
    const selectedGoal = exerciseGoals.find((goal) => {
      return goal.id === Number(params.idGoal)
    })
    const selectedQuestion = exerciseQuestions.find(
      (question) => question.id === Number(params.idGoal),
    )
    setGoal(selectedGoal ?? exerciseGoals[0])
    setQuestion(selectedQuestion ?? exerciseQuestions[0])
    fetchHealthData(selectedGoal ?? exerciseGoals[0])
  }, [])

  //verify if all questions have been asnswered
  const verifyData = (): boolean => {
    if (current === 0) {
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
      records: [
        {
          name: goal?.variable ?? 'record',
          value: current,
          category: 'exercise',
        },
      ],
    })

    router.push('/exercise/self_evaluation/feature_evaluation')
  }

  return (
    <div className='flex flex-col items-start justify-start space-y-4 p-4 pt-10 text-white md:items-start'>
      <h2 className='mb-4 text-5xl font-bold'>Mi Meta</h2>

      {goal && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              movePage()
            }}
            className='flex w-full max-w-[1000px] flex-col gap-y-8'
          >
            <LbMsrInput
              color='bg-input-green'
              label={question?.question ?? ''}
              variable={goal.variable ?? ''}
              min={goal.min ?? 0}
              max={goal.max ?? 0}
              measure={goal.measure ?? ''}
              value={current}
              setValue={setCurrent}
            />

            <MainButton
              disabled={!goal || current === 0}
              onClick={() => {}}
              text='Continuar'
            />
          </form>
        </>
      )}
    </div>
  )
}

export default ExerciseEvalGoalPage
