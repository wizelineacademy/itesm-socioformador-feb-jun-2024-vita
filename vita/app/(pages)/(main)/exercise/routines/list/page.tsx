'use client'
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import PlanItemLink from '@/components/list/PlanItemLink';
import ExercisesContext from '@/context/exercises';
import { Exercise } from '@/data/datatypes/exercise';


const ExercisesList = () => {

    const {state, setState} = useContext(ExercisesContext);
  
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const router = useRouter();

    const navigateToExercise = (selected: string) => {

        const exercise = exercises.find(exercise => exercise.name === selected)
        
        setState({
            ...state,
            selectedExercise: exercise
        })

        router.push(`/exercise/routines/list/detail`)
    }

    useEffect(() => {
        setExercises(state.exercises)
    }, [])

    return (
        <div className="ml-5 mr-5">
            <h2 className={"mt-2 text-4xl text-white font-semibold md:mt-10"}>Mi rutina</h2>
            <div className="mt-5 flex flex-wrap md:mx-auto md:items-center w-full lg:w-2/3 lg:my-10">
                { exercises &&
                    exercises.map(exercises => (
                        <PlanItemLink 
                            onClick={(e) => {
                                navigateToExercise(exercises.name)
                            }}
                            key={exercises.name} 
                            content={exercises.name}
                            tag={exercises.amount}
                            color={"bg-mid-green"}
                            hoverColor={"bg-dark-green"}
                        />
                    ))
                }

            </div>
        </div>
    );
};

export default ExercisesList;
