'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import ListItem from "@/app/components/list/ListItem";
import MainButton from "@/app/components/buttons/MainButton";


const RecipesIngredients = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(["carne", "papa"]); 
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>(["carne", "papa"]); 

  const [selectedList, setSelectedList] = useState<number>(0);
  const [addedIngredient, setAddedIngredient] = useState<string>("");
  const [excludedIngredient, setExcludedIngredient] = useState<string>("");

  const router = useRouter();

  const ingredients = ["manzana", "pera", "plátano", "mango", "guayaba", "queso", "leche", "arroz"]

  const addIngredient = () => {
    if(selectedIngredients.includes(addedIngredient.toLocaleLowerCase())){
        swal.fire({
            title: 'Error',
            text: 'Ya ingresaste este ingrediente',
            icon: 'error',
            confirmButtonText: 'OK'
        }); 
    } else if(ingredients.includes(addedIngredient.toLocaleLowerCase())){
        setSelectedIngredients([...selectedIngredients, addedIngredient])
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
        swal.fire({
            title: 'Error',
            text: 'Ingresa un ingrediente válido.',
            icon: 'error',
            confirmButtonText: 'OK'
        });    
    }
  }


  return (
    <div className="ml-5 mr-5">
        <h2 className={"mt-2 text-4xl text-white font-semibold md:mt-10"}>Recetas</h2>
            <h3 className={"mt-5 text-xl text-white md:w-4/5 lg:w-3/5"}>Selecciona la cantidad de calorías que deseas consumir y los porcentajes por grupo</h3>
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
            <MainButton onClick={() => {}} text={"Continuar"}/>
        </div>
    </div>
  );
};

export default RecipesIngredients;
