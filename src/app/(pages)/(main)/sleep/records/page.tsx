'use client'

import { SleepTimeSelection } from '@/src/components/Inputs/SleepTimeSelection'
import ButtonEvaluation from '@/src/components/buttons/ButtonEvaluation.'
import {
  generateDate,
  getDifferenceInHours,
  getTodayDate,
  getYesterdayDate,
} from '@/src/lib/dateOps/dateOps'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'

const SleepRecordsPage = () => {
  const [sleepTime, setSleepTime] = useState<string>('')
  const [sleepDay, setSleepDay] = useState<string>('Ayer')
  const [wakeupTime, setWakeupTime] = useState<string>('')
  const [wakeupDay, setWakeupDay] = useState<string>('Hoy')

  const router = useRouter()

  //verify if all questions have been answered
  const verifyData = (): boolean => {
    if (sleepTime === '' || wakeupTime === '') {
      Swal.fire({
        title: 'Error',
        text: 'Debes ingresar la hora a la que dormiste y a la que despertaste',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return false
    }

    return true
  }

  const calculateSleepHours = () => {
    let dateSleep: Date
    let dateWakeup: Date

    if (sleepDay === 'Ayer') {
      dateSleep = generateDate(getYesterdayDate(), sleepTime)
    } else {
      dateSleep = generateDate(getTodayDate(), sleepTime)
    }

    if (wakeupDay === 'Ayer') {
      dateWakeup = generateDate(getYesterdayDate(), wakeupTime)
    } else {
      dateWakeup = generateDate(getTodayDate(), wakeupTime)
    }

    const sleepHours = getDifferenceInHours(dateSleep, dateWakeup)

    return sleepHours
  }

  const sendData = async () => {
    if (!verifyData) {
      return
    }

    try {
      const sleepHours = calculateSleepHours()

      if (sleepHours < 0) {
        Swal.fire({
          title: 'Error',
          text: 'La cantidad de horas de sueño debe ser mayor o igual a 0',
          icon: 'error',
          confirmButtonText: 'OK',
        })
        return
      }

      await axios.post('/api/records', {
        records: [
          {
            name: 'sleep_hours',
            category: 'sleep',
            value: Number(sleepHours.toFixed(1)),
          },
        ],
      })

      Swal.fire({
        title: 'Éxito',
        text: `Se han guardado ${sleepHours.toFixed(1)} horas de sueño con éxito`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
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

  return (
    <div className='flex flex-col items-start justify-start gap-y-3 space-y-4 p-4 pt-10 text-white md:items-start'>
      <h2 className='mb-4 text-4xl font-bold md:text-5xl'>
        Ingresar horas de sueño
      </h2>

      <div className='align-center flex w-full flex-col gap-y-10'>
        <div className='flex w-full gap-y-8 md:max-w-[1000px]'>
          <SleepTimeSelection
            time={sleepTime}
            label='¿A qué hora te acostaste?'
            day={sleepDay}
            setDay={setSleepDay}
            setTime={setSleepTime}
          />
        </div>

        <div className='flex w-full gap-y-8 md:max-w-[1000px]'>
          <SleepTimeSelection
            time={wakeupTime}
            label='¿A qué hora te levantaste?'
            day={wakeupDay}
            setDay={setWakeupDay}
            setTime={setWakeupTime}
          />
        </div>

        <ButtonEvaluation onClick={sendData} text='Enviar' />
      </div>
    </div>
  )
}

export default SleepRecordsPage
