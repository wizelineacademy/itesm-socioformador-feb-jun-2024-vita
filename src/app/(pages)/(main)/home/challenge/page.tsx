'use client'

import React from 'react'
import { FaTrophy, FaMedal, FaUsers } from 'react-icons/fa'
import Link from 'next/link'

const Challenge = () => {
  return (
    <>
      <div className='flex justify-center px-5 py-4 text-5xl font-bold md:justify-start lg:justify-start'>
        <h1 className='mr-2 text-home-title'>Retos</h1>
        <FaTrophy size={36} className='text-home-title' />
      </div>
      <div className='flex flex-col items-center justify-center gap-6 lg:mt-20 lg:flex-row'>
        <div className='flex flex-col items-center'>
          <Link href='/home/getChallenge'>
            <div className='mt-4 flex w-[240px] cursor-pointer flex-col items-center justify-center rounded-3xl bg-[#1D154A] p-6 transition-colors duration-300 ease-in-out hover:bg-color-home5 sm:w-[330px] md:w-80 md:flex-row md:p-8 lg:w-[340px]'>
              <p className='mb-4 text-2xl font-bold text-white md:mb-0 md:mr-6 lg:text-3xl'>
                Ver reto y ranking
              </p>
              <FaMedal size={80} className='hidden text-white md:block' />
            </div>
          </Link>
          <Link href='/home/badges'>
            <div className='mt-4 flex w-[240px] cursor-pointer flex-col items-center justify-center rounded-3xl bg-color-home5 p-6 transition-colors duration-300 ease-in-out hover:bg-[#1D154A] sm:w-[330px] md:w-80 md:flex-row md:p-12 lg:w-[340px]'>
              <h3 className='text-2xl font-bold text-white md:mr-6 lg:text-3xl'>
                Logros
              </h3>
              <FaTrophy size={80} className='hidden text-white md:block' />
            </div>
          </Link>
        </div>

        <Link href='/home/responseChallenge/'>
          <div className='flex flex-col items-center'>
            <div className='mt-4 flex w-[240px] cursor-pointer flex-col items-center justify-center rounded-3xl bg-color-home6 p-6 transition-colors duration-300 ease-in-out hover:bg-color-home5 sm:w-[330px] md:w-80 lg:w-[340px]'>
              <h3 className='mb-4 text-2xl font-bold text-white lg:text-3xl'>
                Evaluación entre pares
              </h3>
              <FaUsers size={60} className='text-white' />
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Challenge
