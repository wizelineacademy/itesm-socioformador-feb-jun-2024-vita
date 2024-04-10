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
      header: 'Inteligencia Artificial',
      description: 'Utilizando VITA recibiras planes y ayuda personalizada gracias a la Inteligencia Artificial.',
      imageUrl: '/AiImage.svg',
      rectangleColor: '#FF5733',
}
const carouselItem2= {
  header: 'Nutrición de Calidad',
  description: 'En Vita podrás observar tu progreso de metas de nutrición y generar un plan personalizado generado con Inteigencia Artificial.',
  imageUrl: '/Nutri.svg',
  rectangleColor: '#779787',
}
const carouselItem3= {
  header: 'Mejora tu sueño',
  description: 'Con VITA puedes tener recomendaciones personalizadas de sueño, al igual que establecer metas de sueño para que logres conseguir tu sueño ideal.',
  imageUrl: '/Sleeps.svg',
  rectangleColor: '#FF5733',
}

const CarruseLanding: React.FC = () => {

  return (
   // 50% on small screens and 33% on larger screens.
  
  <Carousel >
    <CarouselContent className='w-80 sm:w-auto'>
      <CarouselItem className='md:basis-1/2 lg:basis-1/3'><AdaptableCarousel item={carouselItem1}/></CarouselItem>
      <CarouselItem className='md:basis-1/2 lg:basis-1/3'><AdaptableCarousel item={carouselItem2} /></CarouselItem>
      <CarouselItem className='md:basis-1/2 lg:basis-1/3'><AdaptableCarousel item={carouselItem3} /></CarouselItem>
    </CarouselContent>
  </Carousel>

  );
};

export default CarruseLanding;




  
  