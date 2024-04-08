'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';


const RecipeSelection = () => {
  
    const router = useRouter();

    const navigateToIngredients = () => {
        router.push("/nutrition/recipes/ingredients")
    }

    const navigateToCalories = () => {
        router.push("/nutrition/recipes/calories")
    }


    return (
        <div className="ml-5 mr-5">
            <h2 className={"mt-2 text-4xl text-white font-semibold"}>Recetas</h2>
            <h3 className={"mt-5 text-xl text-white"}>Selecciona si deseas generar recetas en base a ingredientes o a la cantidad de calorías</h3>
            <div className="mt-5 mb-10 flex flex-col justify-around">
                <div 
                    onClick={navigateToIngredients}
                    className="w-5/6 mt-5 px-5 py-2 mx-auto rounded-3xl flex justify-between items-center text-white font-medium bg-custom-lightpurple hover:cursor-pointer hover:bg-custom-extralightpurple"
                >
                    <p>Ingredientes</p>
                    <Image src="/Food.svg" alt="Ingredientes" width={45} height={45} className='pr-2'/>
                </div>
                <div
                    onClick={navigateToCalories}
                    className="w-5/6 mt-5 px-5 py-2 mx-auto rounded-3xl flex justify-between items-center text-white font-medium bg-custom-lightpurple hover:cursor-pointer hover:bg-custom-extralightpurple"
                >
                    <p>Calorías</p>
                    <Image src="/Calories.svg" alt="Calorías" width={45} height={45} className='pr-2'/>
                </div>
            </div>
        </div>
    );
};

export default RecipeSelection;
