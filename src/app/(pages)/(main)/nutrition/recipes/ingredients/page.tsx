'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import axios from "axios";
import swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { cn } from "@/src/lib/utils";
import ListItem from "@/src/components/list/ListItem";
import MainButton from "@/src/components/buttons/MainButton";
import RecipesContext from "@/src/context/ingredients";
import Swal from "sweetalert2";

const RecipesIngredients = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]); 
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]); 

  const [selectedList, setSelectedList] = useState<number>(0);
  const [addedIngredient, setAddedIngredient] = useState<string>("");
  const [excludedIngredient, setExcludedIngredient] = useState<string>("");

  const {state, setState} = useContext(RecipesContext);

  const router = useRouter();

  const ingredients = [
    "manzana", "pera", "plátano", "mango", "guayaba", "naranja", "limón", "uva", "kiwi", "piña",
    "fresa", "sandía", "melon", "cereza", "frambuesa", "arándano", "higo", "albaricoque", "ciruela", "durazno",
    "papaya", "coco", "mandarina", "mora", "toronja", "lima", "pomelo", "kiwano", "feijoa", "lichí",
    "aguacate", "granada", "maracuyá", "guanábana", "caqui", "zapote", "chirimoya", "tamarindo", "mamey",
    "níspero", "guayabo", "melocotón", "higo chumbo", "acerola", "fruta de la pasión", "pitahaya", "pitaya",
    "espinaca", "zanahoria", "tomate", "col", "brócoli", "calabacín", "pepino", "remolacha", "chirivía",
    "berenjena", "pimiento", "calabaza", "judía verde", "alcachofa", "puerro", "cebolla", "ajo", "papa",
    "boniato", "judía", "garbanzo", "lenteja", "alubia", "soja", "trigo", "arroz", "maíz", "avena",
    "cebada", "centeno", "quinoa", "mijo", "amaranto", "sorgo", "chía", "cacao", "café", "té",
    "leche", "yogur", "queso", "huevos", "pollo", "ternera", "cerdo", "pavo", "pescado",
    "atún", "salmón", "bacalao", "gambas", "langostinos", "mejillones", "ostras", "calamares", "pulpo",
    "vieiras", "anchoas", "sardinas", "arenques", "cangrejo", "langosta", "carne de res", "carne de cordero",
    "carne de pato", "carne de conejo", "carne de caza", "tocino", "jamón", "chorizo", "salchicha", "salami",
    "mortadela", "pepperoni", "panceta", "filete", "chuleta", "costilla", "hamburguesa", "salchicha",
    "salchicha italiana", "salsa de soja", "aceite de oliva", "aceite de girasol", "aceite de maíz", "aceite de coco",
    "aceite de palma", "aceite de canola", "aceite de cacahuete", "aceite de sésamo", "aceite de almendra", "aceite de aguacate",
    "vinagre", "vinagre balsámico", "vinagre de vino", "vinagre de manzana", "vinagre de arroz", "mostaza", "mostaza dijon",
    "mostaza en polvo", "mostaza a la antigua", "mostaza picante", "ketchup", "mayonesa", "salsa barbacoa", "salsa tártara",
    "salsa Worcestershire", "salsa de pescado", "salsa de ostras", "salsa de soja", "salsa de tomate", "salsa Alfredo",
    "salsa Bechamel", "salsa de carne", "salsa pesto", "salsa de chile", "salsa picante", "salsa de queso",
    "miel", "azúcar", "azúcar glas", "azúcar moreno", "azúcar de coco", "azúcar de caña", "azúcar de palma",
    "edulcorante", "jarabe de arce", "jarabe de agave", "jarabe de maíz", "jarabe de remolacha", "harina de trigo",
    "harina de maíz", "harina de arroz", "harina de avena", "harina de almendra", "harina de coco", "harina de garbanzo",
    "harina de quinoa", "harina de espelta", "harina de centeno", "harina de sorgo", "levadura", "bicarbonato de sodio",
    "levadura en polvo", "almendra", "nuez", "avellana", "cacahuete", "pistacho", "macadamia", "piñón",
    "castaña", "nuez de Brasil", "semillas de girasol", "semillas de calabaza", "semillas de lino", "semillas de chía",
    "semillas de cáñamo", "semillas de sésamo", "semillas de amapola", "semillas de amaranto", "semillas de girasol",
    "semillas de calabaza", "semillas de cáñamo", "semillas de sésamo", "semillas de amapola", "semillas de amaranto",
    "semillas de ajonjolí", "semillas de hinojo", "semillas de mostaza", "semillas de alcaravea", "semillas de anís",
    "semillas de cilantro", "semillas de comino", "semillas de cardamomo", "semillas de eneldo", "semillas de fenogreco",
    "semillas de fenogreco", "semillas de jengibre", "semillas de nuez moscada", "semillas de perejil", "semillas de romero",
    "semillas de tomillo", "semillas de salvia", "semillas de lavanda", "semillas de albahaca", "semillas de estragón"
  ];

  const addIngredient = () => {
    if(selectedIngredients.includes(addedIngredient.toLocaleLowerCase())){
        swal.fire({
            title: 'Error',
            text: 'Ya ingresaste este ingrediente',
            icon: 'error',
            confirmButtonText: 'OK'
        }); 
    } else if(ingredients.includes(addedIngredient.toLocaleLowerCase())){
        if(selectedIngredients.length >= 10){
            swal.fire({
                title: 'Error',
                text: 'Puedes seleccionar un máximo de 10 ingredientes a agregar',
                icon: 'error',
                confirmButtonText: 'OK'
            }); 
        } else {
            setSelectedIngredients([...selectedIngredients, addedIngredient])
        }
    } else {
        swal.fire({
            title: 'Error',
            text: 'Ingresa un ingrediente válido.',
            icon: 'error',
            confirmButtonText: 'OK'
        });    
    }
  }

  const excludeIngredient = () => {
    if(excludedIngredients.includes(excludedIngredient.toLocaleLowerCase())){
        swal.fire({
            title: 'Error',
            text: 'Ya ingresaste este ingrediente',
            icon: 'error',
            confirmButtonText: 'OK'
        }); 
    } else if(ingredients.includes(excludedIngredient.toLocaleLowerCase())){
        setExcludedIngredients([...excludedIngredients, excludedIngredient])
    } else {
        if(excludedIngredients.length >= 10){
            swal.fire({
                title: 'Error',
                text: 'Puedes seleccionar un máximo de 10 ingredientes a excluir',
                icon: 'error',
                confirmButtonText: 'OK'
            }); 
        } else {
            swal.fire({
                title: 'Error',
                text: 'Ingresa un ingrediente válido.',
                icon: 'error',
                confirmButtonText: 'OK'
            });   
        } 
    }
  }

  const generatePrompt = () => {
    if(!selectedIngredients && !excludedIngredients){
        swal.fire({
            title: 'Error',
            text: 'Debes seleccionar al menos un ingrediente para agregar o excluir de las recetas',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return "";
    }

    let prompt = "Incluye los siguientes ingredientes en las recetas: "
    if(selectedIngredients){
        prompt += selectedIngredients.join(", ")
    }
    if(excludedIngredients){
        prompt += ". Excluye las recetas que contengan los siguentes ingredientes: "
        prompt += excludedIngredients.join(", ")
    }
    prompt += ". Genera al menos 5 recetas."

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

        //add record
        const usageRecords = [{
            name: "recipes_ingredients",
            detail: `${selectedIngredients.length > 0 ? `Incluir: ${selectedIngredients[0]}` : `Excluir: ${excludedIngredients[0]}`}`
        }];
        await axios.post("/api/feature_usage", { usageRecords });

        swal.fire({
            title: 'Cargando',
            text: 'Generando las recetas...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        }); 

        const response = await axios.post("/api/recipes/ingredients", {
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
        console.log(error)
        swal.close()
        swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al generar las recetas. Inténtalo de nuevo',
            icon: 'error',
            confirmButtonText: 'OK'
        }); 
    }
};


  return (
    <div className="ml-5 mr-5">
        <h2 className={"mt-2 text-4xl text-white font-semibold md:mt-10"}>Recetas</h2>
            <h3 className={"mt-5 text-xl text-white md:w-4/5 lg:w-3/5"}>Selecciona los ingredientes que deseas incluir o excluir de las recetas</h3>
        <div className="mt-10 flex justify-around lg:justify-start">
            <button
                onClick={() => {
                    setSelectedList(0);
                }}
                className={cn("px-7 w-2/5 py-3 z-10 max-w-72 rounded-3xl text-white text-center font-semibold hover:bg-decoration-nutrition-colordark", {
                    "bg-decoration-nutrition-colordark": selectedList === 0,
                    "bg-decoration-nutrition-colorlight": selectedList !== 0
                })}            
            >
                Incluir
            </button>
            <button 
                onClick={() => {
                    setSelectedList(1);
                }}
                className={cn("px-7 py-3 w-2/5 z-10 max-w-72 rounded-3xl text-white text-center font-semibold hover:bg-decoration-nutrition-colordark lg:ml-10", {
                    "bg-decoration-nutrition-colordark": selectedList === 1,
                    "bg-decoration-nutrition-colorlight": selectedList !== 1
                })} 
            >
                Excluir
            </button>
        </div>
    
        <div className="w-4/5 max-w-[650px] mt-10 px-5 py-3 mx-auto rounded-3xl flex bg-custom-extralightpurple lg:ml-0">
            <input 
                id="listIngredients"
                placeholder="Ingrediente"
                className="w-4/5 outline-none border-none text-white bg-custom-extralightpurple placeholder-gray-300" type="text" list="ingredients"
                value={selectedList === 0 ? addedIngredient : excludedIngredient}
                onChange={e => {
                    selectedList === 0 ? setAddedIngredient(e.target.value) : setExcludedIngredient(e.target.value)  
                }}
            />
            <datalist id="ingredients">
                {ingredients.map(ingredient => (
                    <option key={ingredient} value={ingredient}>{ingredient}</option>
                ))}
            </datalist>
            <button
                onClick={selectedList === 0 ? addIngredient : excludeIngredient} 
                className="w-1/5 mr-5 z-10 text-white font-semibold hover:text-gray-300">
                    Agregar
            </button>
        </div>
        <ul className="mt-10 mb-10 mx-auto rounded-2xl pb-10 pt-7 flex flex-wrap content-start bg-dark-background-purple md:w-full lg:w-4/5 lg:max-w-[750px] lg:ml-0">
            {selectedList === 0 ? selectedIngredients.map(ingredient => (
                <ListItem key={ingredient} text={ingredient}/>)) 
                : excludedIngredients.map(ingredient => (
                <ListItem key={ingredient} text={ingredient}/>))
            }
        </ul>

        <div className="2xl:w-[1050px] flex">
            <MainButton onClick={generateRecipes} text={"Continuar"}/>
        </div>
    </div>
  );
};

export default RecipesIngredients;
