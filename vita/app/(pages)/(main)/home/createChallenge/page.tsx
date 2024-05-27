'use client';

import React, { useState } from "react";
import { FaBell } from 'react-icons/fa';
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CreateChallenge = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [month, setMonth] = useState<number | string>("");
  const [year, setYear] = useState<number | string>(new Date().getFullYear());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/challenges', {
        name,
        description,
        month: parseInt(month as string, 10),
        year: parseInt(year as string, 10)
      });

      Swal.fire({
        title: 'Éxito',
        text: 'Reto creado exitosamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      router.push("/home/");
      router.refresh();

      
    } catch (error: any) { // Aquí se especifica el tipo de la variable 'error'
      if (error.response && error.response.status === 409) {
        // Si el servidor devuelve un código de estado 409 (Conflict), significa que ya existe un reto para el mes y año seleccionados
        Swal.fire({
          title: 'Error',
          text: `Ya existe un reto para el mes ${getMonthName(parseInt(month as string, 10))} del año ${year}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        // Para otros errores, muestra un mensaje de error genérico
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al crear el reto',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  // Función para obtener el nombre del mes
  const getMonthName = (month: number): string => {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[month - 1];
  };

  return (
    <div className="flex flex-col px-5 py-4 text-4xl font-bold lg:justify-start md:justify-start justify-center">
      <span className="flex flex-row"> 
        <h1 className="mr-2 text-home-title">Crear Reto Mensual</h1>
        <FaBell size={36} color="white"/>
      </span> 
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mt-4 flex flex-col">
          <label htmlFor="name" className="text-black text-3xl font-bold mb-6">Nombre del reto</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-2xl py-2 px-6 rounded-full bg-input-home w-full md:w-3/4 "
            required
          />
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="description" className="text-black text-3xl font-bold mb-6">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-2xl py-2 px-6 rounded-2xl bg-input-home w-full md:w-3/4  resize-none h-[100px]"
            required
          />
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="month" className="text-black text-3xl font-bold mb-6">Mes</label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="text-2xl py-2 px-6 rounded-full bg-input-home w-full md:w-3/4 "
            required
          >
            <option value="">Seleccione un mes</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="year" className="text-black text-3xl font-bold mb-6">Año</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="text-2xl py-2 px-6 rounded-full bg-input-home w-full md:w-3/4 "
            min="2024"
            required
          />
        </div>
        <div className="flex lg:justify-start lg:items-start ml-2 mb-6 mt-4">
          <button
            type="submit"
            className="rounded-full mt-2 text-2xl px-3 
                      py-2 bg-button-home w-80 text-white"
          >
            Crear Reto
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default CreateChallenge;
