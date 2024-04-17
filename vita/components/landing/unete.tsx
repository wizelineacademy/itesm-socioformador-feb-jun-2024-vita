"use client"
import React from 'react';
import Link from 'next/link';
import Button from '@/components/buttons/Button';



const HomePage: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className='flex flex-col justify-center align-middle text-white font-notosans h-screen'>
            <div id='About_Container' className='flex justify-center items-center flex-col gap-12 '>
                <h1 className="text-5xl font-bold sm:text-6xl md:text-6xl lg:7xl sm:mt-3.5 md:mt-1.5">
                  Únete a  
                  <span className='text-red-300 text-5xl font-bold  sm:text-6xl md:text-6xl lg:7xl sm:mt-3.5 md:mt-1.5 ml-2'>
                     VITA
                  </span> 
                  <div className="h-0.5 w-84 bg-rose-300 mt-2"></div>
                </h1>
                

                <h2 className=' text-4xl md:text-4xl mb-5 text-center leading-loose font-light 	w-[400px] md:w-[450px]'>
                   Y disfruta de todos los  
                   <span className='text-red-300 text-5xl font-bold mb-5 sm:text-6xl md:text-6xl 
                   lg:7xl sm:mt-3.5 md:mt-1.5'> beneficios
                   </span>
                </h2>
                <Link href='/signup'>
                  <Button 
                          borderColor="border-custom-red"
                          label= "Regístrate" 
                          outline
                          big
                          onClick={() => {}}
                        
                      />  
                </Link>
               
            </div>
        

      
    </div>
  );
};

export default HomePage;
