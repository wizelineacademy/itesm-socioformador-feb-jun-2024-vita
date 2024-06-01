'use client'
import ChallengeForm from '@/src/components/challenges/ChallengeForm'
import { ChallengeSubmission } from '@/src/data/datatypes/challenge'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const ResponseChallenge = () => {
  const [userData, setUserData] = useState<ChallengeSubmission[] | null>(null)
  const [userDataSub, setUserDataSub] = useState<ChallengeSubmission[] | null>(
    null,
  )
  const [score, setScore] = useState<number | null>(null)

  const getData = async () => {
    try {
      const response = await axios.get('/api/monthlyChallenge')
      const fetchedData = response.data
      console.log(response.data)
      setUserData(fetchedData.length > 0 ? fetchedData : null)
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al recuperar los datos',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const getDataSub = async () => {
    try {
      const response = await axios.get('/api/evaluations')
      const fetchedData = response.data
      console.log(response.data)
      setUserDataSub(fetchedData.length > 0 ? fetchedData : null)
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al recuperar los datos',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      ;``
    }
  }

  const handleSubmitEvaluation = async (submissionId: number) => {
    try {
      if (!userDataSub) {
        throw Error('No data sub')
      }

      // Enviar la evaluación al servidor con Axios
      await axios.post('/api/evaluations', {
        score,
        idUser: submissionId,
        idChallenge: userDataSub[0].idChallenge,
      })
      getDataSub()
      Swal.fire({
        title: 'Éxito',
        text: 'Evaluación enviada exitosamente',
        icon: 'success',
        confirmButtonText: 'OK',
      })
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al enviar la evaluación',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  useEffect(() => {
    getData()
    getDataSub()
  }, [])

  return (
    <div className='flex flex-col justify-center px-5 py-4 text-4xl font-bold md:justify-start lg:justify-start'>
      <span className='mb-4 flex flex-row text-start'>
        <h1 className='text-5xl text-home-title'>
          {!userData ? 'Hacer el reto' : 'Evaluar el reto'}
        </h1>
      </span>
      <Link href='/home/getChallenge/'>
        <div className='mt-4 w-[280px] cursor-pointer justify-center rounded-3xl bg-home-title px-4 py-2 text-2xl text-white transition-colors duration-300 ease-in-out hover:bg-[#1D154A] md:justify-start lg:justify-start'>
          Ver el reto
        </div>
      </Link>

      <div>
        {!userData ? (
          <ChallengeForm />
        ) : userDataSub ? (
          <div className='flex flex-col items-center justify-center p-6 lg:p-12'>
            {userDataSub.map((submission) => (
              <div
                key={submission.idUser}
                className='mb-6 w-full max-w-lg overflow-hidden rounded-lg bg-white p-6 shadow-md'
              >
                <Image
                  src={submission.imageUrl}
                  alt='Challenge Image'
                  className='h-64 w-full rounded-lg object-cover'
                />
                <div className='p-6'>
                  <p className='mb-2 text-center text-2xl font-semibold text-gray-700'>
                    Descripción:
                  </p>
                  <p className='w-[80%]s mb-4 text-center text-xl'>
                    {submission.description}
                  </p>
                  <div className='flex flex-col items-center'>
                    <label
                      htmlFor='score'
                      className='mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-300'
                    >
                      Puntaje:
                    </label>
                    <select
                      id='score'
                      value={score ?? ''}
                      onChange={(e) => setScore(Number(e.target.value))}
                      className='mb-2 mt-2 w-full rounded-md border p-2 text-base focus:border-blue-500 focus:outline-none'
                    >
                      <option value='' disabled className='mb-2 text-gray-500'>
                        Calificación
                      </option>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      type='button'
                      onClick={() =>
                        handleSubmitEvaluation(userDataSub[0].idUser)
                      }
                      className='mt-2 rounded-full bg-blue-500 px-6 py-3 text-xl font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600 focus:bg-blue-600 focus:outline-none'
                    >
                      Enviar Evaluación
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='mt-6 text-center text-3xl text-red-500'>
            Ya has contestado y evaluado en este desafío
          </p>
        )}
      </div>
    </div>
  )
}

export default ResponseChallenge
