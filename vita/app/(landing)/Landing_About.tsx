"use client"
import React from 'react';
import Image from 'next/image';


const HomePage: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className='flex flex-col justify-center align-middle text-white font-notosans h-screen'>
        <div id='Flex-Container' >
            <div id='About_Container' className='flex justify-center items-center flex-col gap-12'>
                <h1 className="text-8xl font-bold mb-5">Acerca De</h1>
                <Image src={"/Line.png"} alt='Line divider' width={300} height={10}></Image>

                <h2 className='text-5xl  mb-5 text-center w-5/12 leading-loose font-light	'><span className='text-red-300 text-7xl font-bold'>VITA</span> es una aplicación para monitorear tu salud a todo momento y recibir asesoramiento a través de inteligencia artificial y expertos en la salud. </h2>
            </div>
        </div>
        

      
    </div>
  );
};

export default HomePage;
