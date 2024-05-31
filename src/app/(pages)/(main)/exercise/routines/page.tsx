'use client'
import { useRouter } from 'next/navigation'

import { FaRunning, FaTree, FaDumbbell } from 'react-icons/fa'

const ExerciseSelection = () => {
  const router = useRouter()

  const data = [
    {
      name: 'Tipo de ejercicio',
      icon: FaRunning,
      link: '/exercise/routines/type',
    },
    {
      name: 'Espacio',
      icon: FaTree,
      link: '/exercise/routines/space',
    },
    {
      name: 'Área del cuerpo',
      icon: FaDumbbell,
      link: '/exercise/routines/area',
    },
  ]

  return (
    <div className='ml-5 mr-5'>
      <h2 className={'mt-2 text-4xl font-semibold text-white md:mt-10'}>
        Rutinas
      </h2>
      <h3 className={'mt-5 text-xl text-white md:w-4/5 lg:w-3/5'}>
        Selecciona si deseas generar una rutina en base al tipo de ejercicio, el
        espacio para realizar el ejercicio o el área del cuerpo a trabajar
      </h3>
      <div className='mb-10 mt-5 flex w-full flex-col justify-around md:flex-row md:flex-wrap md:items-center md:justify-center lg:mx-auto lg:w-1/2 lg:gap-x-3 lg:gap-y-5'>
        {data.map((el) => (
          <div
            key={el.name}
            onClick={() => {
              router.push(el.link)
            }}
            className='mx-auto mt-5 flex w-5/6 items-center justify-between rounded-3xl bg-mid-green px-5 py-2 font-medium text-white hover:cursor-pointer hover:bg-dark-green md:h-56 md:w-2/5 md:flex-col-reverse md:items-start md:justify-start lg:h-64 lg:w-5/12 lg:max-w-[300px]'
          >
            <p className='text-lg font-bold md:mb-10 md:mt-6 md:text-xl'>
              {el.name}
            </p>
            <el.icon
              width={60}
              height={60}
              className='h-12 w-12 pr-2 md:h-14 md:w-14 lg:h-20 lg:w-20'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExerciseSelection
