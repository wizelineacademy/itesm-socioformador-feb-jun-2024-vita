'use client'
import React, { useState, useEffect } from "react";
import { FaBell } from 'react-icons/fa';
import Link from 'next/link';
import Swal from 'sweetalert2';
import axios from "axios";
import PlanItemLink from "@/components/list/PlanItemLink";
import { useRouter } from 'next/navigation';

const Reminders = () => {

  const router = useRouter();

  interface ReminderData {
    idReminders: string;
    name: string;
    frequency: number;
    startTime: string; 
    endTime: string;
}

const [reminders, setReminders] = useState<ReminderData[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/reminders");
      if (response.data && response.data.length > 0) {
        const remindersWithConvertedFrequency = response.data.map((reminder: ReminderData) => {
          const frequencyInMinutes = reminder.frequency;
          const frequencyInHours = Math.floor(frequencyInMinutes / 3600);
          const frequency = Math.floor(frequencyInHours / 24);
          const remainingHours = frequencyInHours % 24;

          // Convertir las fechas de startTime y endTime al formato dd-mm-yyyy
          const startTime = new Date(reminder.startTime).toLocaleDateString('es-ES');
          // Verificar si endTime es null o no antes de convertirlo a formato de fecha
          let endTime= null ;
          if (reminder.endTime) {
            endTime = new Date(reminder.endTime).toLocaleDateString('es-ES');
          }
          return {
            ...reminder,
            frequency: ` Durante ${frequency} días, cada ${remainingHours} horas`,
            startTime: startTime,
            endTime: endTime
          };
        });
        setReminders(remindersWithConvertedFrequency);
      } 
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
    fetchData();
  }, []);

  const navigateToReminder = (idReminders: string) => {
    router.push(`/reminders/editreminders/${idReminders}`)
  };

  return (
    <div className="flex flex-col px-5 py-4 text-4xl font-bold lg:justify-start md:justify-start justify-center">
      <span className="flex flex-row"> 
        <h1 className="mr-2 text-white">Recordatorios</h1>
        <FaBell size={36} color="white"/>
      </span> 
      <Link href="/reminders/crudreminders">
        <div className="lg:justify-start md:justify-start justify-center text-white text-2xl bg-reminders-color mt-4 px-4 py-2 w-[280px] rounded-3xl">
          Crea un recordatorio
        </div>
      </Link>

      <div className="mt-5 flex flex-wrap md:mx-auto md:items-center w-full lg:w-2/3 lg:my-10">
        {reminders &&
          reminders.map(reminder => (
            <PlanItemLink 
              onClick={(e) => {
                navigateToReminder(reminder.idReminders)
              }}
              key={reminder.name} 
              content={`${reminder.name} / desde ${reminder.startTime}${reminder.endTime ? ` hasta ${reminder.endTime}` : ''}`}
              tag={` ${reminder.frequency}`}
              color={"bg-reminder-mid-gray"}
              hoverColor={"bg-reminder-low-gray"}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Reminders;
