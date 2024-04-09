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
            <h2 className={"mt-2 text-4xl text-white font-semibold md:mt-10"}>Recetas</h2>
            <h3 className={"mt-5 text-xl text-white md:w-4/5 lg:w-3/5"}>Selecciona si deseas generar recetas en base a ingredientes o a la cantidad de calorías</h3>
            <div className="mt-5 mb-10 flex flex-col justify-around md:flex-row">
                <div 
                    onClick={navigateToIngredients}
                    className="w-5/6 mt-5 px-5 py-2 mx-auto rounded-3xl flex justify-between items-center text-white font-medium bg-custom-lightpurple hover:cursor-pointer hover:bg-custom-extralightpurple md:w-2/5 lg:w-2/6 md:h-60 md:flex-col-reverse md:justify-around"
                >
                    <p className="text-lg md:mb-5 md:text-xl">Ingredientes</p>
                    <Image 
                        src="/Food.svg" 
                        alt="Ingredientes" 
                        width={60} 
                        height={60} 
                        className="pr-2 w-12 h-12 md:w-32 md:h-32 lg:w-36 lg:h-36"
                    />
                </div>
                <div
                    onClick={navigateToCalories}
                    className="w-5/6 mt-5 px-5 py-2 mx-auto rounded-3xl flex justify-between items-center text-white font-medium bg-custom-lightpurple hover:cursor-pointer hover:bg-custom-extralightpurple md:w-2/5 lg:w-2/6  md:h-60 md:flex-col-reverse md:justify-around"
                >
                    <p className="text-lg md:mb-5 md:text-xl lg:text-xl">Calorías</p>
                    <Image 
                        src="/Calories.svg" 
                        alt="Calorías" 
                        width={60} 
                        height={60} 
                        className="pr-2 w-12 h-12 md:w-32 md:h-32 lg:w-36 lg:h-36"
                    />
                </div>
            </div>
        </div>
    );
};

export default RecipeSelection;
