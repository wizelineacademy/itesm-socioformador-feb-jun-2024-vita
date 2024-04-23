"use client";

import MainButton from "@/components/buttons/MainButton";
import { Goal } from "@/data/datatypes/goal";
import { nutritionGoals } from "@/data/nutrition_goals";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const GoalsDetailPage = ({ params }: { params: { idGoal: string } }) => {

    const [goal, setGoal] = useState<Goal>();
    const [extra, setExtra] = useState<boolean>(true);
    const [previous, setPrevious] = useState<number>();
    const [next, setNext] = useState<number>();

    const router = useRouter();

    useEffect(() => {
        
        const selected = nutritionGoals.find(goal => {
            return goal.id === Number(params.idGoal)
        });
        setGoal(selected);
        
        if(!selected?.variable){
            setExtra(false);
            createGoal(selected!);
        }

    }, []);

    const validateGoal = ():boolean => {

        if(!goal || !next || !previous){
            Swal.fire({
                title: 'Error',
                text: 'Debes ingresar el valor actual y el deseado',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false
        }


        if(goal.constraint === "increase" && next <= previous){
            Swal.fire({
                title: 'Error',
                text: 'El valor deseado debe ser mayor que el valor actual',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false
        } else if(goal.constraint === "decrease" && next >= previous) {
            Swal.fire({
                title: 'Error',
                text: 'El valor deseado debe ser menor que el valor actual',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        } else {
            return true;
        }

    }

    const createGoal = async (goal: Goal) => {
        try {

            const valid = validateGoal();
            if(!valid){
                return;
            }

            await axios.post("/api/goals", {
                name: goal?.title,
                category: goal?.category,
                variable: goal?.variable,
                currentValue: previous,
                desiredValue: next
            });
            Swal.fire({
                title: 'Meta agregada',
                text: 'Se agregó la meta con éxito',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(result => {
                if(result.isConfirmed){
                    router.push("/nutrition/goals")
                }
            })
        } catch(error){
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al agregar la meta',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <div className="bg-[#2C0521] p-4 text-white flex flex-col items-start justify-start space-y-4 pt-10 md:items-start">
            <h2 className="text-5xl font-bold mb-4">Mi Meta</h2>

            {(goal && extra) && 
                <>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault()
                            createGoal(goal);
                        }} 
                        className="flex w-full max-w-[1000px] flex-col gap-y-8"
                    >
                        <div>
                            <p className="text-xl font-bold mb-4 md:text-2xl">¿En qué {goal.variable} te encuentras?</p>
                            <div className="w-full flex items-center">
                                <input
                                    type="number"
                                    min={goal.min}
                                    max={goal.max}
                                    value={previous} 
                                    required
                                    onChange={(e) => {
                                        setPrevious(parseInt(e.target.value))
                                    }}
                                    className='w-4/5 max-w-56 md:max-w-80 px-3 py-3 md:py-4 rounded-2xl text-white border-none outline-none bg-custom-lightpurple placeholder-slate-300' 
                                    placeholder={goal.variable}
                                />
                                <p className='ml-2 font-semibold text-white'>{goal.measure}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xl font-bold mb-4 md:text-2xl">¿A qué {goal.variable} quieres llegar?</p>
                            <div className="w-full flex items-center">
                                <input
                                    type="number"
                                    min={goal.min}
                                    max={goal.max}
                                    value={next} 
                                    required
                                    onChange={(e) => {
                                        setNext(parseInt(e.target.value))
                                    }}
                                    className='w-4/5 max-w-56 md:max-w-80 px-3 py-3 md:py-4 rounded-2xl text-white border-none outline-none bg-custom-lightpurple placeholder-slate-300' 
                                    placeholder={goal.variable}
                                />
                                <p className='ml-2 font-semibold text-white'>{goal.measure}</p>
                            </div>
                        </div>
                    
                        <MainButton 
                            onClick={() => {
                            }} 
                            text="Guardar meta"/>
                    </form>
                </>
            }
        </div>

    )
}

export default GoalsDetailPage;