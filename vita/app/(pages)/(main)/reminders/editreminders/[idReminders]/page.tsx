'use client'
import React, { useState, useEffect } from "react";
import { FaBell } from 'react-icons/fa';

import axios from "axios";
import Swal from 'sweetalert2';

const EditReminders = ({ params }: { params: { idReminders: string } }) => {

  const idReminders = params.idReminders;
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState<reminderData | null>(null);
  const [selectedOption, setSelectedOption] = useState(userData && userData.endDays === null ? "D" : "I");


  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  interface reminderData {
    idReminders: number;
    idUser: number;
    name: string;
    frequency: number;
    startTime: string;
    endTime: string | null; // Ahora endTime puede ser null
    description: string;
    frequencyDays: number; // Agregamos frequencyDays
    frequencyHours: number; // Agregamos frequencyHours
    startDays: string; // Nuevas variables para almacenar los días en startTime y endTime
    startHours: string;
    endDays: string | null; // endTime puede ser null
    endHours: string | null; // endTime puede ser null
  }

  interface editreminderData {
    idReminders: number;
    idUser: number;
    name: string;
    frequency: number;
    startTime: string;
    endTime: string | null; // Ahora endTime puede ser null
    description: string;
    frequencyDays: number; // Agregamos frequencyDays
    frequencyHours: number; // Agregamos frequencyHours
    startDays: string; // Nuevas variables para almacenar los días en startTime y endTime
    startHours: string;
    endDays: string | null; // endTime puede ser null
    endHours: string | null; // endTime puede ser null
  }

  const formatDays = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/reminders/${idReminders}`);
        const fetchedData = response.data;

        // Asignamos los datos recibidos a userData
        setUserData({
          ...fetchedData,
          frequencyDays: calculateDays(fetchedData.frequency),
          frequencyHours: calculateHours(fetchedData.frequency),
          startDays: calculateDaysTime(fetchedData.startTime),
          startHours: calculateHoursTime(fetchedData.startTime),
          endDays: fetchedData.endTime ? calculateDaysTime(fetchedData.endTime) : null,
          endHours: fetchedData.endTime ? calculateHoursTime(fetchedData.endTime) : null
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: "Ocurrió un error al recuperar los datos",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    getData();
  }, [idReminders]);

  // Función para calcular días
  const calculateDays = (frequencyInSeconds: number): number => {
    return Math.floor(frequencyInSeconds / (24 * 3600));
  };

  // Función para calcular horas
  const calculateHours = (frequencyInSeconds: number): number => {
    return Math.floor((frequencyInSeconds % (24 * 3600)) / 3600);
  };

  // Función para calcular días
  const calculateDaysTime = (dateTimeString: string): number => {
    const [days] = dateTimeString.split('T');
    const [date] = days.split('D');
    return parseInt(date);
  };

  // Función para calcular horas

  const calculateHoursTime = (dateTimeString: string | null): string | null => {
    if (!dateTimeString) return null;
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  // Función para cancelar la edición y volver a los datos originales
  const handleCancelEdit = () => {
    setEditMode(false);
    //setEditedData(userData); // Restaura los datos editados a los datos originales
  };

  return (
    <>
      <style>{`
                /* Estilo para todos los navegadores */
                input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1); /* Safari y Chrome */
                }
                input[type="date"]::-webkit-inner-spin-button,
                input[type="date"]::-webkit-clear-button {
                    filter: invert(1); /* Safari */
                }
                input[type="date"]::-webkit-calendar-picker-indicator:after {
                    filter: invert(0); /* Safari */
                }
                input[type="date"]::-ms-clear {
                    filter: invert(1); /* IE */
                }
                /* Estilo para todos los navegadores */
                input[type="time"]::-webkit-calendar-picker-indicator {
                    filter: invert(1); /* Safari y Chrome */
                }
                input[type="time"]::-webkit-inner-spin-button,
                input[type="time"]::-webkit-clear-button {
                    filter: invert(1); /* Safari */
                }
                input[type="time"]::-webkit-calendar-picker-indicator:after {
                    filter: invert(0); /* Safari */
                }
                input[type="time"]::-ms-clear {
                    filter: invert(1); /* IE */
                }
            `}</style>
      <div className="flex flex-row px-5 py-4 text-4xl font-bold lg:justify-start md:justify-start justify-center">
        <h1 className="mr-6 text-white w-[200px]">Recordatorio</h1>
        <FaBell size={36} color="white"/>
      </div>
      <div className="flex flex-col  lg:justify-start md:justify-start justify-center px-5 ">
        <form>
          <h2 className="text-3xl text-white">Nombre</h2>
            {editMode ? (
              <p></p>
              ) : (            
                <div  className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input" >
                  {userData && userData.name}
                </div>           
              )}
          <h2 className="text-3xl text-white mt-4">Descripción</h2>
            {editMode ? (
              <p></p>
              ) : (            
                <div   className="mt-4 w-[85%] h-[100px] px-4 py-2 rounded-3xl bg-reminders-input text-white  overflow-auto" >
                  {userData && userData.description}
                </div>           
              )}
              <h2 className="text-3xl text-white mt-4">Frecuencia</h2>
              <div className="flex flex-row   justify-between">
                <div className="flex flex-col mt-4">
                  <h2 className="text-2xl text-white mb-4">Número de horas</h2>
                  {editMode ? (
                    <p></p>
                    ) : (            
                      <div  className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input" >
                        {userData && userData.frequencyHours}
                      </div>           
                    )}
                </div>
                <div className="flex flex-col mt-4 lg:w-3/4">
                <h2 className="text-2xl text-white mb-4">Número de días</h2>
                  {editMode ? (
                    <p></p>
                    ) : (            
                      <div  className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input" >
                        {userData && userData.frequencyDays}
                      </div>           
                    )}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <h2 className="text-3xl text-white mt-4">Inicio</h2>
                  <div className="flex flex-row w-1/2">
                    <h2 className="text-3xl text-white mt-4 mr-6">Fin</h2>
                      <div 
                        className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-60 mt-4"
                      >
                        {userData && userData.endDays ? "Definido" : "Indefinido"}
                      </div>
                  </div>
              </div>
           
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="flex flex-row justify-between lg:gap-16">
                <div className="flex flex-col mt-4 ">
                  <h2 className="text-2xl text-white mb-4">Fecha de Inicio</h2>
                  {editMode ? (
                                  
                    <p></p>   
                  ) : (          
                    <div className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input">
                      {userData && formatDays(userData.startDays)}
                    </div>        
                    )}
                </div>
                <div className="flex flex-col mt-4 ">
                  <h2 className="text-2xl text-white mb-4">Hora de Inicio</h2>
                  {editMode ? (
                                  
                    <p></p>
                  ) : (          
                    <div className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input">
                      {userData && userData.startHours}
                    </div>        
                    )}
                </div>
                <div className="flex flex-col mt-4 ">
                  
                  {editMode ? (
                    <> 
                      <h2 className="text-2xl text-white mb-4">Fecha de fin</h2>           
                      <p></p>   
                    </>
                  ) : (   

                    <>
                    {userData && userData.endDays && (
                      <> 
                      <h2 className="text-2xl text-white mb-4">Fecha de fin</h2>

                      <div className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input">
                        {formatDays(userData.endDays)}
                      </div>
                      </>
                    )}
                    </>       
                    )}
                </div>
                <div className="flex flex-col mt-4 ">
                  
                  {editMode ? (         
                    <> 
                      <h2 className="text-2xl text-white mb-4">Hora de fin</h2>           
                      <p></p>   
                    </>
                  ) : (      
                    <>
                    {userData && userData.endDays && (
                      <> 
                      <h2 className="text-2xl text-white mb-4">Fecha de fin</h2>

                      <div className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input">
                      {userData && userData.endHours}
                      </div>
                      </>
                    )}
                    </>
                    )}
                </div>
              </div>
            </div>
            {!editMode ? (
                <div className="flex lg:justify-center lg:items-center ml-2 mb-6">
                  <button onClick={handleCancelEdit} className="rounded-full mt-2 text-2xl px-3 
                    py-2 bg-mid-red w-60 text-white mr-6">
                        Eliminar
                    </button>
                    <button
                        onClick={() => setEditMode(true)}
                        className="rounded-full mt-2 text-2xl py-2 bg-reminders-color w-60 text-white"
                    >
                        Editar
                    </button>
                </div>
            ) : (
                <>
                <div className="flex lg:justify-center lg:items-center ml-2 mb-6 ">
                    <button onClick={handleCancelEdit} className="rounded-full mt-2 text-2xl px-3 
                    py-2 bg-mid-red w-60 text-white mr-6">
                        Cancelar
                    </button>
                    <button  type="submit" className="rounded-full mt-2 text-2xl px-3 
                    py-2 bg-reminders-color w-70 text-white">
                        Guardar Cambios
                    </button>
                </div>   
                </>
            )}
            

        </form>
      </div>
    </>
  );
};


export default EditReminders;
