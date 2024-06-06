'use client'
import React from 'react'
import Link from 'next/link'
import Button from '../buttons/Button'

const HomePage: React.FC = () => {
  return (
    <div className='font-notosans flex h-screen flex-col justify-center align-middle text-white'>
      <div
        id='About_Container'
        className='flex flex-col items-center justify-center gap-12'
      >
        <h1 className='lg:7xl text-5xl font-bold sm:mt-3.5 sm:text-6xl md:mt-1.5 md:text-6xl'>
          Únete a
          <span className='lg:7xl ml-2 text-5xl font-bold text-red-300 sm:mt-3.5 sm:text-6xl md:mt-1.5 md:text-6xl'>
            VITA
          </span>
          <div className='w-84 mt-2 h-0.5 bg-rose-300'></div>
        </h1>

        <h2 className='mb-5 w-full text-center text-4xl font-light leading-loose sm:w-[400px] md:w-[450px] md:text-4xl'>
          Y disfruta de todos los
          <span className='lg:7xl mb-5 text-5xl font-bold text-red-300 sm:mt-3.5 sm:text-6xl md:mt-1.5 md:text-6xl'>
            {' '}
            beneficios
          </span>
        </h2>
        <Link href='/signup'>
          <Button
            borderColor='border-custom-red'
            label='Regístrate'
            outline
            big
            onClick={() => {}}
          />
        </Link>
      </div>
    </div>
  )
}

export default HomePage
