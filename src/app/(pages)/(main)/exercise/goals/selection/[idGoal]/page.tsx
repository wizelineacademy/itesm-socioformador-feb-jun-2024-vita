"use client";

import { LbMsrInput } from "@/src/components/Inputs/LbMsrInput";
import { LbSelect } from "@/src/components/Inputs/LbSelect";
import MainButton from "@/src/components/buttons/MainButton";
import { CategoricGoal, Goal, NumericGoal, isCategoricalGoal, isNumericGoal } from "@/src/data/datatypes/goal";
import { exerciseGoals } from "@/src/data/exercise_goals";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const GoalsDetailPage = ({ params }: { params: { idGoal: string } }) => {

    const [goal, setGoal] = useState<Goal>();
    const [extra, setExtra] = useState<boolean>(true);
    const [previous, setPrevious] = useState<number|string>(0);
    const [next, setNext] = useState<number|string>(0);

    const router = useRouter();

    const fetchHealthData = async (goal: Goal) => {
        const data = await axios.get("/api/healthdata");
        setPrevious(goal?.data ? data.data[goal.data] : 0);
    }

    useEffect(() => {
        
        const selected = exerciseGoals.find(goal => {
            return goal.id === Number(params.idGoal)
        });

        setGoal(selected);
        
        if(!selected?.variable){
            setExtra(false);
            createGoal(selected!);
        } else {
            setExtra(true);
            if(selected.data){
                fetchHealthData(selected);
            }
        }

    }, []);


    const validateGoalNumeric = ():boolean => {

        if(!goal || !next || !previous){
            Swal.fire({
                title: 'Error',
                text: 'Debes ingresar el valor actual y el deseado',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false
        }

        if((goal as NumericGoal).constraint === "increase" && next <= previous){
            Swal.fire({
                title: 'Error',
                text: 'El valor deseado debe ser mayor que el valor actual',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false
        } else if((goal as NumericGoal).constraint === "decrease" && next >= previous) {
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

            
            if(goal.variable && isNumericGoal(goal)){
                const valid = validateGoalNumeric();
                if(!valid){
                    return;
                }
            }

            await axios.post("/api/goals", {
                name: goal?.title,
                category: goal?.category,
                variable: isNumericGoal(goal) ? goal?.variable : next,
                currentValue: isNumericGoal(goal) ? previous : null,
                desiredValue: isNumericGoal(goal) ? next : null
            });
            Swal.fire({
                title: 'Meta agregada',
                text: 'Se agregó la meta con éxito',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(result => {
                if(result.isConfirmed){
                    router.push("/exercise/goals")
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
        <div className="p-4 text-white flex flex-col items-start justify-start space-y-4 pt-10 md:items-start">
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

                        {isNumericGoal(goal) &&
                            <>
                                <LbMsrInput
                                    color={"bg-input-green"}
                                    label={goal.id === 1 ? "¿Cuántas veces a la semana haces ejercicio?" : `¿En qué ${goal.variable} te encuentras?`}
                                    variable={goal.variable ?? ""}
                                    min={(goal as NumericGoal).min ?? 0}
                                    max={(goal as NumericGoal).max ?? 0}
                                    measure={(goal as NumericGoal).measure ?? ""}
                                    value={previous as number}
                                    setValue={setPrevious as  React.Dispatch<React.SetStateAction<number>>}
                                />

                                <LbMsrInput
                                    color={"bg-input-green"}
                                    label={goal.id === 1 ? "¿Cuántas veces a la semana deseas hacer ejercicio?" : `¿Qué ${goal.variable} te gustaría alcanzar?`}
                                    variable={goal.variable ?? ""}
                                    min={(goal as NumericGoal).min ?? 0}
                                    max={(goal as NumericGoal).max ?? 0}
                                    measure={(goal as NumericGoal).measure ?? ""}
                                    value={next as number}
                                    setValue={setNext as  React.Dispatch<React.SetStateAction<number>>}
                                />
                            </> 
                        }

                        {isCategoricalGoal(goal) && 
                            <LbSelect
                                color={"bg-input-green"}
                                label={"Selecciona una opción"}
                                options={(goal as CategoricGoal).options}
                                value={next as string}
                                setValue={setNext as React.Dispatch<React.SetStateAction<string>>}
                            />
                        }

                        <MainButton 
                            onClick={() => {}} 
                            text="Guardar meta"/>
                    </form>
                </>
            }
        </div>

    )
}

export default GoalsDetailPage;