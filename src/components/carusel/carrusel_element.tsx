'use client'
import React from 'react'
import Image from 'next/image'

interface CarouselItem {
  header: string
  description: string
  imageUrl: string
}

interface AdaptableCarouselProps {
  item: CarouselItem
}

const AdaptableCarousel: React.FC<AdaptableCarouselProps> = ({ item }) => {
  return (
    <div className='h- 5/6 my-10 flex flex-col justify-between gap-10 rounded-lg bg-white align-middle'>
      <h1 className='ml-5 mt-5 self-center font-sans text-2xl font-bold sm:text-4xl'>
        {item.header}
      </h1>
      <div className='mx-8 flex h-72 items-center justify-center gap-20 text-center'>
        <p className='w-2/4 text-lg sm:text-xl'>{item.description} </p>
        <Image
          src={item.imageUrl}
          width={70}
          height={60}
          alt='Picture of the author'
          sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='h-8 w-full bg-rose-400'></div>
    </div>
  )
}

export default AdaptableCarousel
