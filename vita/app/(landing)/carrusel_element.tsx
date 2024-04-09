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
    <div className=' my-10 flex flex-col align-middle justify-between gap-20 bg-white rounded-lg h-96 '>
      <h1 className='text-4xl font-sans font-bold mt-5 ml-5 self-center w-96'>
        {item.header}
      </h1>
      <div className='flex align-middle justify-center text-center gap-10 mx-8 '>
        <p className='w-1/4 text-xl'>{item.description} </p>
        <Image
      src={item.imageUrl}
      width={60}
      height={60}
      alt="Picture of the author"
    />
      </div>
      <div className='w-full h-8 bg-rose-400'>
      </div>
    </div>
  );
};

export default AdaptableCarousel;