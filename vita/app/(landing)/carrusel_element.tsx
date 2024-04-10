"use client"
import React from 'react';
import Image from 'next/image';

interface CarouselItem {
  header: string;
  description: string;
  imageUrl: string;
}

interface AdaptableCarouselProps {
  item: CarouselItem;
}



const AdaptableCarousel: React.FC<AdaptableCarouselProps> = ({ item }) => {
  return (
    <div className=' my-10 flex flex-col align-middle justify-between gap-10 bg-white rounded-lg h- 5/6 '>
      <h1 className='text-md sm:text-4xl font-sans font-bold mt-5 ml-5 self-center'>
        {item.header}
      </h1>
      <div className='flex items-center justify-center text-center gap-20 mx-8 h-72 '>
        <p className='w-2/4 text-md sm:text-xl'>{item.description} </p>
        <Image
      src={item.imageUrl}
      width={70}
      height={60}
      alt="Picture of the author"
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
    />
      </div>
      <div className='w-full h-8 bg-rose-400'>
      </div>
    </div>
  );
};

export default AdaptableCarousel;