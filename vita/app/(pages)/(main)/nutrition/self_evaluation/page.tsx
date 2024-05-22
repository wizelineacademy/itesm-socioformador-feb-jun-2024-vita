"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import FaceScale from "@/components/scales/FaceScale";
import ButtonEvaluation from "@/components/buttons/ButtonEvaluation.";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { nutritionGoals } from "@/data/nutrition_goals";

const SelfEvaluationPage = () => {
  const [progress, setProgress] = useState(0);
  const [planAdherence, setPlanAdherence] = useState(0);
  const [goal, setGoal] = useState("");
  const [goalId, setGoalId] = useState(0);
  const [hasDetail, setHasDetail] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get("/api/goals/nutrition");
        const data = response.data

        setGoal(data.name);

        const selectedGoal = nutritionGoals.find(goal => {
          return goal.title === data.name
        });
        setGoalId(selectedGoal?.id ?? 0);
        setHasDetail(selectedGoal?.variable? true : false);
      } catch(error) {
        Swal.fire({
          title: 'Recuerda',
          text: "Debes elegir una meta antes de realizar una evaluación",
          icon: 'info',
          confirmButtonText: 'OK'
        }).then((result) => {
          if(result.isConfirmed){
            router.push("/nutrition")
          }
        })
        console.log(error);
      }
    }
    
    fetchGoal();
  }, []);


  return (
    <div className="p-4 text-white flex flex-col gap-y-3 items-start justify-start space-y-4 pt-10 md:items-start">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Autoevaluación</h2>

      <h3 className="text-2xl font-bold">Meta actual</h3>
      <p className='mt-5 py-3 pl-4 w-full max-w-[500px] rounded-2xl text-lg bg-custom-lightpurple'>{goal}</p>

      <div className="w-full flex flex-col gap-y-10 align-center">
        <div className="w-full flex flex-col">
          <p className="text-xl font-bold mb-4">¿Qué tanto progreso has tenido en tu meta?</p>
          <FaceScale
              quality={progress}
              setQuality={(progress) => {
                setProgress(progress)
              }}
          />
        </div>

        <div className="w-full flex flex-col mb-5">
          <p className="text-xl font-bold mb-4">¿Qué tan bien estás siguiendo tu plan de nutrición?</p>
          <FaceScale
              quality={planAdherence}
              setQuality={(value) => {
                setPlanAdherence(value)
              }}
          />
        </div>
      </div>


      <ButtonEvaluation 
        onClick={() => {
          if(hasDetail){
            router.push(`/nutrition/self_evaluation/goals/${goalId}`)
          } else {
            router.push("/nutrition/self_evaluation/feature_evaluation")
          }
        }} 
        text='Continuar'/>

    </div>
  );
};

export default SelfEvaluationPage