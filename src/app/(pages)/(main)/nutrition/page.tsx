'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { SelectPortions } from '@/src/db/schema/schema'
import Swal from 'sweetalert2'

/**
 * @author: Bernardo de la Sierra
 * @version 2.0.0
 * Component representing the Nutrition Home page
 */
const Nutrition = () => {
  const [portions, setPortions] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0])

  const icons = [
    '/icons/Grape.svg',
    '/icons/Carrot.svg',
    '/icons/Soy.svg',
    '/icons/Meat.svg',
    '/icons/Milk.svg',
    '/icons/Porridge.svg',
    '/icons/Sugar.svg',
    '/icons/Avocado.svg',
  ]

  const getPortions = async () => {
    try {
      const response = await axios.get<SelectPortions>('/api/portions')
      const data = response.data

      if (!data) {
        return
      }

      const numPortions = [
        data.fruits,
        data.vegetables,
        data.legumes,
        data.meat,
        data.milk,
        data.cereals,
        data.sugar,
        data.fat,
      ]

      setPortions(numPortions)
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al recuperar las porciones',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  useEffect(() => {
    getPortions()
  })

  return (
    <div className='mb-4'>
      {/* Title */}
      <div className='flex justify-start text-5xl font-bold text-white sm:justify-center sm:px-5 sm:py-4 sm:text-6xl md:justify-start lg:justify-start'>
        <h1 className='mr-2 pl-2 sm:pl-0'>Nutrición</h1>
        <Image src='/icons/Food.svg' alt='Food' width={45} height={45} />
      </div>

      {/* Subtitle */}
      <h2 className='flex items-center justify-start px-5 py-4 text-2xl text-white sm:justify-center sm:text-3xl md:justify-start lg:justify-start'>
        Mis porciones de hoy
      </h2>

      {/* Displaying portion numbers and corresponding images */}
      <div className='flex flex-col items-center justify-center md:justify-start lg:justify-start'>
        <div className='ml-4 flex w-[160px] flex-wrap rounded-3xl bg-custom-lightpurple px-5 sm:w-[330px] md:w-[360px] lg:w-[500px]'>
          {portions.map((portion, index) => (
            <div
              key={index}
              className='mx-4 my-2 flex flex-col items-center py-2 sm:mx-6 md:mx-2 lg:mx-4'
            >
              <h3 className='text-2xl text-white md:text-3xl lg:text-3xl'>
                {portion}
              </h3>
              <Image
                src={icons[index]}
                alt={`Imagen ${index}`}
                width={24}
                height={24}
              />
            </div>
          ))}
        </div>

        {/* Options for nutrition */}
        <div className='flex flex-col pl-4 pr-4 pt-4 lg:flex-row'>
          <div className='w-full lg:mr-10 lg:w-1/2'>
            {/* Custom option 1 */}
            <Link href='/nutrition/recipes'>
              <div className='flex w-[240px] cursor-pointer justify-between rounded-full bg-custom-purple3 px-4 py-4 transition-colors duration-300 ease-in-out hover:bg-custom-purple4 sm:w-[330px] md:rounded-2xl lg:w-[340px] lg:rounded-2xl lg:px-6'>
                <h3 className='pl-2 pt-1 text-xl font-bold text-white md:w-[240px] lg:w-[240px] lg:text-3xl'>
                  Buscar opciones de comidas personalizadas
                </h3>
                <span className='hidden md:flex'>
                  <Image
                    src='/icons/Filter.svg'
                    alt='Imagen 2'
                    width={45}
                    height={45}
                    className='pr-2'
                  />
                </span>
              </div>
            </Link>

            {/* Custom option 2 */}
            <Link href='/nutrition/goals'>
              <div className='mt-4 flex w-[240px] cursor-pointer justify-between rounded-full bg-custom-purple3 px-4 py-4 transition-colors duration-300 ease-in-out hover:bg-custom-purple4 md:rounded-2xl md:py-4 lg:mt-[75px] lg:w-[320px] lg:rounded-2xl lg:py-4'>
                <h3 className='w-[240px] pl-2 pt-1 text-xl font-bold text-white md:w-[140px] lg:w-[140px] lg:text-2xl'>
                  Mi meta de nutrición
                </h3>
                <span className='hidden md:flex'>
                  <Image
                    src='/icons/Healthy.svg'
                    alt='Imagen 2'
                    width={45}
                    height={45}
                    className='pr-2'
                  />
                </span>
              </div>
            </Link>
          </div>
          <div className='w-full lg:w-1/2'>
            {/* Custom option 3 */}
            <Link href='/nutrition/self_evaluation'>
              <div className='z-10 mt-4 flex w-[240px] cursor-pointer justify-between rounded-full bg-custom-purple3 px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-custom-purple4 sm:w-[330px] md:rounded-2xl md:py-2.5 lg:mt-0 lg:w-[340px] lg:rounded-2xl lg:py-2.5'>
                <h3 className='w-[240px] pl-2 pt-1 text-xl font-bold text-white lg:text-3xl'>
                  Autoevaluación
                </h3>
                <Image
                  src='/icons/Pass.svg'
                  alt='Imagen 2'
                  width={45}
                  height={45}
                  className='pr-2'
                />
              </div>
            </Link>

            {/* Custom option 4 */}
            <Link href='/nutrition/portions'>
              <div className='mt-7 flex w-[240px] cursor-pointer justify-between rounded-full bg-custom-purple3 px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-custom-purple4 sm:w-[330px] md:rounded-2xl md:py-2.5 lg:w-[340px] lg:rounded-2xl lg:py-2.5'>
                <h3 className='w-[240px] pl-2 pt-1 text-xl font-bold text-white lg:text-3xl'>
                  Mis porciones
                </h3>
                <Image
                  src='/icons/Food.svg'
                  alt='Imagen 2'
                  width={45}
                  height={45}
                  className='pr-2'
                />
              </div>
            </Link>

            {/* Custom option 5 */}
            <Link href='/nutrition/imageDetection'>
              <div className='mt-7 flex w-[240px] justify-between rounded-full bg-custom-purple3 px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-custom-purple4 sm:w-[330px] md:rounded-2xl md:py-2.5 lg:w-[340px] lg:rounded-2xl lg:py-2.5'>
                <h3 className='w-[240px] cursor-pointer pl-2 pt-1 text-xl font-bold text-white lg:text-3xl'>
                  Detección de calorías
                </h3>
                <Image
                  src='/icons/Healthy.svg'
                  alt='Imagen 2'
                  width={45}
                  height={45}
                  className='pr-2'
                />
              </div>
            </Link>
            {/* Custom option 6 */}
            <Link id='Enlace' href='/nutrition/nutritional_plan'>
              <div className='mt-7 flex w-[240px] justify-between rounded-full bg-custom-purple3 px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-custom-purple4 sm:w-[330px] md:rounded-2xl md:py-2.5 lg:w-[340px] lg:rounded-2xl lg:py-2.5'>
                <h3 className='w-[240px] cursor-pointer pl-2 pt-1 text-xl font-bold text-white lg:text-3xl'>
                  Generar un plan nutricional
                </h3>
                <Image
                  src='/icons/ToDo.svg'
                  alt='Imagen 2'
                  width={45}
                  height={45}
                  className='pr-2'
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nutrition
