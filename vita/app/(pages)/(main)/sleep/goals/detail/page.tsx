"use client";

import { LbMsrInput } from "@/components/Inputs/LbMsrInput";
import MainButton from "@/components/buttons/MainButton";
import FaceScale from "@/components/scales/FaceScale";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const SleepGoalsDetailPage = ({ params }: { params: { idGoal: string } }) => {

    const [quality, setQuality] = useState<number>(0);
    const [previous, setPrevious] = useState<number>(0);
    const [next, setNext] = useState<number>(0);

    const router = useRouter();

    //veify that the data has been set
    const validateGoal = ():boolean => {

        if(!next || !previous || quality === 0){
            Swal.fire({
                title: 'Error',
                text: 'Debes ingresar el valor actual y el deseado',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }

        return true;
    }

    //POST goal
    const createGoal = async () => {
        try {

            const valid = validateGoal()
            if(!valid){
                return;
            }

            await axios.post("/api/goals/sleep/hours", {
                name: "Mejorar mis horas de sueño",
                category: "sleep",
                variable: "Horas de sueño",
                currentValue: previous,
                desiredValue: next
            });

            await axios.post("/api/goals/sleep/quality", {
                name: "Mejorar mi calidad de sueño",
                category: "sleep",
                variable: "Calidad de sueño",
                desiredValue: quality
            });

            Swal.fire({
                title: 'Meta agregada',
                text: 'Se agregó la meta con éxito',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(result => {
                if(result.isConfirmed){
                    router.push("/sleep/goals")
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
        <div className="p-4 text-white flex flex-col items-start justify-start space-y-4 md:pt-10 md:items-start">
            <h2 className="text-5xl font-bold mb-4">Mi Meta</h2>
 
                <>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault()
                            createGoal()
                        }} 
                        className="flex w-full max-w-[1000px] flex-col gap-y-8"
                    >

                        <LbMsrInput
                            color="bg-input-purple"
                            label={`¿Cuántas horas duermes actualmente?`}
                            variable={"Horas de sueño"}
                            min={0}
                            max={12}
                            measure={"horas"}
                            value={previous}
                            setValue={setPrevious}
                        />

                        <LbMsrInput
                            color="bg-input-purple"
                            label={`¿Cuántas horas te gustaría dormir?`}
                            variable={"Horas de sueño"}
                            min={0}
                            max={12}
                            measure={"horas"}
                            value={next}
                            setValue={setNext}
                        />
                        
                        <div className="w-full">
                            <p className="text-xl font-bold mb-4">¿Cómo te despiertas?</p>
                            <FaceScale
                                quality={quality}
                                setQuality={(quality) => {
                                    setQuality(quality)
                                }}
                            />
                        </div>
                    
                        <MainButton 
                            onClick={() => {}} 
                            text="Guardar meta"/>
                    </form>
                </>
            
        </div>

    )
}

export default SleepGoalsDetailPage;