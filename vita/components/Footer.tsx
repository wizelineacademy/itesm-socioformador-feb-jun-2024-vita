"use client"
import React from 'react';
import Image from 'next/image';
import Button from "@/components/buttons/Button";
import Link from 'next/link';



const Footer: React.FC = () => {

  return (
    <div className='bg-black bg-opacity-40 h-1/5 flex justify-around items-center flex-wrap'>
          <div className='flex flex-col gap-3'>
            <h1 className='text-red-300 text-5xl font-bold'>VITA</h1>
            <h2 className='text-white text-3xl font-bold'>Contáctanos</h2>
            <div className='flex gap-10'>
              <Image
                src="/icons/instalogo.svg"
                width={40}
                height={40}
                alt="Picture of the author"
              />
              <Image
                src="/icons/metalogo.svg"
                width={40}
                height={40}
                alt="Picture of the author"
              />
            </div>
          </div>
          <div className='flex flex-col text-white gap-3 font-bold text-sm sm:text-sm my-36'>
            <Link href="https://github.com/Bdelas777"><p >@Bdelas777</p></Link>
            <Link href="https://github.com/JulioEmmmanuel"><p>@JulioEmmmanuel </p> </Link>
            <Link href="https://github.com/SofiRegiM"><p>@SofiRegiM</p></Link>
            <Link href="https://github.com/edan11v"><p>@edan11v </p></Link>
          </div>
    </div>
  );
};

export default Footer;
