'use client'

import React, { useState, useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import axios from 'axios'
import { BarChartPlot } from '@/src/components/charts/BarChartPlot'
import { ValueRecord } from '@/src/data/datatypes/autoeval'
import PieChartPlot, {
  PieChartRecord,
} from '@/src/components/charts/PieChartPlot'
import { Portion } from '@/src/data/datatypes/portion'
import { LineChartPlot } from '@/src/components/charts/LineChartPlot'

const SleepDashboard = () => {
  const [sleepHours, setSleepHours] = useState<ValueRecord[]>([])
  const [sleepProgress, setSleepProgress] = useState<ValueRecord[]>([])

  const fetchSleepHours = async () => {
    try {
      const res = await axios.get('/api/records/sleep')
      setSleepHours(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSleepProgress = async () => {
    try {
      const res = await axios.get('/api/goal_evaluations/sleep')
      setSleepProgress(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSleepHours()
    fetchSleepProgress()
  }, [])

  return (
    <div className='w-full pb-10'>
      <div className='h-[250px] w-full md:h-[300px] lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl py-2 text-lg font-bold text-decoration-sleep-colordark lg:px-5`}
        >
          Horas de sueño
        </h4>
        <BarChartPlot
          xLabel='Días'
          yLabel='Horas de sueño'
          tags={['Día', 'Horas de sueño']}
          data={sleepHours}
          barColor='fill-decoration-sleep-colordark'
          infoColor='text-decoration-sleep-colordark'
        />
      </div>

      <div className='h-[300px] w-full py-10 md:h-[400px] lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl py-2 text-lg font-bold text-decoration-sleep-colordark lg:px-5`}
        >
          Progreso en meta
        </h4>
        <BarChartPlot
          xLabel='Mes'
          yLabel='Calificación'
          tags={['Mes', 'Calificación']}
          data={sleepProgress}
          barColor='fill-decoration-sleep-colordark'
          infoColor='text-decoration-sleep-colordark'
        />
      </div>
    </div>
  )
}

const ExerciseDashboard = () => {
  const [exerciseTypes, setExerciseTypes] = useState<PieChartRecord[]>([])
  const [exerciseAreas, setExerciseAreas] = useState<PieChartRecord[]>([])
  const [exerciseProgress, setExerciseProgress] = useState<ValueRecord[]>([])
  const [numRoutines, setNumRoutines] = useState<number>(0)

  const fetchExerciseAreas = async () => {
    try {
      const res = await axios.get('/api/feature_usage/exercise/area')
      setExerciseAreas(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchExerciseTypes = async () => {
    try {
      const res = await axios.get('/api/feature_usage/exercise/type')
      setExerciseTypes(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchExerciseProgress = async () => {
    try {
      const res = await axios.get('/api/goal_evaluations/exercise')
      setExerciseProgress(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchNumberOfRoutines = async () => {
    try {
      const res = await axios.get('/api/feature_usage/days/exercise')
      setNumRoutines(res.data.amount)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchExerciseProgress()
    fetchExerciseAreas()
    fetchExerciseTypes()
    fetchNumberOfRoutines()
  }, [])

  return (
    <div className='w-full pb-10'>
      <div className='w-full pt-5 lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl py-2 text-lg font-bold text-mid-green lg:px-5`}
        >
          Routinas generadas en el mes
        </h4>
        <p className='w-32 rounded-full bg-mid-green px-5 py-3 text-xl font-bold text-white lg:ml-5'>
          {numRoutines}
        </p>
      </div>

      <div className='h-[300px] w-full py-10 md:h-[400px] lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl py-2 text-lg font-bold text-mid-green lg:px-5`}
        >
          Progreso en meta
        </h4>
        <BarChartPlot
          xLabel='Mes'
          yLabel='Calificación'
          tags={['Mes', 'Calificación']}
          data={exerciseProgress}
          barColor='fill-mid-green'
          infoColor='text-mid-green'
        />
      </div>

      <div className='h-[500px] w-full py-10 lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl pt-2 text-lg font-bold text-mid-green lg:px-5`}
        >
          Áreas más entrenadas en el último mes
        </h4>
        <PieChartPlot
          data={exerciseAreas}
          colors={[
            '#278E7C',
            '#00C49F',
            '#194A48',
            '#072E07',
            '#256533',
            '#195225',
          ]}
        />
      </div>

      <div className='h-[500px] w-full py-10 lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl pt-2 text-lg font-bold text-mid-green lg:px-5`}
        >
          Ejercicios más realizados en el último mes
        </h4>
        <PieChartPlot
          data={exerciseTypes}
          colors={[
            '#278E7C',
            '#00C49F',
            '#194A48',
            '#072E07',
            '#256533',
            '#195225',
          ]}
        />
      </div>
    </div>
  )
}

const NutritionDashboard = () => {
  const [nutritionProgress, setNutritionProgress] = useState<ValueRecord[]>([])
  const [numRecipes, setNumRecipes] = useState<number>(0)
  const [portions, setPortions] = useState<PieChartRecord[]>([])
  const [weightRecords, setWeightRecords] = useState<ValueRecord[]>([])
  const [muscularRecords, setMuscularRecords] = useState<ValueRecord[]>([])
  const [fatRecords, setFatRecords] = useState<ValueRecord[]>([])

  const fetchNutritionProgress = async () => {
    try {
      const res = await axios.get('/api/goal_evaluations/nutrition')
      setNutritionProgress(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchNumberOfRecipes = async () => {
    try {
      const res = await axios.get('/api/feature_usage/days/nutrition')
      setNumRecipes(res.data.amount)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchWeightRecords = async () => {
    try {
      const res = await axios.get('/api/records/name/peso')
      setWeightRecords(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMuscularRecords = async () => {
    try {
      const res = await axios.get('/api/records/name/masa_muscular')
      setMuscularRecords(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchFatRecords = async () => {
    try {
      const res = await axios.get('/api/records/name/porcentaje_grasa')
      setFatRecords(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPortions = async () => {
    try {
      //dictionary for translation
      const trans: Record<string, string> = {
        fruits: 'Frutas',
        vegetables: 'Verduras',
        milk: 'Leche',
        legumes: 'Leguminosas',
        cereals: 'Cereales',
        meat: 'Carne',
        sugar: 'Azúcares',
        fat: 'Grasas',
      }

      const res = await axios.get<Portion>('/api/portions')
      const portionsRaw = res.data
      delete portionsRaw.idUser
      delete portionsRaw.idNutritonPortion

      //convert to the pie chart data format
      const portionsNew = Object.keys(portionsRaw).map((key) => ({
        type: trans[key],
        count: portionsRaw[key] as number,
      }))

      setPortions(portionsNew)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchNutritionProgress()
    fetchNumberOfRecipes()
    fetchPortions()
    fetchWeightRecords()
    fetchMuscularRecords()
    fetchFatRecords()
  }, [])

  return (
    <div className='w-full pb-10'>
      <div className='w-full pt-5 lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl py-2 text-lg font-bold text-decoration-nutrition-colordark lg:px-5`}
        >
          Recetas generadas en el mes
        </h4>
        <p className='w-32 rounded-full bg-decoration-nutrition-colordark px-5 py-3 text-xl font-bold text-white lg:ml-5'>
          {numRecipes}
        </p>
      </div>

      <div className='h-[300px] w-full py-10 md:h-[400px] lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl py-2 text-lg font-bold text-decoration-nutrition-colordark lg:px-5`}
        >
          Progreso en meta
        </h4>
        <BarChartPlot
          xLabel='Mes'
          yLabel='Calificación'
          tags={['Mes', 'Calificación']}
          data={nutritionProgress}
          barColor='fill-decoration-nutrition-colordark'
          infoColor='text-decoration-nutrition-colordark'
        />
      </div>

      <div className='h-[500px] w-full py-10 lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl pt-2 text-lg font-bold text-decoration-nutrition-colordark lg:px-5`}
        >
          Mis porciones
        </h4>
        <PieChartPlot
          data={portions}
          colors={[
            '#9D2F7E',
            '#CD5BAD',
            '#741B5B',
            '#df9fcd',
            '#521240',
            '#DA56B575',
            '#F84AC7',
            '#bb499bc3',
          ]}
        />
      </div>

      <div className='h-[300px] w-full pt-10 lg:h-[400px] lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl py-2 text-lg font-bold text-decoration-nutrition-colordark lg:px-5`}
        >
          Cambio en peso
        </h4>
        <LineChartPlot
          xLabel='Mes'
          yLabel='Peso (kg)'
          tags={['Mes', 'Peso']}
          data={weightRecords}
          lineColor='#9D2F7E'
          infoColor='text-decoration-nutrition-colordark'
        />
      </div>

      <div className='h-[300px] w-full sm:pt-10 lg:h-[400px] lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl py-2 text-lg font-bold text-decoration-nutrition-colordark lg:px-5`}
        >
          Cambio en masa muscular
        </h4>
        <LineChartPlot
          xLabel='Mes'
          yLabel='Peso (kg)'
          tags={['Mes', 'Peso']}
          data={muscularRecords}
          lineColor='#9D2F7E'
          infoColor='text-decoration-nutrition-colordark'
        />
      </div>

      <div className='h-[300px] w-full sm:pt-10 lg:h-[400px] lg:max-w-[1000px]'>
        <h4
          className={`rounded-xl py-2 text-lg font-bold text-decoration-nutrition-colordark lg:px-5`}
        >
          Cambio en porcentaje de grasa
        </h4>
        <LineChartPlot
          xLabel='Mes'
          yLabel='Peso (kg)'
          tags={['Mes', 'Peso']}
          data={fatRecords}
          lineColor='#9D2F7E'
          infoColor='text-decoration-nutrition-colordark'
        />
      </div>
    </div>
  )
}

const Dashboard = () => {
  const [selection, setSelection] = useState(0)

  const sections = [
    {
      title: 'Sueño',
    },
    {
      title: 'Ejercicio',
    },
    {
      title: 'Nutrición',
    },
  ]

  return (
    <div className='px-5'>
      <div className='mt-5 flex items-center justify-center py-4 text-5xl font-bold md:w-[300px] md:justify-start lg:w-[500px] lg:justify-start'>
        <h1 className='mr-2 text-home-title'>Mi dashboard de salud</h1>
        <FaHeart
          color='#154154'
          className='hidden h-[50px] w-[50px] lg:inline-block'
        />
      </div>

      <div className='flex flex-col gap-x-5 gap-y-2 lg:flex-row'>
        {sections.map((section, idx) => (
          <button
            key={section.title}
            className={`rounded-xl py-2 text-xl font-bold hover:cursor-pointer hover:bg-home-title hover:px-5 hover:text-white lg:px-5 ${selection === idx && 'bg-home-title px-5 text-white'}`}
            onClick={() => {
              setSelection(idx)
            }}
          >
            {section.title}
          </button>
        ))}
      </div>

      {selection === 0 && <SleepDashboard />}

      {selection === 1 && <ExerciseDashboard />}

      {selection === 2 && <NutritionDashboard />}
    </div>
  )
}

export default Dashboard
