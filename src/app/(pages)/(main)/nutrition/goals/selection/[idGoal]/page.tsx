'use client'

import { LbMsrInput } from '@/src/components/Inputs/LbMsrInput'
import MainButton from '@/src/components/buttons/MainButton'
import { NumericGoal } from '@/src/data/datatypes/goal'
import { nutritionGoals } from '@/src/data/nutrition_goals'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const GoalsDetailPage = ({ params }: { params: { idGoal: string } }) => {
  const [goal, setGoal] = useState<NumericGoal>()
  const [extra, setExtra] = useState<boolean>(true)
  const [previous, setPrevious] = useState<number>(0)
  const [next, setNext] = useState<number>(0)

  const router = useRouter()

  const fetchHealthData = async (goal: NumericGoal) => {
    const data = await axios.get('/api/healthdata')
    setPrevious(goal?.data ? data.data[goal.data] : 0)
  }

  useEffect(() => {
    const selected = nutritionGoals.find((goal) => {
      return goal.id === Number(params.idGoal)
    })
    setGoal(selected)

    if (!selected?.variable) {
      setExtra(false)
      createGoal(selected!)
    } else {
      setExtra(true)
      if (selected.data) {
        fetchHealthData(selected)
      }
    }
  }, [])

  const validateGoal = (): boolean => {
    if (!goal || !next || !previous) {
      Swal.fire({
        title: 'Error',
        text: 'Debes ingresar el valor actual y el deseado',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return false
    }

    if (goal.constraint === 'increase' && next <= previous) {
      Swal.fire({
        title: 'Error',
        text: 'El valor deseado debe ser mayor que el valor actual',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return false
    } else if (goal.constraint === 'decrease' && next >= previous) {
      Swal.fire({
        title: 'Error',
        text: 'El valor deseado debe ser menor que el valor actual',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return false
    } else {
      return true
    }
  }

  const createGoal = async (goal: NumericGoal) => {
    try {
      if (goal.variable) {
        const valid = validateGoal()
        if (!valid) {
          return
        }
      }

      await axios.post('/api/goals', {
        name: goal?.title,
        category: goal?.category,
        variable: goal?.variable,
        currentValue: previous,
        desiredValue: next,
      })
      Swal.fire({
        title: 'Meta agregada',
        text: 'Se agregó la meta con éxito',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/nutrition/goals')
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
    <div className='flex flex-col items-start justify-start space-y-4 bg-[#2C0521] p-4 pt-10 text-white md:items-start'>
      <h2 className='mb-4 text-5xl font-bold'>Mi Meta</h2>

      {goal && extra && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              createGoal(goal)
            }}
            className='flex w-full max-w-[1000px] flex-col gap-y-8'
          >
            <LbMsrInput
              label={`¿En qué ${goal.variable} te encuentras?`}
              variable={goal.variable ?? ''}
              min={goal.min ?? 0}
              max={goal.max ?? 0}
              measure={goal.measure ?? ''}
              value={previous}
              setValue={setPrevious}
            />

            <LbMsrInput
              label={`¿Qué ${goal.variable} te gustaría alcanzar?`}
              variable={goal.variable ?? ''}
              min={goal.min ?? 0}
              max={goal.max ?? 0}
              measure={goal.measure ?? ''}
              value={next}
              setValue={setNext}
            />

            <MainButton onClick={() => {}} text='Guardar meta' />
          </form>
        </>
      )}
    </div>
  )
}

export default GoalsDetailPage
