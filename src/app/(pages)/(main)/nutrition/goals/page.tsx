'use client'

import ButtonEvaluation from '@/src/components/buttons/ButtonEvaluation.'
import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const GoalsPage = () => {
  const [goal, setGoal] = useState<string>('')

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const goal = await axios.get('/api/goals/nutrition')
        setGoal(goal.data.name)
      } catch (error) {
        console.log(error)
      }
    }

    fetchGoal()
  }, [])

  return (
    <div className='flex flex-col items-start justify-start space-y-4 bg-[#2C0521] p-4 pt-10 text-white md:items-start'>
      <h2 className='mb-4 text-5xl font-bold'>Mi Meta</h2>

      {!goal && (
        <div className='flex w-full flex-col gap-y-5 lg:items-start'>
          <p className='text-xl font-bold'>
            No tienes ninguna meta configurada actualmente.
          </p>
          <Link className='w-full' href='/nutrition/goals/selection'>
            <ButtonEvaluation onClick={() => {}} text='Crear meta' />
          </Link>
        </div>
      )}

      {goal && (
        <div className='flex w-full flex-col gap-y-5 lg:items-start'>
          <p className='text-xl font-bold'>Tu meta actual es:</p>
          <p className='mt-5 w-full max-w-[500px] rounded-2xl bg-custom-lightpurple py-3 pl-4 text-lg'>
            {goal}
          </p>
          <Link className='w-full' href='/nutrition/goals/selection'>
            <ButtonEvaluation onClick={() => {}} text='Editar meta' />
          </Link>
        </div>
      )}
    </div>
  )
}

export default GoalsPage
