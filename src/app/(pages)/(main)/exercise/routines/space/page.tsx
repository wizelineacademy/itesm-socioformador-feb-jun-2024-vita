'use client'

import ExercisesContext from '@/src/context/exercises';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { IconType } from 'react-icons';

import { FaDumbbell, FaHome, FaTree } from 'react-icons/fa';

import Swal from 'sweetalert2';

const TypeRoutine = () => {

    const spaces = [
        "En el gimnasio",
        "En casa",
        "Al aire libre"
    ]

    const icons:IconType[] = [FaDumbbell, FaHome, FaTree]

    const {state, setState} = useContext(ExercisesContext);
  
    const router = useRouter();

    const generatePrompt = (space: string) => {

        if(!space){
            Swal.fire({
                title: 'Error',
                text: 'Debes seleccionar un espacio',
                icon: 'error',
                confirmButtonText: 'OK'
            }); 
            return "";
        }
    
        let prompt = `Realizaré los ejercicios ${space}`
    
        const message = {
            role: "user",
            content: prompt
        }
    
        return message;
    }
    
    const generateExercises = async(space: string) => {
        try {
    
            const message = generatePrompt(space);

            if(message === ""){
                return;
            }

            const usageRecords = [{
                name: "routine_space",
                detail: space
            }]
            await axios.post("/api/feature_usage", { usageRecords })
    
            Swal.fire({
                title: 'Cargando',
                text: 'Generando la rutina...',
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            }); 
    
            const response = await axios.post("/api/routines/spaces", {
                message
            })
    
            let data = response.data.content;
            data = data.replaceAll("`", "");
            data = data.replace("json", "");
    
            const exercises = JSON.parse(data);
    
            setState({
                ...state,
                exercises
            })
    
            router.push("/exercise/routines/list")
            Swal.close()
            
        } catch(error: any){
            console.log(error)
            Swal.close()
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al generar la rutina. Inténtalo de nuevo',
                icon: 'error',
                confirmButtonText: 'OK'
            }); 
        }
    };

    return (
        <div className="ml-5 mr-5">
            <h2 className={"mt-2 text-4xl text-white font-semibold md:mt-10"}>Rutinas</h2>
            <h3 className={"mt-5 text-xl text-white md:w-4/5 lg:w-3/5"}>Escoge dónde deseas realizar el ejercicio</h3>            

            <div className="w-full mt-5 mb-10 flex flex-col justify-around md:flex-row md:flex-wrap md:justify-center md:items-stretch lg:w-2/3 lg:mx-auto lg:gap-x-8 lg:gap-y-3">
                {spaces.map((space, index) => (
                    <div 
                        key={space}
                        onClick={async () => {
                            await generateExercises(space)
                        }}
                        className={`w-11/12 max-w-[450px] mt-5 px-5 py-4 mx-auto rounded-full flex justify-between items-center text-white hover:cursor-pointer bg-mid-green hover:bg-dark-green transition-colors ease-in delay-75 md:w-2/5 md:flex-col md:rounded-3xl md:items-start md:justify-center md:space-y-8 md:py-10 lg:w-1/4 xl:w-1/3 lg:min-w-[200px] xl:h-64 lg:max-w-[400px]`}
                    >
                        {React.createElement(icons[index], {className: "ml-[5%] w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20"})}
                        <p className="text-lg font-semibold md:text-xl mr-2 lg:ml-2">{space}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default TypeRoutine;
