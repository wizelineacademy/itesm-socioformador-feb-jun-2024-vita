"use client"
import React from 'react';

interface CarouselItem {
  header: string;
  description: string;
  imageUrl: string;
  rectangleColor: string;
}

interface AdaptableCarouselProps {
  items: CarouselItem[];
}

const AdaptableCarousel: React.FC<AdaptableCarouselProps> = ({ items }) => {
  return (
    <div className="max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden shadow-md">
      {items.map((item, index) => (
        <div key={index} className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{item.header}</div>
          <p className="text-gray-700 text-base">{item.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex-shrink-0">
              <img className="h-12 w-12 rounded-full" src={item.imageUrl} alt={item.header} />
            </div>
            <div className="ml-4">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-24 mt-1 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="h-6 w-full mt-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default AdaptableCarousel;