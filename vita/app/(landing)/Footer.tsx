"use client"
import React from 'react';
import Image from 'next/image';
import Button from "../components/Button";



const HomePage: React.FC = () => {

  return (
    <div className='flex flex-col justify-center align-middle text-white font-notosans h-screen'>
        <div id='Flex-Container' >
            <div id='About_Container' className='flex justify-center items-center flex-col gap-12 '>
                <h1 className="text-8xl font-bold mb-5">Únete a <span className='text-red-300 text-9xl font-bold'>VITA</span> </h1>
                <Image src={"/Line.png"} alt='Line divider' width={300} height={10}></Image>

                <h2 className='text-5xl  mb-5 text-center w-5/12 leading-loose font-light	'> Y disfruta de todos los  <span className='text-red-300 text-7xl font-bold'> beneficios</span> </h2>
                <Button 
                        borderColor="border-custom-red"
                        label= "Regístrate" 
                        outline
                        big
                        onClick={() => {}}
                      
                    />  
            </div>
        </div>
        

      
    </div>
  );
};

export default HomePage;
