'use client'
import SelectableCard from '@/src/components/cards/SelectableCard'
import SelectableCardWrapper from '@/src/components/cards/SelectableCardWrapper'
import SearchBarButton from '@/src/components/searchbar/SearchbarButton'
import ExercisesContext from '@/src/context/exercises'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { IconType } from 'react-icons'

import { FaDumbbell, FaRunning } from 'react-icons/fa'
import { FaHeartPulse } from 'react-icons/fa6'
import { MdOutlineSportsGymnastics } from 'react-icons/md'

import Swal from 'sweetalert2'

const TypeRoutine = () => {
  const types = [
    'Planchas',
    'Sentadillas',
    'Abdominales',
    'Flexiones de brazos',
    'Zancadas',
    'Burpees',
    'Saltos de cuerda',
    'Fondos de tríceps',
    'Elevaciones laterales',
    'Dominadas',
    'Desplantes',
    'Curl de bíceps',
    'Mountain climbers',
    'Peso muerto',
    'Flexiones de tronco',
    'Bicicleta estática',
    'Elevaciones de talones',
    'Estocadas',
    'Elevaciones frontales',
    'Remo con barra',
    'Flexiones diamante',
    'Jumping jacks',
    'Elevaciones de piernas',
    'Curl femoral',
    'Press de hombros',
    'Step-ups',
    'Pull-ups',
    'Crunches',
    'Elevaciones de gemelos',
  ]

  const availableIcons = [
    FaRunning,
    FaDumbbell,
    FaHeartPulse,
    MdOutlineSportsGymnastics,
  ]

  const { state, setState } = useContext(ExercisesContext)
  const [selections, setSelections] = useState<boolean[]>([])
  const [list, setList] = useState<string[]>(types)
  const [icons, setIcons] = useState<IconType[]>([])

  const router = useRouter()

  useEffect(() => {
    const ics: IconType[] = []

    let i = 0
    while (ics.length < types.length) {
      ics.push(availableIcons[i])
      i++
      i %= 4
    }

    setIcons(ics)
  }, [])

  const findSelectedIndices = (): number[] => {
    const indices: number[] = []
    selections.forEach((selection, index) => {
      if (selection) {
        indices.push(index)
      }
    })
    return indices
  }

  const generatePrompt = () => {
    const selected = findSelectedIndices()

    if (selected.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Debes seleccionar al menos un tipo de ejercicio',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return ''
    }

    if (selected.length > 10) {
      Swal.fire({
        title: 'Error',
        text: 'Puedes seleccionar un máximo de 10 ejercicios a realizar',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return ''
    }

    let prompt = `Quiero realizar los siguientes ejercicios: `
    selected.forEach((el, index) => {
      if (index != selected.length) {
        prompt += `${types[el]}, `
      } else {
        prompt += `${types[el]}.`
      }
    })

    const message = {
      role: 'user',
      content: prompt,
    }

    return message
  }

  const checkRemaining = async () => {
    const res = await axios.get('/api/feature_usage/subscription/exercise')
    const data = res.data

    if (data.remaining <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'No te quedan rutinas disponibles este mes',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }

    return data
  }

  const generateExercises = async () => {
    try {
      const message = generatePrompt()

      if (message === '') {
        return
      }

      const { remaining, available } = await checkRemaining()
      if (remaining <= 0) {
        return
      }

      const selected = findSelectedIndices()
      const usageRecords = selected.map((area) => ({
        name: 'routine_type',
        detail: types[area],
      }))
      await axios.post('/api/feature_usage', { usageRecords })

      Swal.fire({
        title: 'Cargando',
        text: `Generando la rutina... Has generado ${available - remaining} de ${available} este mes`,
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      const response = await axios.post('/api/routines/types', {
        message,
      })

      let data = response.data.content
      data = data.replaceAll('`', '')
      data = data.replace('json', '')

      const exercises = JSON.parse(data)

      setState({
        ...state,
        exercises,
      })

      router.push('/exercise/routines/list')
      Swal.close()
    } catch (error) {
      Swal.close()
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al generar la rutina. Inténtalo de nuevo',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <div className='ml-5 mr-5'>
      <h2 className={'mt-2 text-4xl font-semibold text-white md:mt-10'}>
        Rutinas
      </h2>
      <h3 className={'mt-5 text-xl text-white md:w-4/5 lg:w-3/5'}>
        Escoge el ejercicio que deseas realizar
      </h3>

      <SearchBarButton
        placeholder='Abdominales'
        list={types}
        setList={setList}
        action={generateExercises}
      />

      <SelectableCardWrapper>
        {icons.length === types.length &&
          list.map((type, index) => (
            <SelectableCard
              key={type}
              text={type}
              selected={selections[index]}
              icon={icons[index]}
              toggle={() => {
                const newSelections = [...selections]
                newSelections[index] = !newSelections[index]
                setSelections(newSelections)
              }}
            />
          ))}
      </SelectableCardWrapper>
    </div>
  )
}

export default TypeRoutine
