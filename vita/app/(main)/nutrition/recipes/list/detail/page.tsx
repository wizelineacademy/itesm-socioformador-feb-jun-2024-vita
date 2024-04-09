'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MainButton from '@/app/components/buttons/MainButton';
import { useState } from 'react';
import ListItem from '@/app/components/list/ListItem';
import ListItemLink from '@/app/components/list/ListItemLink';
import { Clock } from 'lucide-react';


const RecipesDetail = () => {
  
    const [recipe, setRecipe] = useState<Recipe>(
        {
            "name": "Estofado de filete de res y vegetales",
            "description": "Un estofado reconfortante cargado de vegetales frescos y tiernos trozos de filete de res.",
            "ingredients": ["Filete de res", "Papa", "Arroz", "Zanahoria", "Cebolla", "Caldo de carne", "Especias al gusto"],
            "steps": ["Corta el filete de res en trozos pequeños y sazona al gusto con tus especias preferidas.", "En una olla grande, sofríe la cebolla hasta que esté transparente.", "Agrega los trozos de filete de res y cocina hasta que estén dorados por fuera.", "Incorpora las papas, zanahorias y arroz.", "Vierte el caldo de carne suficiente para cubrir los ingredientes y deja hervir.", "Reduce el fuego y cocina a fuego lento hasta que las verduras estén tiernas y el arroz esté cocido.", "Sirve caliente y disfruta de este reconfortante estofado."],
            "time": "1 hora"
        });

    const router = useRouter();

    const navigateToRecipe = () => {
        router.push("/nutrition/recipes/list/detail")
    }

    return (
        <div className="ml-5 mr-5">
            <h2 className="max-w-[500px] mt-2 text-4xl text-white font-semibold md:mt-16">{recipe.name}</h2>
            <h3 className="mt-5 text-xl text-white md:w-4/5 lg:w-3/5 lg:mt-5">{recipe.description}</h3>

            <div className='w-full z-10 mt-2 flex items-center space-x-5 sm:justify-end lg:w-11/12'>
                <Clock width={30} height={30} className='text-white'/>
                <div className='z-10 flex flex-col align-center text-center'>
                    <h3 className='z-10 text-lg text-white text-center font-semibold'>Tiempo de preparación:</h3>
                    <h3 className='z-10 text-xl text-white'>{recipe.time}</h3>
                </div>
            </div>

            <div className="w-full pt-3 pb-4 px-10 mx-auto mt-5 rounded-3xl bg-custom-purple5 flex flex-col justify-between lg:mt-10">
                <h2 className="text-2xl text-white font-semibold text-center md:text-left md:mb-2 md:mt-3">Ingredientes</h2>
                <ul className="ml-5 mt-2 list-disc">
                    {recipe.ingredients.map(ingredient => (
                        <li className="my-1 text-white" key={ingredient}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div className='w-full mb-5 px-5 mx-auto mt-5 lg:mt-10'>
                <h2 className="mt-2 text-2xl text-white text-center font-semibold md:mt-5 md:text-left md:mb-4">Preparación</h2>
                <ol className='list-decimal'>
                    {recipe.steps.map(step => (
                        <li className="my-2 leading-5 text-white ml-2" key={step}>{step}</li>
                    ))}
                </ol>
            </div>

        </div>
    );
};

export default RecipesDetail;
