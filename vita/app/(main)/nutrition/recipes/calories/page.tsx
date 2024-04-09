'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MainButton from '@/app/components/buttons/MainButton';
import { useState } from 'react';


const RecipesCalories = () => {
  
    const [calories, setCalories] = useState<number>(0);
    const [proteins, setProteins] = useState<number>(0);
    const [carbohydrates, setCarbohydrates] = useState<number>(0);
    const [lipids, setLipids] = useState<number>(0);


    const router = useRouter();

    const navigateToIngredients = () => {
        router.push("/nutrition/recipes/ingredients")
    }

    const navigateToCalories = () => {
        router.push("/nutrition/recipes/calories")
    }

    const data = [
        { 
            name: "Calorías",
            value: calories,
            changeFunction: setCalories,
            placeholder: "Cantidad",
            label: "kcal"
        },
        { 
            name: "Porcentaje de proteínas",
            value: proteins,
            changeFunction: setProteins,
            placeholder: "Porcentaje",
            label: "%"
        },
        { 
            name: "Porcentaje de carbohidratos",
            value: carbohydrates,
            changeFunction: setCarbohydrates,
            placeholder: "Porcentaje",
            label: "%"
        },
        { 
            name: "Porcentaje de lípidos",
            value: lipids,
            changeFunction: setLipids,
            placeholder: "Porcentaje",
            label: "%"
        }
        
    ]

    return (
        <div className="ml-5 mr-5">
            <h2 className={"mt-2 text-4xl text-white font-semibold md:mt-10"}>Recetas</h2>
            <h3 className={"mt-5 text-xl text-white md:w-4/5 lg:w-3/5"}>Selecciona la cantidad de calorías que deseas consumir y los porcentajes por grupo</h3>
            <div className="mt-5 flex flex-wrap md:items-center w-full lg:w-2/3 lg:my-10">
                { 
                    data.map(el => (
                        <div key={el.name} className='mb-5 flex flex-col justify-center align-top space-y-1 w-full sm:w-2/5 md:mt-2 lg:w-2/5'>
                            <p className="mb-2 font-semibold text-white md:mb-3 md:max-w-40 lg:max-w-none">{el.name}</p>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    value={el.value} 
                                    onChange={(e) => {
                                        el.changeFunction(parseInt(e.target.value))
                                    }}
                                    className='w-3/5 max-w-56 px-3 py-2 rounded-2xl text-white border-none outline-none bg-custom-lightpurple placeholder-slate-300' placeholder={el.placeholder}/>
                                <p className='ml-2 font-semibold text-white'>{el.label}</p>
                            </div>
                        </div>
                    ))
                }


                <MainButton onClick={() => {}} text={"Continuar"}/>

            </div>
        </div>
    );
};

export default RecipesCalories;
