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
    <div className=' flex flex-col align-middle justify-center gap-20 bg-white rounded-lg'>
      <h1 className='text-4xl font-sans font-bold mt-5 ml-5'>
        {item.header}
      </h1>
      <div className='flex align-middle justify-center text-center gap-10 mx-8 text-2xl'>
        <p className='w-2/4'>{item.description} </p>
        <Image
      src={item.imageUrl}
      width={500}
      height={500}
      alt="Picture of the author"
    />
      </div>
      <div className='bg-teal-400 w-full h-8'>
      </div>
    </div>
  );
};

export default AdaptableCarousel;