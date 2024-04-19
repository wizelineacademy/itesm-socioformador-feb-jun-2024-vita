
'use client';

import React, { useState, useEffect } from "react";
import { FaBell } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Reminders = () => {
  

  return (
    <>
       <div className="flex  flex-row px-5 py-4 text-4xl font-bold 
        lg:justify-start md:justify-start justify-center"> 
          <h1 className="mr-2 text-white  w-[200px]">Crea un recordatorio</h1>
          <FaBell size={36}  color="white"/>
      </div>
      <div className="flex flex-col  lg:justify-start md:justify-start justify-center px-5 ">
        <form>
            <h2 className="text-3xl text-white">Descripción</h2>
            <textarea id="Comentarios" required   placeholder="Describe el recordatorio..." className="mt-8 w-[85%]
             h-[150px] px-4 py-2 rounded-3xl bg-reminders-input text-white  resize-none">
            </textarea>
            <h2 className="text-3xl text-white mt-4">Frecuencia</h2>
            <div className="flex flex-row   justify-between">
                <div className="flex flex-col mt-4">
                    <h2 className="text-2xl text-white mb-4">Número de horas</h2>
                    <input
                        type="number"
                        name="weight"
                        // value={editedData?.weight || ""}
                        // onChange={handleInputChange}
                        placeholder="0"
                        className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-40"
                        min={1}
                        required 
                    />
                </div>
                <div className="flex flex-col mt-4  lg:w-3/4">
                    <h2 className="text-2xl text-white mb-4">Número de días</h2>
                    <input
                        type="number"
                        name="weight"
                        placeholder="0"
                        // value={editedData?.weight || ""}
                        // onChange={handleInputChange}
                        className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-40"
                        min={1}
                        required 
                    />
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <h2 className="text-3xl text-white mt-4">Inicio</h2>
                <div className="flex flex-row w-1/2">
                    <h2 className="text-3xl text-white mt-4 mr-6">Fin</h2>
                    <select
                        name="sex"
                        className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-60 mt-4"
                        required 
                    >
                                <option value="I">Indefinido</option>
                                <option value="D">Definido</option>
                    </select>
                </div>
            </div>
            
            <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex flex-row justify-between lg:gap-20">
                    <div className="flex flex-col mt-4 ">
                        <h2 className="text-2xl text-white mb-4">Número de horas</h2>
                        <input type="number" name="weight" placeholder="0" className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-40" min="1" required />
                    </div>
                    <div className="flex flex-col mt-4">
                        <h2 className="text-2xl text-white mb-4">Número de días</h2>
                        <input type="number" name="weight" placeholder="0" className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-40" min="1" required />
                    </div>
                </div>
                <div className="flex flex-row  justify-between lg:gap-20">
                    <div className="flex flex-col mt-4">
                        <h2 className="text-2xl text-white mb-4">Número de horas</h2>
                        <input type="number" name="weight" placeholder="0" className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-40" min="1" required />
                    </div>
                    <div className="flex flex-col mt-4">
                        <h2 className="text-2xl text-white mb-4">Número de días</h2>
                        <input type="number" name="weight" placeholder="0" className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-40" min="1" required />
                    </div>
                </div>
            </div>
            <div className=" flex lg:justify-end justify-center ">
                <button className=" lg:justify-end text-white text-2xl 
                bg-reminders-color mt-4 px-4 py-2 w-[280px] rounded-3xl ">
                    Crea un recordatorio
                </button>
            </div>
            

        </form>
      </div>
      
    </>
  );
};

export default Reminders;
