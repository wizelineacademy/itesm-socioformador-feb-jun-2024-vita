// vita/app/(main)/nutrition/goals/page.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const GoalsPage = () => {
  return (
    <div className="h-screen overflow-auto bg-[#2C0521]">
      <div className="mt-4 ml-4 mr-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <h2 className="text-white text-4xl font-bold lg:text-5xl md:mt-5">Crear</h2>
            </div>
            <div className="flex items-center">
              <h2 className="text-white text-4xl font-bold lg:text-5xl">Meta</h2>
              <Image src="/Food.svg" alt="Imagen Meta" width={45} height={45} className='lg:w-24 lg:h-24 lg:pb-3' 
              style={{ marginLeft: '2rem' }} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start lg:flex-row lg:mt-5 lg:items-end lg:justify-start lg:space-x-3">
          <p className="text-white">Contenido de Crear Meta</p>
        </div>

        <div className="flex justify-start">
          <Link href="/nutrition">
            <a className="text-white underline">
              Volver a Nutrición
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
