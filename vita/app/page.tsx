"use client"
import React from 'react';
import Image from 'next/image';

import PinkStrokeButton from '../app/Src/Components/LandingPageButton';

const HomePage: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div style={{ backgroundImage: "url('Bg.png')", backgroundSize: 'cover', minHeight: '100vh' }}>
      <div>Nav Bar</div>
      <div id='Flex-Container' className=" flex flex-row flex-wrap justify-center gap-16">
        <div id='Left-Container' className='mt-16'>
          <h1 className="text-9xl font-bold mb-5">VITA</h1>
          <h2 className='text-3xl font-bold  mb-5'>La aplicación <br /> para toda tu <br /> <span className='text-red-300	3xl font-bold'>salud</span></h2>
          <h2 className='text-xl  mb-5'>Ejercicio, Dieta, Salud <br /> Atención Médica,  <br />todo en uno</h2>
          <PinkStrokeButton
          text="Regístrate"
          onClick={handleClick}
          width="200px"
          fontSize= "25px"
          />
        </div>
        <div id='Right-Container'>
          <Image src={"/Heart.png"} alt='Heart with beats' width={800} height={100}></Image>
        </div>
      </div>

      
    </div>
  );
};

export default HomePage;
