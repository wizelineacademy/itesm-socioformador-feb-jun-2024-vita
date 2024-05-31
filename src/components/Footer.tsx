'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer: React.FC = () => {
  /**
   * @description Pie de pagina donde se ponen los autores
   * @author Bernardo de la Sierra
   * @version 1.0.1
   * @returns Nada
   */
  return (
    <div className='flex h-1/5 flex-wrap items-center justify-around bg-black bg-opacity-40'>
      <div className='flex flex-col gap-3'>
        <h1 className='text-5xl font-bold text-red-300'>VITA</h1>
        <h2 className='text-3xl font-bold text-white'>Contáctanos</h2>
        <div className='flex gap-10'>
          <Image
            src='/icons/instalogo.svg'
            width={40}
            height={40}
            alt='Picture of the author'
          />
          <Image
            src='/icons/metalogo.svg'
            width={40}
            height={40}
            alt='Picture of the author'
          />
        </div>
      </div>
      <div className='my-36 flex flex-col gap-3 text-sm font-bold text-white sm:text-sm'>
        <Link href='https://github.com/Bdelas777'>
          <p>@Bdelas777</p>
        </Link>
        <Link href='https://github.com/JulioEmmmanuel'>
          <p>@JulioEmmmanuel </p>{' '}
        </Link>
        <Link href='https://github.com/SofiRegiM'>
          <p>@SofiRegiM</p>
        </Link>
        <Link href='https://github.com/edan11v'>
          <p>@edan11v </p>
        </Link>
      </div>
    </div>
  )
}

export default Footer
