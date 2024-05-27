'use client';

import React, { useState, useEffect } from "react";
import { FaHeart, FaComments, FaCircle, FaAngleRight,FaSuitcase , FaDumbbell , FaPercent} from 'react-icons/fa';
import axios from  "axios"
import { BarChartPlot } from "@/components/charts/BarChartPlot";
import { ValueRecord } from "@/data/datatypes/autoeval";

const SleepDashboard = () => {

  const [sleepHours, setSleepHours] = useState<ValueRecord[]>([]);
  const [sleepProgress, setSleepProgress] = useState<ValueRecord[]>([]);

  const fetchSleepHours = async () => {
    const res = await axios.get("/api/records/sleep");
    setSleepHours(res.data)
  }

  const fetchSleepProgress = async () => {
    const res = await axios.get("/api/goal_evaluations/sleep");
    setSleepProgress(res.data)
  }

  useEffect(() => {
    fetchSleepHours();
    fetchSleepProgress();
  }, [])

  return (
    <div className="w-full pb-10">
      <div className="w-full lg:max-w-[1000px] h-[250px] md:h-[300px]">
        <h4 className={`font-bold text-lg rounded-xl py-2 lg:px-5 text-decoration-sleep-colordark`}>
          Horas de sueño
        </h4>      
        <BarChartPlot 
          xLabel="Días" 
          yLabel="Horas de sueño"
          tags={["Día", "Horas de sueño"]} 
          data={sleepHours} 
          barColor="fill-decoration-sleep-colordark" 
          infoColor="text-decoration-sleep-colordark"
        />
      </div>

      <div className="w-full py-10 lg:max-w-[1000px] h-[300px] md:h-[400px]">
        <h4 className={`font-bold text-lg rounded-xl py-2 lg:px-5 text-decoration-sleep-colordark`}>
          Progreso en meta
        </h4>      
        <BarChartPlot 
          xLabel="Mes" 
          yLabel="Calificación"
          tags={["Mes", "Calificación"]} 
          data={sleepProgress} 
          barColor="fill-decoration-sleep-colordark" 
          infoColor="text-decoration-sleep-colordark"
        />
      </div>
    </div>
    
  )
}

const Dashboard = () => {
  
  const [selection, setSelection] = useState(0);

  const sections = [
    {
      title: "Sueño"
    },
    {
      title: "Ejercicio"
    },
    {
      title: "Nutrición"
    }
  ]
  
  return (
    <div className="px-5">

    <div className="mt-5 flex py-4 text-5xl font-bold lg:justify-start md:justify-start justify-center items-center md:w-[300px] lg:w-[500px]">
            <h1 className="mr-2 text-home-title">Mi dashboard de salud</h1>
            <FaHeart color="#154154" className="w-[50px] h-[50px] hidden lg:inline-block"/>
    </div>

    <div className="flex flex-col gap-y-2 gap-x-5 lg:flex-row">
      {
        sections.map((section, idx) => (
          <h3 
            key={section.title} 
            className={`font-bold text-xl rounded-xl py-2 lg:px-5 hover:bg-home-title hover:text-white hover:px-5 hover:cursor-pointer ${selection === idx && "bg-home-title text-white px-5"}`}
            onClick={() => {
                setSelection(idx)
            }}
          >
            {section.title}
          </h3>
        ))
      }
    </div>

      {selection === 0 &&
        <SleepDashboard/>
      }

    </div>
  );
};



export default Dashboard;