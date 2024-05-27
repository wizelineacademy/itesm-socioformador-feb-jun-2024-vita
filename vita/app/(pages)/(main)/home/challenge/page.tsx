'use client';

import React from "react";
import { FaTrophy, FaMedal, FaUsers } from 'react-icons/fa';
import Link from 'next/link';

const Challenge = () => {
  return (
    <>
      <div className="flex px-5 py-4 text-5xl font-bold justify-center lg:justify-start md:justify-start">
        <h1 className="mr-2 text-home-title">Retos</h1>
        <FaTrophy size={36} className="text-home-title" />
      </div>
      <div className="lg:mt-20 flex flex-col lg:flex-row items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <Link href="/home/getChallenge">
            <div className="bg-[#1D154A] flex flex-col md:flex-row items-center justify-center md:w-80 lg:w-[340px] sm:w-[330px] w-[240px] p-6 md:p-8 mt-4 rounded-3xl transition-colors duration-300 ease-in-out hover:bg-color-home5 cursor-pointer">
              <p className="text-white font-bold text-2xl lg:text-3xl mb-4 md:mb-0 md:mr-6">
                Ver reto y ranking
              </p>
              <FaMedal size={80} className="text-white hidden md:block" />
            </div>
          </Link>
          <Link href="/home/badges">
            <div className="bg-color-home5 flex items-center justify-center md:flex-row flex-col md:w-80 lg:w-[340px] sm:w-[330px] w-[240px] p-6 md:p-12 mt-4 rounded-3xl transition-colors duration-300 ease-in-out hover:bg-[#1D154A] cursor-pointer">
              <h3 className="text-white font-bold text-2xl lg:text-3xl md:mr-6">
                Logros
              </h3>
              <FaTrophy size={80} className="text-white hidden md:block" />
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-color-home6 flex flex-col items-center justify-center md:w-80 lg:w-[340px] sm:w-[330px] w-[240px] p-6 mt-4 rounded-3xl transition-colors duration-300 ease-in-out hover:bg-color-home5 cursor-pointer">
            <h3 className="text-white font-bold text-2xl lg:text-3xl mb-4">
              Evaluación entre pares
            </h3>
            <FaUsers size={60} className="text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Challenge;
