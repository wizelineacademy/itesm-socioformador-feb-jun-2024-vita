
'use client';

import React, { useState } from "react";
import { FaRunning } from 'react-icons/fa';


const Exercise = () => {

  return (
    <>
       <div className="flex   px-5 py-4 text-5xl font-bold 
        lg:justify-start md:justify-start justify-center">
        <h1 className="mr-2 text-white ">Ejercicios  </h1>
        <FaRunning  size={36}  color="white"/>
      </div>
      <div className="flex flex-row">
            <div className="flex flex-col ">
                <div className="bg-mid-green flex flex-col p-8 py-8 items-center justify-center w-80 rounded-3xl">
                    <p className="text-white font-bold text-4xl mb-4 px-6">Crea tu rutina personalizada</p>
                    <FaRunning size={120} color="white" />
                </div>

            </div>
      </div>

    </>
  );
};

export default Exercise;
