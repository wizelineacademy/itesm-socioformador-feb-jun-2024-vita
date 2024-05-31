'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { getMonthName } from '@/src/lib/DaysFormat/days'
import Link from 'next/link'

const GetChallenge = () => {
  const [challenge, setChallenge] = useState<{
    idChallenge: number
    name: string
    description: string
    startDate: string
    endDate: string
  } | null>(null)

  const [ranking, setRanking] = useState<Array<{
    idUser: number
    name: string
    points: number
  }> | null>(null)

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(`/api/challenges`)
        setChallenge(response.data)
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener el reto del mes actual',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    }

    fetchChallenge()
  }, [])

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get(`/api/ranking`)
        setRanking(response.data)
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener el ranking',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    }

    fetchRanking()
  }, [])

  const getTrophyIcon = (index: number) => {
    if (index === 0) return '🏆'
    if (index === 1) return '🥈'
    if (index === 2) return '🥉'
    return ''
  }

  return (
    <div className='flex flex-col justify-center px-5 py-4 text-4xl font-bold md:justify-start lg:justify-start'>
      <span className='mb-4 flex flex-row text-start'>
        <h1 className='text-5xl text-home-title'>Reto de {getMonthName()} </h1>
      </span>
      <Link href='/home/responseChallenge/'>
        <div className='mt-4 w-[380px] cursor-pointer justify-center rounded-3xl bg-home-title px-4 py-2 text-2xl text-white transition-colors duration-300 ease-in-out hover:bg-[#1D154A] md:justify-start lg:justify-start'>
          Hacer el reto/Evaluar a otros
        </div>
      </Link>

      {challenge ? (
        <div className='mx-auto mt-6 w-full rounded-lg bg-white p-8 shadow-lg md:w-3/4'>
          <div className='mb-6 flex flex-col'>
            <label
              htmlFor='name'
              className='mb-4 text-3xl font-bold text-gray-700'
            >
              Nombre del reto
            </label>
            <div className='w-full rounded-lg bg-blue-100 px-6 py-3 text-2xl'>
              {challenge.name}
            </div>
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='description'
              className='mb-4 text-3xl font-bold text-gray-700'
            >
              Descripción
            </label>
            <div className='w-full rounded-lg bg-blue-100 px-6 py-3 text-2xl'>
              {challenge.description}
            </div>
          </div>
        </div>
      ) : (
        <p className='mt-6 text-center text-3xl text-red-500'>
          No hay un reto disponible para el mes actual.
        </p>
      )}

      <h1 className='mb-4 mt-10 text-center text-5xl text-home-title'>
        Ranking de Usuarios
      </h1>
      {ranking ? (
        <div className='space-y-4'>
          {ranking.map((user, index) => (
            <div
              key={user.idUser}
              className={`mx-auto flex w-full items-start justify-between rounded-lg p-4 shadow-md md:w-3/4 ${index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-gray-200' : index === 2 ? 'bg-yellow-300' : 'bg-white'}`}
            >
              <div className='flex items-center space-x-4'>
                <div className='text-3xl font-bold text-blue-600'>
                  {getTrophyIcon(index)} {index + 1}
                </div>
                <div className='text-2xl font-bold text-gray-700'>
                  {user.name}
                </div>
              </div>
              <div className='text-2xl font-semibold text-gray-700'>
                {user.points} puntos
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='mt-6 text-center text-3xl text-red-500'>
          No se pudo obtener el ranking.
        </p>
      )}
    </div>
  )
}

export default GetChallenge
