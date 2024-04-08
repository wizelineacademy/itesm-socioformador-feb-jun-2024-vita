'use client'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from 'react-icons/fa'; 
import swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { RegisterSchema } from "@/app/validations/RegisterSchema";
import Information from "@/app/components/information/Information";
import Input from "@/app/components/Inputs/Input";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import ListItem from "@/app/components/list/ListItem";


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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
    axios.post('/api/register', data)
      .then(() => {
        swal.fire({
        title: 'Se ha registrado',
        text: 'El registro ha sido exitoso.',
        icon: 'success',
        confirmButtonText: 'OK'
        });
        router.push('/healthdata');
      })
      .catch((error) => {
        swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error durante el registro.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        
      })
      .finally(() => {
      });
  };

  return (
    <div className="ml-5 mr-5">
        <h2 className={"mt-2 text-4xl text-white font-semibold"}>Recetas</h2>
        <h3 className={"mt-5 text-xl text-white"}>Selecciona los ingredientes que deseas incluir o excluir de las recetas</h3>
        <div className="mt-5 flex justify-around">
            <div 
                onClick={() => {
                    setSelectedList(0);
                }}
                className={cn("px-7 py-3 rounded-3xl text-white font-semibold hover:bg-decoration-nutrition-colordark", {
                    "bg-decoration-nutrition-colordark": selectedList === 0,
                    "bg-decoration-nutrition-colorlight": selectedList !== 0
                })}            
            >
                Incluir
            </div>
            <div 
                onClick={() => {
                    setSelectedList(1);
                }}
                className={cn("px-7 py-3 rounded-3xl text-white font-semibold hover:bg-decoration-nutrition-colordark", {
                    "bg-decoration-nutrition-colordark": selectedList === 1,
                    "bg-decoration-nutrition-colorlight": selectedList !== 1
                })} 
            >
                Excluir
            </div>
        </div>
    
        <div className="w-2/3 mt-6 px-5 py-3 mx-auto rounded-3xl flex bg-custom-extralightpurple">
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
                className="w-1/5 mr-5 text-white font-semibold">
                    Agregar
            </button>
        </div>
        <ul className="mt-6">
            {selectedList === 0 ? selectedIngredients.map(ingredient => (
                <ListItem key={ingredient} text={ingredient}/>)) 
                : excludedIngredients.map(ingredient => (
                <ListItem key={ingredient} text={ingredient}/>))
            }
        </ul>

        <button className="mt-8 w-4/5 px-5 py-3 rounded-2xl mx-auto flex justify-center text-white font-semibold bg-button-blue">
            Continuar
        </button>
    </div>
  );
};

export default RecipesIngredients;
