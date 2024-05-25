"use client";

import { LbMsrInput } from "@/components/Inputs/LbMsrInput";
import MainButton from "@/components/buttons/MainButton";
import AutoevaluationContext from "@/context/autoevaluation";
import { NumericGoal } from "@/data/datatypes/goal";
import { nutritionGoals, nutritionQuestions } from "@/data/nutrition_goals";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const EvaluationGoalPage = ({ params }: { params: { idGoal: string } }) => {

    const [goal, setGoal] = useState<NumericGoal>();
    const [question, setQuestion] = useState<GoalRecord>();
    const [current, setCurrent] = useState<number>(0);
    const {state, setState} = useContext(AutoevaluationContext);

    const router = useRouter();

    const fetchHealthData = async (goal: NumericGoal) => {
        const data = await axios.get("/api/healthdata");
        setCurrent(goal?.data ? data.data[goal.data] : 0);
    }

    useEffect(() => {
        
        const selectedGoal = nutritionGoals.find(goal => {
            return goal.id === Number(params.idGoal)
        });
        const selectedQuestion = nutritionQuestions.find(question => question.id === Number(params.idGoal))
        setGoal(selectedGoal ?? nutritionGoals[0]);
        setQuestion(selectedQuestion ?? nutritionQuestions[0])
        fetchHealthData(selectedGoal ?? nutritionGoals[0]);

    }, []);

    //verify if all questions have been asnswered
    const verifyData = () : boolean => {
        if(current === 0){
        Swal.fire({
            title: 'Error',
            text: "Debes completar todas las preguntas",
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return false
        }
        return true
    }

    //update state and move page
    const movePage = () => {

        if(!verifyData()){
        return;
        }

        setState({
            ...state,
            records: [
                {
                    name: goal?.variable ?? "record",
                    value: current,
                    category: "nutrition"
                }
            ]
        })

        router.push("/nutrition/self_evaluation/feature_evaluation")

    }

    return (
        <div className="p-4 text-white flex flex-col items-start justify-start space-y-4 pt-10 md:items-start">
            <h2 className="text-5xl font-bold mb-4">Mi Meta</h2>

            { goal && 
                <>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault()
                            movePage()
                        }} 
                        className="flex w-full max-w-[1000px] flex-col gap-y-8"
                    >

                        <LbMsrInput
                            label={question?.question ?? ""}
                            variable={goal.variable ?? ""}
                            min={goal.min ?? 0}
                            max={goal.max ?? 0}
                            measure={goal.measure ?? ""}
                            value={current}
                            setValue={setCurrent}
                        />
                    
                        <MainButton
                            disabled={!goal || current === 0}
                            onClick={() => {}} 
                            text="Continuar"/>
                    </form>
                </>
            }
        </div>

    )
}

export default EvaluationGoalPage;