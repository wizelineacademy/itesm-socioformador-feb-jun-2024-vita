'use client'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import PlanItemLink from '@/src/components/list/PlanItemLink'
import ExercisesContext from '@/src/context/exercises'
import { Exercise } from '@/src/data/datatypes/exercise'

const ExercisesList = () => {
  const { state, setState } = useContext(ExercisesContext)

  const [exercises, setExercises] = useState<Exercise[]>([])

  const router = useRouter()

  const navigateToExercise = (selected: string) => {
    const exercise = exercises.find((exercise) => exercise.name === selected)

    setState({
      ...state,
      selectedExercise: exercise,
    })

    router.push(`/exercise/routines/list/detail`)
  }

  useEffect(() => {
    setExercises(state.exercises)
  }, [])

  return (
    <div className='ml-5 mr-5'>
      <h2 className={'mt-2 text-4xl font-semibold text-white md:mt-10'}>
        Mi rutina
      </h2>
      <div className='mt-5 flex w-full flex-wrap md:mx-auto md:items-center lg:my-10 lg:w-2/3'>
        {exercises &&
          exercises.map((exercises) => (
            <PlanItemLink
              onClick={() => {
                navigateToExercise(exercises.name)
              }}
              key={exercises.name}
              content={exercises.name}
              tag={exercises.amount}
              color={'bg-mid-green'}
              hoverColor={'bg-dark-green'}
            />
          ))}
      </div>
    </div>
  )
}

export default ExercisesList
