"use client"
import React from 'react';
import Image from 'next/image';
import Button from "../components/Button";



const Footer: React.FC = () => {

  return (
    <div className='bg-black bg-opacity-40 h-60 flex justify-around items-center'>
          <div className='flex flex-col gap-3'>
            <h1 className='text-red-300 text-5xl font-bold'>VITA</h1>
            <h2 className='text-white text-3xl font-bold'>Contáctanos</h2>
            <div className='flex gap-10'>
              <Image
                src="/instalogo.svg"
                width={40}
                height={40}
                alt="Picture of the author"
              />
              <Image
                src="/metalogo.svg"
                width={40}
                height={40}
                alt="Picture of the author"
              />
            </div>
          </div>
          <div className='flex flex-col text-white gap-3 font-bold'>
            <p>@Bdelas777</p>
            <p>@JulioEmmmanuel </p>
            <p>@KrakenDominguezz </p>
            <p>@SofiRegiM</p>
            <p>@edan11v </p>
          </div>
    </div>
  );
};

export default Footer;
