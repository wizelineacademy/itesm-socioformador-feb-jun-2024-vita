"use client"
import React from 'react';
import Image from 'next/image';

import PinkStrokeButton from '../app/Src/Components/LandingPageButton';

const HomePage: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className='flex flex-col justify-center align-middle' style={{ backgroundImage: "url('AboutBG.png')", backgroundSize: 'cover', minHeight: '100vh'  }}>
        <div id='Flex-Container' >
            <div id='About_Container' className='flex justify-center items-center flex-col gap-12'>
                <h1 className="text-6xl font-bold mb-5">Acerca De</h1>
                <Image src={"/Line.png"} alt='Line divider' width={300} height={10}></Image>

                <h2 className='text-4xl font-bold  mb-5 text-center	'><span className='text-red-300	4xl font-bold'>VITA</span> es una aplicación para <br /> monitorear tu salud a todo momento y <br /> recibir asesoramiento a través de  <br />inteligencia artificial y expertos en la <br />salud. </h2>
            </div>
        </div>
        

      
    </div>
  );
};

export default HomePage;
