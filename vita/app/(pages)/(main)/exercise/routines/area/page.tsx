'use client'
import SelectableCard from '@/components/cards/SelectableCard';
import SelectableCardWrapper from '@/components/cards/SelectableCardWrapper';
import SearchBarButton from '@/components/searchbar/SearchbarButton';
import ExercisesContext from '@/context/exercises';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { IconType } from 'react-icons';

import { FaDumbbell, FaRunning } from 'react-icons/fa';
import { FaHeartPulse } from 'react-icons/fa6';
import { MdOutlineSportsGymnastics } from "react-icons/md";


import Swal from 'sweetalert2';

const AreaRoutine = () => {

    const areas = [
        "Hombros",
        "Trapecio",
        "Bíceps",
        "Pecho",
        "Abdominales",
        "Antebrazo",
        "Cuádriceps",
        "Tríceps",
        "Glúteos",
        "Espalda",
        "Isquiotibiales",
        "Gemelos",
        "Muslos",
        "Cuello"
    ]

    const availableIcons = [FaRunning, FaDumbbell, FaHeartPulse, MdOutlineSportsGymnastics]

    const {state, setState} = useContext(ExercisesContext);
    const [selections, setSelections] = useState<boolean[]>([]);
    const [list, setList] = useState<string[]>(areas);
    const [icons, setIcons] = useState<IconType[]>([]);
  
    const router = useRouter();

    useEffect(() => {
        const ics: IconType[] = []

        let i = 0;
        while(ics.length < areas.length){
            ics.push(availableIcons[i]);
            i++;
            i %= 4;
        }

        setIcons(ics);
    }, [])

    const findSelectedIndices = ():number[] => {
        const indices:number[] = []
        selections.forEach((selection, index) => {
            if(selection){
                indices.push(index)
            }
        })
        return indices;
    }

    const generatePrompt = () => {

        const selected = findSelectedIndices();

        if(selected.length === 0){
            Swal.fire({
                title: 'Error',
                text: 'Debes seleccionar al menos un área a entrenar',
                icon: 'error',
                confirmButtonText: 'OK'
            }); 
            return "";
        }

        if(selected.length > 5){
            Swal.fire({
                title: 'Error',
                text: 'Puedes seleccionar un máximo de 5 áreas a entrenar',
                icon: 'error',
                confirmButtonText: 'OK'
            }); 
            return "";
        }

        let prompt = `Quiero entrenar: `
        selected.forEach((el, index) => {
            if(index != selected.length){
                prompt += `${areas[el]}, `
            } else {
                prompt += `${areas[el]}.`
            }
        })
    
        const message = {
            role: "user",
            content: prompt
        }
    
        return message;
    }
    
    const generateExercises = async() => {
        try {
    
            const message = generatePrompt();

            if(message === ""){
                return;
            }

            const selected = findSelectedIndices();
            const usageRecords = selected.map((area) => ({
                name: "routine_area",
                detail: areas[area]
            }))

            await axios.post("/api/feature_usage", { usageRecords })
    
            Swal.fire({
                title: 'Cargando',
                text: 'Generando la rutina...',
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            }); 
    
            const response = await axios.post("/api/routines/areas", {
                message
            })
    
            let data = response.data.content;
            data = data.replaceAll("`", "");
            data = data.replace("json", "");
    
            const exercises = JSON.parse(data);
    
            setState({
                ...state,
                exercises
            })
    
            router.push("/exercise/routines/list")
            Swal.close()
            
        } catch(error: any){
            Swal.close()
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al generar la rutina. Inténtalo de nuevo',
                icon: 'error',
                confirmButtonText: 'OK'
            }); 
        }
    };

    return (
        <div className="ml-5 mr-5">
            <h2 className={"mt-2 text-4xl text-white font-semibold md:mt-10"}>Rutinas</h2>
            <h3 className={"mt-5 text-xl text-white md:w-4/5 lg:w-3/5"}>Escoge el área del cuerpo a entrenar</h3>

            <SearchBarButton
                placeholder='Hombros'
                list={areas}
                setList={setList}
                action={generateExercises}
            />

            <SelectableCardWrapper>
                {icons.length === areas.length && list.map((area, index) => (
                    <SelectableCard
                        key={area}
                        text={area}
                        selected={selections[index]}
                        icon={icons[index]}
                        toggle={() => {
                            const newSelections = [...selections]
                            newSelections[index] = !newSelections[index];
                            setSelections(newSelections)
                        }}
                    />
                ))}
            </SelectableCardWrapper>
            
        </div>
    );
};

export default AreaRoutine;
