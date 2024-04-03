import React from 'react';
import Image from 'next/image';


/**
 * @author: Bernardo de la Sierra
 * @version 2.0.0 
 * Component representing the Nutrition Home page
 */
const NutritionalPlan = () => {
 
  return (
    <>

      <div id="Title" className="flex text-white px-5 py-4 text-5xl font-bold 
        lg:justify-start md:justify-start justify-center">
        <h1 className="mr-2">Nutrición</h1>
        <Image src="/Food.svg" alt="Imagen 2" width={45} height={45} />
      </div>

    </>
  );
};

export default NutritionalPlan;
