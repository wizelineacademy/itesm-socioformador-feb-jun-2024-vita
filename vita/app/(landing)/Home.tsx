"use client"
import React from 'react';
import Image from 'next/image';
import Button from "../components/Button";
import Information from '../components/information/Information';


const Home: React.FC = () => {

  return (
    <div id="Container" className="flex justify-center items-center flex-wrap h-screen">
            <div id="Left Information" className="flex flex-col items-start px-20"> 
                <Information />
                <div className="pt-4">
                    <Button 
                        borderColor="border-custom-red"
                        label= "Regístrate" 
                        outline
                        big
                        onClick={() => {}}
                      
                    />  
                </div>
            </div>

            <div id="Right Image">
            <Image
                src="/heart.svg"
                width={1000}
                height={1000}
                alt="Picture of the author"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                
            />
            </div>
        </div>  
  );
};

export default Home;
