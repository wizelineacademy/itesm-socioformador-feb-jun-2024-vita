'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MainButton from '@/app/components/buttons/MainButton';
import { useContext, useState } from 'react';
import ListItem from '@/app/components/list/ListItem';
import ListItemLink from '@/app/components/list/ListItemLink';
import RecipesContext from '@/context/ingredients';


const RecipesList = () => {

    const {state, setState} = useContext(RecipesContext);
  
    const [recipes, setRecipes] = useState<Recipe[]>([
        {
            "name": "Estofado de filete de res y vegetales",
            "description": "Un estofado reconfortante cargado de vegetales frescos y tiernos trozos de filete de res.",
            "ingredients": ["Filete de res", "Papa", "Arroz", "Zanahoria", "Cebolla", "Caldo de carne", "Especias al gusto"],
            "steps": ["Corta el filete de res en trozos pequeños y sazona al gusto con tus especias preferidas.", "En una olla grande, sofríe la cebolla hasta que esté transparente.", "Agrega los trozos de filete de res y cocina hasta que estén dorados por fuera.", "Incorpora las papas, zanahorias y arroz.", "Vierte el caldo de carne suficiente para cubrir los ingredientes y deja hervir.", "Reduce el fuego y cocina a fuego lento hasta que las verduras estén tiernas y el arroz esté cocido.", "Sirve caliente y disfruta de este reconfortante estofado."],
            "time": "1 hora"
        },
        {
            "name": "Ensalada de filete de res y arroz integral",
            "description": "Una ensalada fresca y satisfactoria con tiernas tiras de filete de res y arroz integral.",
            "ingredients": ["Filete de res", "Arroz integral", "Zanahoria", "Pimiento", "Espinacas", "Vinagreta de tu elección"],
            "steps": ["Cocina el arroz integral según las instrucciones del paquete y deja enfriar.", "Mientras tanto, corta el filete de res en tiras delgadas y saltea hasta que estén cocidas.", "En un tazón grande, combina el arroz cocido, las tiras de filete de res, zanahorias ralladas, pimientos en tiras y espinacas frescas.", "Aliña con tu vinagreta favorita y mezcla bien.", "Sirve frío como una deliciosa ensalada nutritiva."],
            "time": "30 minutos"
        }
    ]);

    const router = useRouter();

    const navigateToRecipe = (selected: string) => {

        const recipe = recipes.find(recipe => recipe.name === selected)
        
        setState({
            ...state,
            selectedRecipe: recipe
        })

        router.push(`/nutrition/recipes/list/detail`)
    }

    return (
        <div className="ml-5 mr-5">
            <h2 className={"mt-2 text-4xl text-white font-semibold md:mt-10"}>Recetas</h2>
            <div className="mt-5 flex flex-wrap md:mx-auto md:items-center w-full lg:w-2/3 lg:my-10">
                { 
                    recipes.map(recipe => (
                        <ListItemLink 
                            onClick={(e) => {
                                navigateToRecipe(recipe.name)
                            }}
                            key={recipe.name} 
                            text={recipe.name}
                        />
                    ))
                }

            </div>
        </div>
    );
};

export default RecipesList;
