'use client';

import Image from 'next/image';

const Nutrition = () => {
  return (
    <div className="h-screen bg-nutrition-background flex flex-col relative">
      <div className="hidden md:block lg:block absolute right-0">
        <Image src="/DE_Nutrition.svg" alt="Imagen 1" width={240} height={240} />
      </div>
      <div className="hidden md:block lg:block absolute right-0">
        <Image src="/DE_Nutrition2.svg" alt="Imagen 2" width={200} height={200} />
      </div>
      Nutrition Papa Azul
    </div>
  );
};

export default Nutrition;
