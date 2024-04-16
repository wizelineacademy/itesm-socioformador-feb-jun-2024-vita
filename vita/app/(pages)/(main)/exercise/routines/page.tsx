'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { FaRunning, FaTree, FaDumbbell } from 'react-icons/fa';

const ExerciseSelection = () => {
  
    const router = useRouter();

    const navigateToIngredients = () => {
        router.push("/nutrition/recipes/ingredients")
    }

    const navigateToCalories = () => {
        router.push("/nutrition/recipes/calories")
    }

    const data = [
        {
            name: "Tipo de ejercicio",
            icon: FaRunning,
            link: "/exercise/routines/type"
        },
        {
            name: "Espacio",
            icon: FaTree,
            link: "/exercise/routines/space"
        },
        {
            name: "Área del cuerpo",
            icon: FaDumbbell,
            link: "/exercise/routines/area"
        }
    ]

    return (
        <div className="ml-5 mr-5">
            <h2 className={"mt-2 text-4xl text-white font-semibold md:mt-10"}>Rutinas</h2>
            <h3 className={"mt-5 text-xl text-white md:w-4/5 lg:w-3/5"}>Selecciona si deseas generar una rutina en base al tipo de ejercicio, el espacio para realizar el ejercicio o el área del cuerpo a trabajar</h3>
            <div className="w-full mt-5 mb-10 flex flex-col justify-around md:flex-row md:flex-wrap lg:gap-x-3 md:justify-center md:items-center lg:w-2/3 lg:mx-auto">
                {data.map(el => (
                    <div 
                        key={el.name}
                        onClick={() => {
                            router.push(el.link)
                        }}
                        className="w-5/6 mt-5 px-5 py-2 mx-auto rounded-3xl flex justify-between items-center text-white font-medium bg-mid-green hover:cursor-pointer hover:bg-dark-green md:w-2/5 md:flex-col-reverse md:items-start md:justify-start md:h-56 lg:w-5/12 lg:h-64 lg:max-w-[400px]"
                    >
                    <p className="text-lg font-bold md:mb-5 md:text-xl md:mt-6 md:mb-10">{el.name}</p>
                    <el.icon width={60} height={60} className="pr-2 w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20"/>
                    </div>
                ))}
            
            </div>
        </div>
    );
};

export default ExerciseSelection;
