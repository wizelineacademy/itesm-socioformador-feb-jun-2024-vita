"use client"
import React from 'react';
import Image from 'next/image';
import Button from "../components/Button";



const HomePage: React.FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className='flex flex-col justify-center align-middle text-white font-notosans h-screen'>=
            <div id='About_Container' className='flex justify-center items-center flex-col gap-12 '>
                <h1 className="text-5xl font-bold mb-5 sm:text-6xl md:text-6xl lg:7xl sm:mt-3.5 md:mt-1.5">Únete a <span className='text-red-300 text-5xl font-bold mb-5 sm:text-6xl md:text-6xl lg:7xl sm:mt-3.5 md:mt-1.5'>VITA</span> </h1>
                <Image src={"/Line.png"} alt='Line divider' width={300} height={10}></Image>

                <h2 className=' sm:text-4xl md:text-4xl mb-5 text-center w-5/12 leading-loose font-light	'> Y disfruta de todos los  <span className='text-red-300 text-5xl font-bold mb-5 sm:text-6xl md:text-6xl lg:7xl sm:mt-3.5 md:mt-1.5'> beneficios</span> </h2>
                <Button 
                        borderColor="border-custom-red"
                        label= "Regístrate" 
                        outline
                        big
                        onClick={() => {}}
                      
                    />  
            </div>
        

      
    </div>
  );
};

export default HomePage;
