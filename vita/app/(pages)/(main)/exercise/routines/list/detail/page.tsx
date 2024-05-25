'use client'
import { useContext, useEffect, useState } from 'react';
import ExercisesContext from '@/context/exercises';
import { Exercise } from '@/data/datatypes/exercise';
import { Video } from '@/data/datatypes/video';
import axios from 'axios';


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

    const [video, setVideo] = useState<Video | null>(null);
    const [loadingVideo, setLoadingVideo] = useState<boolean>(false);
    const [errorVideo, setErrorVideo] = useState<boolean>(false);

    const searchVideo = async (name: string) => {
        try {
            const response = await axios.get(`/api/scrape/video?query=${encodeURIComponent(name)}`)
            const data = response.data;
            setVideo(data)
            setLoadingVideo(false)
            setErrorVideo(false)
        } catch(error){
            console.log(error)
            setErrorVideo(true)
            setLoadingVideo(false)
        }
    }

    useEffect(() => {

        if(state.selectedExercise){
            setExercise(state.selectedExercise);
            setLoadingVideo(true)
            searchVideo(state.selectedExercise.name);
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

            <div className='flex flex-col items-center md:items-start'>
                <h2 className="mt-2 text-2xl text-white text-center font-semibold md:mt-5 md:text-left md:mb-4">Video recomendado</h2>

                {(loadingVideo) && (
                    <div className="mb-10">
                        <div role="status">
                            <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-mid-green" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <p className="mt-5 text-white">Cargando...</p>
                        </div>
                    </div>
                    
                )}

                {(!loadingVideo && errorVideo) && (
                    <p className="mt-4 text-md text-white text-left md:mb-4 md:mt-2 pl-2 md:pl-0">No pudimos encontrar un video para este ejercicio</p>
                )}

                {(!loadingVideo && !errorVideo && video) && (
                    <>
                        <p className="mt-4 text-md text-white text-left md:mb-4 md:mt-2 pl-2 md:pl-0">Te mostramos un video similar a este ejercicio, toma en cuenta que puede no ser exactamente igual</p>
                        <h3 className='text-white mb-5 mt-5 font-semibold text-center md:text-left md:mt-2'>{video.title}</h3>
                        <iframe
                            src={`https://www.youtube.com/embed/${video.videoId}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.title}
                            width="560"
                            height="315"
                            className='mb-10 w-[270px] h-[300px] sm:w-[400px] lg:w-[560px] lg:h-[315px]'
                        ></iframe>
                    </>
                )}

            </div>

        </div>
    );
};

export default ExerciseDetail;
