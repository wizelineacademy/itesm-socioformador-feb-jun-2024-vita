'use client'
import React from 'react'
import Image from 'next/image'

const About: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <div className='font-notosans flex h-screen flex-col justify-center align-middle text-white'>
      <div id='Flex-Container'>
        <div
          id='About_Container'
          className='flex flex-col items-center justify-center gap-12'
        >
          <h1 className='lg:7xl mb-1 text-5xl font-bold sm:mt-3.5 sm:text-6xl md:mt-1.5 md:text-6xl'>
            Acerca De
            <div className='mt-2 h-0.5 w-60 bg-rose-300 md:w-80'></div>
          </h1>

          <h2 className='mb-5 w-[350px] text-center text-2xl font-light leading-loose md:w-[450px] md:text-4xl'>
            <span className='text-7xl font-bold text-red-300'>VITA </span>
            es una aplicación para monitorear tu salud a todo momento y recibir
            asesoramiento a través de inteligencia artificial y expertos en la
            salud.
          </h2>
        </div>
      </div>
    </div>
  )
}

export default About
