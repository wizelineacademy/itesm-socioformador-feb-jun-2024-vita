'use client'
import { useRouter } from 'next/navigation';
import MainButton from '@/app/components/buttons/MainButton';
import { useContext, useState } from 'react';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import axios from 'axios';
import RecipesContext from '@/context/ingredients';


const RecipesCalories = () => {
  
    const [calories, setCalories] = useState<number>(0);
    const [proteins, setProteins] = useState<number>(0);
    const [carbohydrates, setCarbohydrates] = useState<number>(0);
    const [lipids, setLipids] = useState<number>(0);

    const {state, setState} = useContext(RecipesContext);

    const router = useRouter();

    const generatePrompt = () => {
        if(!calories || !proteins || !carbohydrates || !lipids){
            swal.fire({
                title: 'Error',
                text: 'Debes completar todos los campos',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return "";
        }

        if(proteins + carbohydrates + lipids != 100){
            swal.fire({
                title: 'Error',
                text: 'Los porcentajes deben sumar 100%',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return "";
        }
    
        let prompt = `Busco consumir ${calories} kcal, dividido en ${proteins}% de proteínas, ${carbohydrates}% de carbohidratos y ${lipids}% de lipidos.`
    
        const message = {
            role: "user",
            content: prompt
        }
    
        return message;
      }
    
      const generateRecipes = async() => {
        try {
    
            const message = generatePrompt();

            if(message === ""){
                return;
            }
    
            swal.fire({
                title: 'Cargando',
                text: 'Generando las recetas...',
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            }); 
    
            const response = await axios.post("/api/recipes/calories", {
                message
            })
    
            let data = response.data.content;
            data = data.replaceAll("`", "");
            data = data.replace("json", "");
    
            const recipes = JSON.parse(data);
    
            setState({
                ...state,
                recipes
            })
    
            router.push("/nutrition/recipes/list")
            swal.close()
            
        } catch(error: any){
            swal.close()
            swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al generar las recetas. Inténtalo de nuevo',
                icon: 'error',
                confirmButtonText: 'OK'
            }); 
        }
    };

    const data = [
        { 
            name: "Calorías",
            value: calories,
            changeFunction: setCalories,
            placeholder: "Cantidad",
            label: "kcal",
            max: 10000
        },
        { 
            name: "Porcentaje de proteínas",
            value: proteins,
            changeFunction: setProteins,
            placeholder: "Porcentaje",
            label: "%",
            max: 100
        },
        { 
            name: "Porcentaje de carbohidratos",
            value: carbohydrates,
            changeFunction: setCarbohydrates,
            placeholder: "Porcentaje",
            label: "%",
            max: 100
        },
        { 
            name: "Porcentaje de lípidos",
            value: lipids,
            changeFunction: setLipids,
            placeholder: "Porcentaje",
            label: "%",
            max: 100
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
                                    min={0}
                                    max={el.max}
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


                <MainButton onClick={generateRecipes} text={"Continuar"}/>

            </div>
        </div>
    );
};

export default RecipesCalories;
