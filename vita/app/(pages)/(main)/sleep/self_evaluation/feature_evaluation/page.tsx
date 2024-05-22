"use client"

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FaceScale from "@/components/scales/FaceScale";
import ButtonEvaluation from "@/components/buttons/ButtonEvaluation.";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { nutritionGoals } from "@/data/nutrition_goals";
import AutoevaluationContext from "@/context/autoevaluation";

const SelfEvaluationPage = () => {
  const [progress, setProgress] = useState(0);
  const [improvement, setImprovement] = useState(0);
  const [goal, setGoal] = useState("");
  const [goalId, setGoalId] = useState(0);
  const {state, setState} = useContext(AutoevaluationContext);

  const router = useRouter();

  //set goal id and if extra information is necessary
  const setGoalDetails = (name: string) => {
    const selectedGoal = nutritionGoals.find(goal => {
      return goal.title === name
    });
    setGoalId(selectedGoal?.id ?? 0);
  }

  //verify if all questions have been asnswered
  const verifyData = () : boolean => {
    if(progress === 0 || improvement === 0){
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
      goalMetrics: [
        {
          name: "goal_progress",
          value: progress,
          idGoal: goalId
        },
        {
          name: "sleep_improvement",
          value: improvement,
          idGoal: goalId
        }
      ]
    })

    router.push("/nutrition/self_evaluation/feature_evaluation")
    
  }

  //fetch goal
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get("/api/goals/nutrition");
        const data = response.data

        setGoal(data.name);
        setGoalDetails(data.name)
       
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
          <p className="text-xl font-bold mb-4">¿Qué tanto progreso has tenido en tu calidad de sueño?</p>
          <FaceScale
              quality={progress}
              setQuality={(progress) => {
                setProgress(progress)
              }}
          />
        </div>

        <div className="w-full flex flex-col mb-5">
          <p className="text-xl font-bold mb-4">¿Qué tanto progreso has tenido en la cantidad de sueño que deseas dormir?</p>
          <FaceScale
              quality={improvement}
              setQuality={(value) => {
                setImprovement(value)
              }}
          />
        </div>
      </div>


      <ButtonEvaluation 
        disabled={!goal || progress === 0 || improvement === 0}
        onClick={movePage} 
        text='Continuar'/>

    </div>
  );
};

export default SelfEvaluationPage