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
                <div className='z-10 flex flex-col align-center text-center'>
                    <h3 className='z-10 text-lg text-white text-center font-semibold'>Cantidad</h3>
                    <h3 className='z-10 text-xl text-white'>{exercise.amount}</h3>
                </div>
            </div>

            <div className="w-full pt-3 pb-4 px-10 mx-auto mt-5 rounded-3xl bg-custom-purple5 flex flex-col justify-between lg:mt-10">
                <h2 className="text-2xl text-white font-semibold text-center md:text-left md:mb-2 md:mt-3">Áreas de impacto</h2>
                <ul className="ml-5 mt-2 list-disc">
                    {exercise.impact_areas.map(area => (
                        <li className="my-1 text-white" key={area}>{area}</li>
                    ))}
                </ul>
            </div>

            <div className='w-full mb-5 px-5 mx-auto mt-5 lg:mt-10'>
                <h2 className="mt-2 text-2xl text-white text-center font-semibold md:mt-5 md:text-left md:mb-4">Precauciones</h2>
                <ol className='list-decimal'>
                    {exercise.precautions.map(precaution => (
                        <li className="my-2 leading-5 text-white ml-2" key={precaution}>{precaution}</li>
                    ))}
                </ol>
            </div>

        </div>
    );
};

export default ExerciseDetail;
