"use client"
import React, { useState, useEffect } from "react";
import { FaBell } from 'react-icons/fa';
import axios from "axios";
import Swal from "sweetalert2";
import { getMonthName } from "@/lib/DaysFormat/days";

const GetChallenge = () => {
  const [challenge, setChallenge] = useState<{
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  } | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
       
        const response = await axios.get(`/api/challenges`);
        setChallenge(response.data);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener el reto del mes actual',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    fetchChallenge();
  }, []);

 

  return (
    <div className="flex flex-col px-5 py-4 text-4xl font-bold lg:justify-start md:justify-start justify-center">
      <span className="flex items-center mb-4"> 
        <h1 className="mr-2 text-home-title">Reto de {getMonthName()}</h1>
        <FaBell size={36} color="white"/>
      </span> 
      {challenge ? (
        <div className="mt-6">
          <div className="mt-4 flex flex-col">
            <label htmlFor="name" className="text-black text-3xl font-bold mb-6">Nombre del reto</label>
            <div className="text-2xl py-2 px-6 rounded-full bg-input-home w-full md:w-3/4">
              {challenge.name}
            </div>
          </div> 
          <div className="mt-4 flex flex-col">
            <label htmlFor="description" className="text-black text-3xl font-bold mb-6">Descripción</label>
            <div className="text-2xl py-2 px-6 rounded-full bg-input-home w-full md:w-3/4">
              {challenge.description}
            </div>
          </div>
         
        </div>
      ) : (
        <p className="mt-6 text-3xl">No hay un reto disponible para el mes actual.</p>
      )}
    </div>
  );
};

export default GetChallenge;
