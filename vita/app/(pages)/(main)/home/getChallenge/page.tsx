
"use client"
import React, { useState, useEffect } from "react";
import { FaBell } from 'react-icons/fa';
import axios from "axios";
import Swal from "sweetalert2";

const GetChallenge = () => {
  const [challenge, setChallenge] = useState<{ name: string, description: string, startDate: string, endDate: string } | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get('/api/challenges');
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
      <span className="flex flex-row"> 
        <h1 className="mr-2 text-home-title">Reto del Mes</h1>
        <FaBell size={36} color="white"/>
      </span> 
      {challenge ? (
        <div className="mt-6">
          <h2 className="text-3xl font-bold mb-4">{challenge.name}</h2>
          <p className="text-xl">{challenge.description}</p>
          <p className="text-xl mt-4">Fecha de inicio: {challenge.startDate}</p>
          <p className="text-xl">Fecha de fin: {challenge.endDate}</p>
        </div>
      ) : (
        <p className="mt-6 text-xl">No hay un reto disponible para el mes actual.</p>
      )}
    </div>
  );
};

export default GetChallenge;
