"use client"
import React from 'react';
import Image from 'next/image';


const About: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className='flex flex-col justify-center align-middle text-white font-notosans h-screen'>
        <div id='Flex-Container' >
            <div id='About_Container' className='flex justify-center items-center flex-col gap-12'>
                <h1 className="text-5xl font-bold mb-1 sm:text-6xl md:text-6xl lg:7xl sm:mt-3.5 md:mt-1.5">
                  Acerca De
                  <div className="h-0.5 mt-2 w-60 md:w-80 bg-rose-300"></div>
                </h1>
                


                <h2 className=' text-2xl md:text-4xl mb-5 text-center  leading-loose font-light	
                w-[350px] md:w-[450px]  '>
                  <span className='text-red-300 text-7xl font-bold'>VITA </span>
                   es una aplicación para monitorear tu salud a todo momento y recibir asesoramiento a 
                   través de inteligencia artificial y expertos en la salud. 
                </h2>
            </div>
        </div>
        

      
    </div>
  );
};

export default About;
