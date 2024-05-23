"use client"

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FaceScale from "@/components/scales/FaceScale";
import ButtonEvaluation from "@/components/buttons/ButtonEvaluation.";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import AutoevaluationContext from "@/context/autoevaluation";
import { exerciseGoals } from "@/data/exercise_goals";
import { isNumericGoal } from "@/data/datatypes/goal";

const ExerciseEvalPage = () => {
  const [progress, setProgress] = useState(0);
  const [routineAdherence, setRoutineAdherence] = useState(0);
  const [goal, setGoal] = useState({name: "", idGoal: 0});
  const [goalId, setGoalId] = useState(0); //goal id based on the different available goals, it is not the idGoal stored in the db
  const [hasDetail, setHasDetail] = useState(false);
  const {state, setState} = useContext(AutoevaluationContext);

  const router = useRouter();

  //set goal id and if extra information is necessary
  const setGoalDetails = (name: string) => {
    const selectedGoal = exerciseGoals.find(goal => {
      return goal.title === name
    });
    setGoalId(selectedGoal?.id ?? 0);
    setHasDetail(isNumericGoal(selectedGoal!));
  }

  //verify if all questions have been asnswered
  const verifyData = () : boolean => {
    if(progress === 0 || routineAdherence === 0){
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
          idGoal: goal.idGoal
        },
        {
          name: "routine_adherence",
          value: routineAdherence,
          idGoal: goal.idGoal
        }
      ]
    })

    if(hasDetail){
      router.push(`/exercise/self_evaluation/goals/${goalId}`)
    } else {
      router.push("/exercise/self_evaluation/feature_evaluation")
    }
  }

  //fetch goal
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get("/api/goals/exercise");
        const data = response.data

        setGoal(data);
        setGoalDetails(data.name)
       
      } catch(error) {
        Swal.fire({
          title: 'Recuerda',
          text: "Debes elegir una meta antes de realizar una evaluación",
          icon: 'info',
          confirmButtonText: 'OK'
        }).then((result) => {
          if(result.isConfirmed){
            router.push("/exercise")
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
      <p className='mt-5 py-3 pl-4 w-full max-w-[500px] rounded-2xl text-lg bg-input-green'>{goal.name}</p>

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
          <p className="text-xl font-bold mb-4">¿Qué tan bien estás siguiendo tu rutina?</p>
          <FaceScale
              quality={routineAdherence}
              setQuality={(value) => {
                setRoutineAdherence(value)
              }}
          />
        </div>
      </div>


      <ButtonEvaluation 
        disabled={!goal || progress === 0 || routineAdherence === 0}
        onClick={movePage} 
        text='Continuar'/>

    </div>
  );
};

export default ExerciseEvalPage