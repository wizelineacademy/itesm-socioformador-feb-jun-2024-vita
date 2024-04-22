
'use client';

import React, { useState, useEffect } from "react";
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

const Reminders = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("I");
  const [formData, setFormData] = useState({
      name: "",
      description: "",
      frequencyHours: 0,
      frequencyDays: 0,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: ""
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
          // Convertir horas y días a segundos y sumarlos
          const frequencyInSeconds = (formData.frequencyHours * 3600) + (formData.frequencyDays * 86400);
            alert(frequencyInSeconds)
          // Combinar fecha y hora de inicio
          const startTime = new Date(formData.startDate + "T" + formData.startTime);
          // Validar que startTime no sea menor que el día actual
          
          const currentDate = new Date();
          if (startTime < currentDate) {
            Swal.fire({
              title: 'Error',
              text: "Asegurese que la fecha y hora inicio sean mayores mayores a la hora y fecha actual ",
              icon: 'error',
              confirmButtonText: 'OK'
            });
            return;
          }
          // Combinar fecha y hora de fin si está definido
          let endTime = null;
          if (formData.endDate && formData.endTime) {
              endTime = new Date(formData.endDate + "T" + formData.endTime);
              // Validar que endTime no sea menor que startTime
              if (endTime < startTime) {
                Swal.fire({
                  title: 'Error',
                  text: "Asegurese que la fecha y hora fin sean mayores mayores a la hora y fecha de inicio ",
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
                return;
              }
          }

          console.log(formData.startDate)
          console.log(formData.startTime)
          console.log(startTime)
          const response = await axios.post('/api/reminders', {
              ...formData,
              frequency: frequencyInSeconds,
              startTime,
              endTime
          });

          Swal.fire({
            title: 'Éxito',
            text: 'El recordatorio se ha creado con éxito',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        router.replace("/reminders")
        router.refresh();
        
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: "Ocurrió un error al crear el recordatorio",
          icon: 'error',
          confirmButtonText: 'OK'
      });
      }
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
            <div className="flex  flex-row px-5 py-4 text-4xl font-bold lg:justify-start md:justify-start justify-center">
                <h1 className="mr-2 text-white  w-[200px]">Crea un recordatorio</h1>
                <FaBell size={36}  color="white"/>
            </div>
            <div className="flex flex-col  lg:justify-start md:justify-start justify-center px-5 ">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-3xl text-white">Nombre</h2>
                    <input 
                    required 
                    placeholder="Paracetamol" 
                    className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input" 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                    <h2 className="text-3xl text-white mt-4">Descripción</h2>
                    <textarea 
                    id="Comentarios" 
                    required 
                    placeholder="Describe el recordatorio..." 
                    className="mt-4 w-[85%] h-[100px] px-4 py-2 rounded-3xl bg-reminders-input text-white  resize-none"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    >
                    </textarea>
                    <h2 className="text-3xl text-white mt-4">Frecuencia</h2>
                    <div className="flex flex-row   justify-between">
                        <div className="flex flex-col mt-4">
                            <h2 className="text-2xl text-white mb-4">Número de horas</h2>
                            <input 
                              type="number" 
                              name="frequencyHours" 
                              placeholder="0" 
                              className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-40" 
                              min={0.5} 
                              max={12}
                              step="0.1"
                              value={formData.frequencyHours}
                              onChange={handleChange}
                              required 
                            />
                        </div>
                        <div className="flex flex-col mt-4  lg:w-3/4">
                            <h2 className="text-2xl text-white mb-4">Número de días</h2>
                            <input 
                              type="number" 
                              name="frequencyDays" 
                              placeholder="0" 
                              className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-40" 
                              min={0}
                              max={7} 
                              value={formData.frequencyDays}
                              onChange={handleChange}
                              required 
                            />
                          
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <h2 className="text-3xl text-white mt-4">Inicio</h2>
                        <div className="flex flex-row w-1/2">
                            <h2 className="text-3xl text-white mt-4 mr-6">Fin</h2>
                            <select 
                                name="time" 
                                className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-60 mt-4" 
                                value={selectedOption}
                                onChange={handleSelectChange}
                                required
                            >
                                <option value="I">Indefinido</option>
                                <option value="D">Definido</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row justify-between">
                        <div className="flex flex-row justify-between lg:gap-16">
                            <div className="flex flex-col mt-4 ">
                                <h2 className="text-2xl text-white mb-4">Fecha de Inicio</h2>
                                <input 
                                  type="date" 
                                  name="startDate" 
                                  placeholder="0" 
                                  className="text-2xl text-white py-2 px-6 rounded-full bg-reminders-input w-50" 
                                  value={formData.startDate}
                                  onChange={handleChange}
                                  required 
                                />
                                
                            </div>
                            <div className="flex flex-col mt-4">
                                <h2 className="text-2xl text-white mb-4">Hora de Inicio</h2>
                                <input 
                                  type="time" 
                                  name="startTime" 
                                  placeholder="0" 
                                  className="text-2xl text-white py-2 px-6 rounded-full bg-reminders-input w-50" 
                                  value={formData.startTime}
                                  onChange={handleChange}
                                  required 
                                />
                            </div>
                        </div>
                        {selectedOption === "D" && (
                            <div className="flex flex-row  justify-between lg:gap-16">
                                <div className="flex flex-col mt-4">
                                    <h2 className="text-2xl text-white mb-4">Fecha Fin</h2>
                                    <input 
                                      type="date" 
                                      name="endDate" 
                                      placeholder="0" 
                                      className="text-2xl text-white py-2 px-6 rounded-full bg-reminders-input w-50" 
                                      value={formData.endDate}
                                      onChange={handleChange}
                                      
                                    />
                                </div>
                                <div className="flex flex-col mt-4">
                                    <h2 className="text-2xl text-white mb-4">Hora de Fin</h2>
                                    <input 
                                      type="time" 
                                      name="endTime" 
                                      placeholder="0" 
                                      className="text-2xl text-white py-2 px-6 rounded-full bg-reminders-input w-50" 
                                      value={formData.endTime}
                                      onChange={handleChange}
                                      
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className=" flex lg:justify-end justify-center ">
                        <button className=" lg:justify-end text-white text-2xl bg-reminders-color mt-4 px-4 py-2 w-[280px] rounded-3xl ">
                            Crea un recordatorio
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Reminders;
