'use client'
import React, { useState, useEffect } from "react";
import { FaBell } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from 'sweetalert2';

const EditReminders = ({ params }: { params: { idReminders: string } }) => {
  const router = useRouter();

  interface ReminderData {
    idReminders: number;
    idUser: number;
    name: string;
    frequency: number;
    startTime: string;
    endTime: string | null; 
    description: string;
    frequencyDays: number; 
    frequencyHours: number; 
    startDays: string;
    startHours: string;
    endDays: string | null; 
    endHours: string | null; 
  }

  interface EditReminderData {
    idReminders: number;
    idUser: number;
    name: string;
    frequency: number;
    startTime: string;
    endTime: string | null; 
    description: string;
    frequencyDays: number; 
    frequencyHours: number; 
    startDays: string; 
    startHours: string;
    endDays: string | null; 
    endHours: string | null; 
  }

  const idReminders = params.idReminders;
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState<ReminderData | null>(null);
  const [editedData, setEditedData] = useState<EditReminderData | null>(null);
  const [selectedOption, setSelectedOption] = useState("I");


  const DeleteReminder = async (idReminders: string) => {
    // Mostrar mensaje de confirmación
    const confirmationResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este recordatorio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    });
  
    // Si el usuario confirma la eliminación
    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(`/api/reminders/${idReminders}`);
        if (response.status === 200) {
          router.replace("/reminders");
        router.refresh();
          Swal.fire({
            title: 'Éxito',
            text: 'El recordatorio ha sido eliminado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });

        } 
        


      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al eliminar el recordatorio',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const formatDays = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
   
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};

  const getData = async () => {
    try {
      const response = await axios.get(`/api/reminders/${idReminders}`);
      const fetchedData = response.data;
      // Determinar el valor inicial de selectedOption
      const initialSelectedOption = fetchedData.endTime === null ? "I" : "D";
      setSelectedOption(initialSelectedOption);
      // Asignamos los datos recibidos a userData
    
      setUserData({
        ...fetchedData,
        frequencyDays: calculateDays(fetchedData.frequency),
        frequencyHours: calculateHours(fetchedData.frequency),
        startDays: fetchedData.startTime,
        startHours: calculateHoursTime(fetchedData.startTime),
        endDays: fetchedData.endTime ? fetchedData.endTime : null,
        endHours: fetchedData.endTime ? calculateHoursTime(fetchedData.endTime) : null
      });
    
      setEditedData({
        ...fetchedData,
        frequencyDays: calculateDays(fetchedData.frequency),
        frequencyHours: calculateHours(fetchedData.frequency),
        startDays: fetchedData.startTime,
        startHours: calculateHoursTime(fetchedData.startTime),
        endDays: fetchedData.endTime ? fetchedData.endTime : null,
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

  useEffect(() => {
    

    getData();
   
  }, []);

  // Función para calcular días
  const calculateDays = (frequencyInSeconds: number): number => {
    return Math.floor(frequencyInSeconds / (24 * 3600));
  };

  // Función para calcular horas
  const calculateHours = (frequencyInSeconds: number): number => {
    return Math.floor((frequencyInSeconds % (24 * 3600)) / 3600);
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
    setEditedData(userData); // Restaura los datos editados a los datos originales
  };

// Función para manejar el cambio en los inputs
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = event.target;

  // Validamos si hay datos editados y los actualizamos
  if (editedData) {
      setEditedData({ ...editedData, [name]: value });
  }
};

const formatDate2 = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  let month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  let day = date.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  const { name, value } = event.target;

  // Validamos si hay datos editados y los actualizamos
  if (editedData) {
      setEditedData({ ...editedData, [name]: value });
  }
};

// Función para guardar los cambios editados
const handleSaveChanges = async () => {
  try {
      if (editedData) {
        // Convertir horas y días a segundos y sumarlos
        const frequencyInSeconds = (editedData.frequencyHours * 3600) + (editedData.frequencyDays * 86400);
        
        // Combinar fecha y hora de inicio
        if (editedData.startDays.includes("T")) {
          editedData.startDays = editedData.startDays.split("T")[0];
      }
        const startTime = new Date(editedData.startDays + "T" + editedData.startHours);
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
      if ( editedData.endDays && editedData.endHours) {
          endTime = new Date(editedData.endDays + "T" + editedData.endHours);
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
          await axios.put(`/api/reminders/${idReminders}`, {
            ...editedData,
            frequency: frequencyInSeconds,
            startTime,
            endTime: selectedOption === "I" ? null : endTime
        });
        
          Swal.fire({
              title: 'Éxito',
              text: 'Se han guardado las datos con éxito',
              icon: 'success',
              confirmButtonText: 'OK'
          });
          getData()
          setEditMode(false); 
     
          
      }
  } catch (error) {
      Swal.fire({
          title: 'Error',
          text: "Ocurrió un error al actualizar los datos",
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
      <div className="flex flex-row px-5 py-4 text-4xl font-bold lg:justify-start md:justify-start justify-center">
        <h1 className="mr-6 text-white w-[200px]">Recordatorio</h1>
        <FaBell size={36} color="white"/>
      </div>
      <div className="flex flex-col  lg:justify-start md:justify-start justify-center px-5 ">
        <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges();
            }}>
          <h2 className="text-3xl text-white">Nombre</h2>
            {editMode ? (
              <input
                  type="text"
                  name="name"
                  value={editedData?.name|| ""}
                  onChange={handleInputChange}
                  className="mt-4 w-[85%] text-2xl py-2 px-6 rounded-full text-white bg-reminders-input"
                  required 
              />
              ) : (            
                <div  className="mt-4 w-[85%] text-2xl py-2 px-6 rounded-full text-white bg-reminders-input" >
                  {userData && userData.name}
                </div>           
              )}
          <h2 className="text-3xl text-white mt-4">Descripción</h2>
            {editMode ? (
               <textarea 
               id="Comentarios" 
               required 
               placeholder="Describe el recordatorio..." 
               className="mt-4 w-[85%] h-[100px] px-4 py-2 rounded-3xl bg-reminders-input text-white  resize-none"
               name="description"
               value={editedData?.description || ""}
               onChange={handleTextAreaChange}
           />
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
                    <input
                     type="number"
                     name="frequencyHours"
                     value={editedData?.frequencyHours}
                     onChange={handleInputChange}
                     className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input"
                     required 
                     min={1}
                    max={12}
                    />
                    ) : (            
                      <div  className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input" >
                        {userData && userData.frequencyHours}
                      </div>           
                    )}
                </div>
                <div className="flex flex-col mt-4 lg:w-3/4">
                <h2 className="text-2xl text-white mb-4">Número de días</h2>
                  {editMode ? (
                    <input
                      type="number"
                      name="frequencyDays"
                      value={editedData?.frequencyDays}
                      onChange={handleInputChange}
                      min={0}
                      max={7}
                      className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input"
                      required 
                    />
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
                    {editMode ? (
                      <select 
                      
                      className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-60 mt-4" 
                      value={selectedOption}
                      onChange={handleSelectChange}
                      required
                  >
                      <option value="I">Indefinido</option>
                      <option value="D">Definido</option>
                  </select>
                    ) : (            
                      <div 
                        className="text-2xl py-2 px-6 rounded-full text-white bg-reminders-input w-60 mt-4"
                      >
                        {userData && userData.endDays ? "Definido" : "Indefinido"}
                      </div>           
                    )}
                      
                  </div>
              </div>
           
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="flex flex-row justify-between lg:gap-16">
                <div className="flex flex-col mt-4 ">
                  <h2 className="text-2xl text-white mb-4">Fecha de Inicio</h2>
                  {editMode ? (          
                    <input 
                      type="date" 
                      name="startDays" 
                      className="text-2xl text-white py-2 px-6 rounded-full bg-reminders-input w-50" 
                      value={formatDate2(editedData?.startDays|| "")}
                      onChange={handleInputChange}
                      required 
                    /> 
                  ) : (          
                    <div className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input">
                      {userData && formatDays(userData.startDays)}
                    </div>        
                    )}
                </div>
                <div className="flex flex-col mt-4 ">
                  <h2 className="text-2xl text-white mb-4">Hora de Inicio</h2>
                  {editMode ? (             
                    <input 
                      type="time" 
                      name="startHours" 
                      className="text-2xl text-white py-2 px-6 rounded-full bg-reminders-input w-50" 
                      value={editedData?.startHours || ""}
                      onChange={handleInputChange}
                      required 
                    /> 
                  ) : (          
                    <div className="mt-4 w-60 text-2xl py-2 px-6 rounded-full text-white bg-reminders-input">
                      {userData && userData.startHours}
                    </div>        
                    )}
                </div>
                <div className="flex flex-col mt-4 ">
                  
                  {editMode ? (
                    <> 
                                
                    {selectedOption === "D" && (
                      <>
                        <h2 className="text-2xl text-white mb-4">Fecha de fin</h2> 
                        <input 
                          type="date" 
                          name="endDays" 
                          className="text-2xl text-white py-2 px-6 rounded-full bg-reminders-input w-50" 
                          value={formatDate2(editedData?.endDays || "")}
                          onChange={handleInputChange}
                          required 
                        /> 
                      </>
                    )}  
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
                      {selectedOption === "D" && (
                      <>
                        <h2 className="text-2xl text-white mb-4">Hora de fin</h2> 
                        <input 
                          type="time" 
                          name="endHours" 
                          className="text-2xl text-white py-2 px-6 rounded-full bg-reminders-input w-50" 
                          value={editedData?.endHours || ""}
                          onChange={handleInputChange}
                          required 
                        /> 
                      </>
                    )}    
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
                  <span> 
                  <button onClick={(e) => {
                e.preventDefault();
                DeleteReminder(idReminders)
            }}  className="rounded-full mt-2 text-2xl px-3 
                    py-2 bg-mid-red w-60 text-white mr-6">
                        Eliminar
                    </button>
                  </span>
                  <span> 
                    <button
                        onClick={() => setEditMode(true)}
                        className="rounded-full mt-2 text-2xl py-2 bg-reminders-color w-60 text-white"
                    >
                        Editar
                    </button>
                  </span>
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
