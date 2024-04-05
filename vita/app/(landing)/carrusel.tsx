"use client"
import React from 'react';
import Image from 'next/image';
import Button from "../components/Button";
import AdaptableCarousel from "../(landing)/carrusel_element"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../components/carousel"


const carouselItem1= {
      header: 'Item 1',
      description: 'Description for item 1. This is an adaptable description.',
      imageUrl: '/AiImage.svg',
      rectangleColor: '#FF5733',
}
const carouselItem2= {
  header: 'Item 1',
  description: 'Description for item 1. This is an adaptable description.',
  imageUrl: '/AiImage.svg',
  rectangleColor: '#FF5733',
}
const carouselItem3= {
  header: 'Item 1',
  description: 'Description for item 1. This is an adaptable description.',
  imageUrl: '/AiImage.svg',
  rectangleColor: '#FF5733',
}

const CarruseLanding: React.FC = () => {

  return (
   // 50% on small screens and 33% on larger screens.
  <Carousel>
    <CarouselContent className=' my-10'>
      <CarouselItem className="md:basis-1/2 lg:basis-1/3 "><AdaptableCarousel item={carouselItem1}/></CarouselItem>
      <CarouselItem className="md:basis-1/2 lg:basis-1/3 "><AdaptableCarousel item={carouselItem2} /></CarouselItem>
      <CarouselItem className="md:basis-1/2 lg:basis-1/3 "><AdaptableCarousel item={carouselItem3} /></CarouselItem>
    </CarouselContent>
  </Carousel>

  );
};

export default CarruseLanding;




  
  