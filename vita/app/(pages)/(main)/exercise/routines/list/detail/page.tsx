'use client'
import { useContext, useEffect, useState } from 'react';
import ExercisesContext from '@/context/exercises';
import { Exercise } from '@/data/datatypes/exercise';


const ExerciseDetail = () => {
  
    const {state} = useContext(ExercisesContext);

    const [exercise, setExercise] = useState<Exercise>(
        {
            "name": "Ejercicio",
            "description": "Descripción",
            "amount": "Amount",
            "impact_areas": ["Areas de impacto"],
            "intensity": 0,
            "precautions": ["Precauciones"]
        }
    );

    useEffect(() => {

        if(state.selectedExercise){
            setExercise(state.selectedExercise);
        }

    }, [])

    return (
        <div className="ml-5 mr-5">
            <h2 className="max-w-[500px] mt-2 text-4xl text-white font-semibold md:mt-16">{exercise.name}</h2>
            <h3 className="mt-5 text-xl text-white md:w-4/5 lg:w-3/5 lg:mt-5">{exercise.description}</h3>

            <div className='w-full z-10 mt-2 flex items-center space-x-5 sm:justify-end lg:w-11/12'>
                <h3 className='z-10 text-xl text-white font-bold'>{exercise.amount}</h3>
            </div>

            <div className="w-full pt-3 pb-4 px-10 mx-auto mt-5 rounded-3xl bg-mid-green flex flex-col gap-y-3 justify-between sm:flex-row md:justify-around lg:mt-10">
                <div className='flex flex-col items-center gap-y-2'>
                    <h2 className="text-2xl text-white text-center font-semibold md:text-left md:mb-2 md:mt-3">Áreas de impacto</h2>
                    <ul className="ml-5 list-disc">
                        {exercise.impact_areas.map(area => (
                            <li className="my-1 text-white" key={area}>{area}</li>
                        ))}
                    </ul>
                </div>

                <div className='flex flex-col gap-y-2 items-center'>
                    <h2 className="text-2xl text-white text-center font-semibold md:text-left md:mb-2 md:mt-3">Intensidad</h2>
                    <h3 className='text-xl w-16 h-16 flex items-center justify-center border-2 border-white border-solid text-white text-center font-bold rounded-full'>{exercise.intensity}</h3>
                </div>
                
            </div>

            <div className='w-full mb-5 mx-auto mt-5 lg:mt-10'>
                <h2 className="mt-2 text-2xl text-white font-semibold md:mt-5 md:text-left md:mb-4">Precauciones</h2>
                <ol className='mx-2 list-decimal'>
                    {exercise.precautions.map(precaution => (
                        <li className="my-2 leading-5 text-white ml-2" key={precaution}>{precaution}</li>
                    ))}
                </ol>
            </div>

        </div>
    );
};

export default ExerciseDetail;
