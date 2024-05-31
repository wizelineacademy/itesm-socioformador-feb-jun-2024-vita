'use client'
import React, { useState, FC, useEffect } from 'react'
import {
  FaAppleAlt,
  FaCarrot,
  FaLeaf,
  FaDrumstickBite,
  FaGlassWhiskey,
  FaSeedling,
  FaIceCream,
  FaBacon,
} from 'react-icons/fa'
import Image from 'next/image'
import Swal from 'sweetalert2'
import axios from 'axios'
import calories_portions from '@/src/data/calories_portions'
import { CaloriesPortion } from '@/src/data/datatypes/portion'

interface Numero {
  number: string
  label: string
}

const numeros: Numero[] = [
  { number: '0', label: 'Frutas' },
  { number: '0', label: 'Verduras' },
  { number: '0', label: 'Leguminosas' },
  { number: '0', label: 'Carnes' },
  { number: '0', label: 'Leche' },
  { number: '0', label: 'Cereales' },
  { number: '0', label: 'Azúcares' },
  { number: '0', label: 'Grasas' },
]

interface ColumnsWrapperProps {
  children: React.ReactNode
}

const ColumnsWrapper: FC<ColumnsWrapperProps> = ({ children }) => (
  <div
    className='flex w-full flex-wrap justify-start sm:w-3/5 md:space-x-2 lg:w-full'
    style={{ marginTop: '1rem' }}
  >
    {children}
  </div>
)

interface ColumnProps {
  labels: string[]
  icons: JSX.Element[]
  values: string[]
  edit: boolean
  onValueChange: (index: number, value: string) => void
  validationMessages: string[]
}

