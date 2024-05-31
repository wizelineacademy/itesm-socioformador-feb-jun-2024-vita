'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

/**
 * @author: Bernardo de la Sierra
 * @version 2.0.0
 * Component representing the Nutrition Home page
 */
const Nutrition = () => {
  // Array containing objects with number and corresponding image source
  const numeros = [
    {
      number: 1,
      imageSrc: '/icons/Grape.svg',
    },
    {
      number: 2,
      imageSrc: '/icons/Carrot.svg',
    },
    {
      number: 3,
      imageSrc: '/icons/Soy.svg',
    },
    {
      number: 4,
      imageSrc: '/icons/Meat.svg',
    },
    {
      number: 5,
      imageSrc: '/icons/Milk.svg',
    },
    {
      number: 6,
      imageSrc: '/icons/Porridge.svg',
    },
    {
      number: 7,
      imageSrc: '/icons/Sugar.svg',
    },
    {
      number: 8,
      imageSrc: '/icons/Avocado.svg',
    },
  ]

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
          {numeros.map((numero, index) => (
            <div
              key={index}
              className='mx-4 my-2 flex flex-col items-center py-2 sm:mx-6 md:mx-2 lg:mx-4'
            >
              <h3 className='text-2xl text-white md:text-3xl lg:text-3xl'>
                {numero.number}
              </h3>
              <Image
                src={numero.imageSrc}
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
                <Image
                  src='/icons/Filter.svg'
                  alt='Imagen 2'
                  width={45}
                  height={45}
                  className='pr-2'
                />
              </div>
            </Link>

            {/* Custom option 2 */}
            <Link href='/nutrition/goals'>
              <div className='w-[330px]px-4 mt-4 flex cursor-pointer justify-between rounded-full bg-custom-purple3 py-2 transition-colors duration-300 ease-in-out hover:bg-custom-purple4 md:rounded-2xl md:py-4 lg:mt-[75px] lg:w-[320px] lg:rounded-2xl lg:py-4'>
                <h3 className='w-[280px] pl-2 pt-1 text-3xl font-bold text-white md:w-[140px] lg:w-[140px] lg:text-2xl'>
                  Mi meta de nutrición
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
