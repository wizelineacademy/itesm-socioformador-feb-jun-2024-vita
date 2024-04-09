import React from 'react';
import Image from 'next/image';
import Button from "../components/Button";
import Information from '../components/information/Information';

const Home: React.FC = () => {

  return (
    <div id="Container" className="flex flex-col md:flex-row lg:flex-row">
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

      <div id="Right Image" className='pl-20'>
        <Image
          src="/heart.svg"
          className="md:w-700 lg:w-600" // Tamaño condicional de la imagen
          width={700}
          height={600}
          alt="Picture of the author"
        />
      </div>
            
    </div>  
  );
};

export default Home;