const Column: FC<ColumnProps> = ({
  labels,
  icons,
  values,
  edit,
  onValueChange,
  validationMessages,
}) => (
  <div className='w-full lg:mr-3 lg:flex-1'>
    <div className='flex flex-col'>
      {labels.map((label, index) => (
        <div key={index} className='relative mb-3 w-full'>
          {validationMessages[index] && (
            <div className='mb-1 text-sm font-bold text-red-500'>
              {validationMessages[index]}
            </div>
          )}
          <label className='mb-1 block text-lg font-bold text-white'>
            {label}
          </label>
          <div className='flex items-center'>
            <input
              type='number'
              disabled={!edit}
              className='w-4/5 rounded-full border-none bg-[#6D5366] py-[0.7rem] pl-6 pr-4 text-white'
              value={values[index]}
              onChange={(e) => onValueChange(index, e.target.value)}
            />
            {icons[index] && (
              <div className='ml-5 mt-[-1rem]'>{icons[index]}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)

const Nutrition: FC = () => {
  const [values, setValues] = useState<string[]>(numeros.map((c) => c.number))
  const [validationMessages, setValidationMessages] = useState<string[]>(
    Array(numeros.length).fill(''),
  )
  const [edit, setEdit] = useState(false)

  //states for calories-based portions
  const [increase, setIncrease] = useState(true)
  const [decrease, setDecrease] = useState(false)
  const [gender, setGender] = useState('M')
  const [options, setOptions] = useState<CaloriesPortion>(
    calories_portions['M']['increase'],
  )
  const [caloriesSelection, setCaloriesSelection] = useState<string>('')

  const labels: (
    | 'fruits'
    | 'vegetables'
    | 'legumes'
    | 'meat'
    | 'milk'
    | 'cereals'
    | 'sugar'
    | 'fat'
  )[] = [
    'fruits',
    'vegetables',
    'legumes',
    'meat',
    'milk',
    'cereals',
    'sugar',
    'fat',
  ]

  const updateValue = (index: number, value: string) => {
    const newValues = [...values]
    newValues[index] = value
    setValues(newValues)

    const newMessages = [...validationMessages]
    newMessages[index] =
      value !== '' && Number(value) >= 0 && Number(value) <= 20
        ? ''
        : 'Sólo se aceptan valores entre 0 y 20'
    setValidationMessages(newMessages)
  }

  const handleEdit = async () => {
    if (!edit) {
      setEdit(true)
    } else {
      const invalid = values.some(
        (value) => value === '' || Number(value) < 0 || Number(value) > 20,
      )
      if (invalid) {
        Swal.fire({
          title: 'Error',
          text: 'Los valores de las porciones deben encontrarse entre 0 y 20',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      } else {
        await postPortions()
      }
    }
  }

  const postPortions = async () => {
    try {
      await axios.post('/api/portions', {
        fruits: values[0],
        vegetables: values[1],
        legumes: values[2],
        meat: values[3],
        milk: values[4],
        cereals: values[5],
        sugar: values[6],
        fat: values[7],
      })

      Swal.fire({
        title: 'Éxito',
        text: 'Se han guardado las porciones con éxito',
        icon: 'success',
        confirmButtonText: 'OK',
      })

      setEdit(false)
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar las porciones',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const getPortions = async () => {
    try {
      const response = await axios.get('/api/portions')
      const data = response.data

      if (!data) {
        //return if portions have not been entered yet
        return
      }

      const newValues = [...values]
      for (let i = 0; i < labels.length; i++) {
        newValues[i] = data[labels[i]]
      }
      setValues(newValues)
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al recuperar las porciones',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const getGender = async () => {
    try {
      const response = await axios.get('/api/healthdata')
      const data = response.data
      setGender(data.sex)
      const portions =
        calories_portions[data.sex === 'M' ? 'M' : 'F']['increase']
      setOptions(portions)
      setCaloriesSelection(Object.keys(options)[0])
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al encontrar tu información',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  useEffect(() => {
    getPortions()
    getGender()
  }, [])

  const iconsFirstColumn: JSX.Element[] = [
    <FaAppleAlt key='apple' className='text-5xl text-white' />,
    <FaCarrot key='carrot' className='text-5xl text-white' />,
    <FaLeaf key='leaf' className='text-5xl text-white' />,
    <FaDrumstickBite key='drum' className='text-5xl text-white' />,
  ]
  const iconsSecondColumn: JSX.Element[] = [
    <FaGlassWhiskey key='glass' className='text-5xl text-white' />,
    <FaSeedling key='seedling' className='text-5xl text-white' />,
    <FaIceCream key='icecream' className='text-5xl text-white' />,
    <FaBacon key='bacon' className='text-5xl text-white' />,
  ]

  return (
    <div className='min-h-screen bg-[#2C0521]'>
      <div className='ml-4 mr-4 mt-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <h2 className='text-4xl font-bold text-white md:mt-5 lg:text-5xl'>
                Mis
              </h2>
            </div>
            <div className='flex items-center'>
              <h2 className='text-4xl font-bold text-white lg:text-5xl'>
                Porciones
              </h2>
              <Image
                src='/icons/Food.svg'
                alt='Imagen 2'
                width={45}
                height={45}
                className='lg:h-24 lg:w-24 lg:pb-3'
                style={{ marginLeft: '2rem' }}
              />
            </div>
          </div>
        </div>

        {edit && (
          <>
            <h3 className='mt-7 text-xl font-bold text-white'>
              Porciones en base a calorías
            </h3>
            <p className='text-md mt-5 max-w-[700px] leading-5 text-white lg:font-semibold'>
              Ingresa si deseas aumentar o disminuir de peso y la cantidad de
              calorías diarias que buscas consumir y se generará automáticamente
              un plan de acuerdo a estas
            </p>
            <div className='flex w-full flex-wrap justify-center gap-x-3 sm:justify-start lg:gap-x-6'>
              <button
                onClick={() => {
                  setIncrease(false)
                  setDecrease(true)
                  const genderVar = gender === 'M' ? 'M' : 'F'
                  setOptions(calories_portions[genderVar]['decrease'])
                }}
                className={`mt-5 h-auto w-4/5 rounded-full px-10 py-3 font-bold text-white ${decrease ? 'bg-decoration-nutrition-colordark' : 'bg-decoration-nutrition-colorlight'} hover:bg-decoration-nutrition-colordark sm:w-2/5 lg:max-w-[300px] lg:px-12 lg:py-3 xl:px-20`}
              >
                Disminuir
              </button>
              <button
                onClick={() => {
                  setDecrease(false)
                  setIncrease(true)
                  const genderVar = gender === 'M' ? 'M' : 'F'
                  setOptions(calories_portions[genderVar]['increase'])
                }}
                className={`mt-5 h-auto w-4/5 rounded-full px-10 py-3 font-bold text-white ${increase ? 'bg-decoration-nutrition-colordark' : 'bg-decoration-nutrition-colorlight'} hover:bg-decoration-nutrition-colordark sm:w-2/5 lg:max-w-[300px] lg:px-12 lg:py-3 xl:px-20`}
              >
                Aumentar
              </button>
            </div>
            <div className='flex flex-col items-center sm:items-start lg:mt-5 lg:flex-row lg:items-end lg:justify-start lg:space-x-3'>
              <div className='mt-5 flex w-full flex-col justify-center space-y-1 align-top sm:w-3/5 md:mt-2 lg:w-2/5 lg:max-w-[380px]'>
                <p className='mb-2 font-semibold text-white md:mb-3 md:max-w-40 lg:max-w-none'>
                  Cantidad de calorías
                </p>
                <div className='flex items-center'>
                  <select
                    value={caloriesSelection}
                    onChange={(e) => {
                      setCaloriesSelection(e.target.value)
                    }}
                    className='w-4/5 max-w-[350px] rounded-2xl border-none bg-custom-lightpurple px-3 py-2 text-white placeholder-slate-300 outline-none'
                  >
                    {Object.keys(options).map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <p className='ml-2 font-semibold text-white'>kcal</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const newValues = [...values]
                  const portions = options[Number(caloriesSelection)]
                  for (let i = 0; i < labels.length; i++) {
                    newValues[i] = portions[labels[i]].toString()
                  }
                  setValues(newValues)
                }}
                className='mt-5 h-auto w-4/5 rounded-full bg-decoration-nutrition-colorlight px-10 py-3 font-bold text-white hover:bg-decoration-nutrition-colordark sm:w-3/5 lg:w-auto lg:px-12 lg:py-3 xl:px-20'
              >
                Generar plan
              </button>
            </div>

            <hr className='mx-auto mt-5 w-full' />
            <p className='text-md mt-5 leading-5 text-white lg:font-semibold'>
              O también puedes ingresarlas manualmente
            </p>
          </>
        )}

        <ColumnsWrapper>
          <Column
            labels={['Frutas', 'Verduras', 'Leguminosas', 'Carnes']}
            icons={iconsFirstColumn}
            edit={edit}
            values={values.slice(0, 4)}
            onValueChange={updateValue}
            validationMessages={validationMessages.slice(0, 4)}
          />
          <Column
            labels={['Leche', 'Cereales', 'Azúcares', 'Grasas']}
            edit={edit}
            icons={iconsSecondColumn}
            values={values.slice(4)}
            onValueChange={(index, value) => updateValue(index + 4, value)}
            validationMessages={validationMessages.slice(4)}
          />
        </ColumnsWrapper>
        <div className='mb-5 mt-2 flex w-full flex-col items-center space-y-3 sm:items-start md:mr-7 md:flex-row md:items-center md:space-x-3 md:space-y-0 lg:items-center lg:justify-end'>
          {edit && (
            <button
              className='w-4/5 rounded-full bg-mid-red py-3 font-bold text-white hover:bg-light-red sm:w-3/5 lg:max-w-72'
              onClick={() => {
                setEdit(false)
              }}
            >
              Cancelar
            </button>
          )}
          <button
            className='w-4/5 rounded-full bg-decoration-nutrition-colorlight py-3 font-bold text-white hover:bg-decoration-nutrition-colordark sm:w-3/5 lg:max-w-72'
            onClick={handleEdit}
          >
            {edit ? 'Guardar cambios' : 'Editar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Nutrition
