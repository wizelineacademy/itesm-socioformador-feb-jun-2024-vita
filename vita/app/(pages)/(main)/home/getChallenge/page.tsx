"use client";
import React, { useState, useEffect } from "react";
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

  const [ranking, setRanking] = useState<Array<{
    idUser: number;
    name: string;
    points: number;
  }> | null>(null);

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

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get(`/api/ranking`);
        setRanking(response.data);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener el ranking',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    fetchRanking();
  }, []);

  const getTrophyIcon = (index: number) => {
    if (index === 0) return "🏆"; 
    if (index === 1) return "🥈"; 
    if (index === 2) return "🥉"; 
    return "";
  };

  return (
    <div className="flex flex-col px-5 py-4 text-4xl font-bold 
    lg:justify-start md:justify-start justify-center ">
      <div className="mb-4 text-start">
        <h1 className="text-5xl text-home-title ">Reto de {getMonthName()}</h1>
      </div>
      
      {challenge ? ( 
        <div className="bg-white p-8 rounded-lg shadow-lg mt-6 w-full md:w-3/4  mx-auto ">
          <div className="flex flex-col mb-6">
            <label htmlFor="name" className="text-gray-700 text-3xl font-bold mb-4">Nombre del reto</label>
            <div className="text-2xl py-3 px-6 rounded-lg bg-blue-100 w-full">
              {challenge.name}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-gray-700 text-3xl font-bold mb-4">Descripción</label>
            <div className="text-2xl py-3 px-6 rounded-lg bg-blue-100 w-full">
              {challenge.description}
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-3xl text-center text-red-500">No hay un reto disponible para el mes actual.</p>
      )}

      <h1 className="text-5xl text-center text-home-title mt-10 mb-4">Ranking de Usuarios</h1>
      {ranking ? (
        <div className="space-y-4">
          {ranking.map((user, index) => (
            <div key={user.idUser} className={`flex items-start justify-between p-4 rounded-lg shadow-md w-full md:w-3/4 mx-auto
              ${index === 0 ? "bg-yellow-100" : index === 1 ? "bg-gray-200" : index === 2 ? "bg-yellow-300" : "bg-white"}`}>
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold text-blue-600">{getTrophyIcon(index)} {index + 1}</div>
                <div className="text-2xl font-bold text-gray-700">{user.name}</div>
              </div>
              <div className="text-2xl font-semibold text-gray-700">{user.points} puntos</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-3xl text-center text-red-500">No se pudo obtener el ranking.</p>
      )}
    </div>
  );
};

export default GetChallenge;
