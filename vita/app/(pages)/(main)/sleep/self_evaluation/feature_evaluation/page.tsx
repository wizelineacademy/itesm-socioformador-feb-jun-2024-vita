"use client"

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FaceScale from "@/components/scales/FaceScale";
import ButtonEvaluation from "@/components/buttons/ButtonEvaluation.";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import AutoevaluationContext from "@/context/autoevaluation";
import { LbMsrInput } from "@/components/Inputs/LbMsrInput";
import { Autoevaluation } from "@/data/datatypes/autoeval";

const SleepFeatureEvalPage = () => {
  
  const [hours, setHours] = useState(0);
  const [grade, setGrade] = useState<number>(0)
  const {state, setState} = useContext(AutoevaluationContext);

  const router = useRouter();

  //verify if all questions have been asnswered
  const verifyData = () : boolean => {
    if(grade === 0 || hours === 0){
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
  const storeData = () : Autoevaluation | null => {

    if(!verifyData()){
      return null;
    }

    const newState = {
        ...state,
        featureMetrics: [
          {
            name: "sleep_recommendations",
            value: grade
          }
        ],
        records: [
            {
                name: "sleep_hours",
                value: hours,
                category: "sleep"
            }
        ]
    }

    setState(newState)

    return newState;
    
  }

  const sendData = async () => {

    const evalData = storeData();

    if(evalData){

      try {

        if(evalData.goalMetrics.length === 0 || 
            evalData.featureMetrics.length === 0 || 
            evalData.records.length === 0){
          throw Error("Incomplete data")
        }

        const goalsRes = await axios.post("/api/goal_evaluations", {
          evaluations: evalData.goalMetrics
        })
        const featsRes = await axios.post("/api/feature_evaluations", {
          evaluations: evalData.featureMetrics
        })
        const recordsRes = await axios.post("/api/records", {
          records: evalData.records
        })


        Swal.fire({
            title: 'Éxito',
            text: "Se han guardado las respuestas con éxito",
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if(result.isConfirmed){
                setState({
                    goalMetrics: [],
                    featureMetrics: [],
                    records: []
                })
                router.push("/sleep")
            }
        })

      } catch(error) {
        console.log(error)
        Swal.fire({
          title: 'Error',
          text: "Ocurrió un error al enviar los datos",
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  return (
    <div className="p-4 text-white flex flex-col gap-y-3 items-start justify-start space-y-4 pt-10 md:items-start">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Autoevaluación</h2>

      <div className="w-full flex flex-col gap-y-10 align-center">

        <div className="flex w-full max-w-[1000px] flex-col gap-y-8">
            <LbMsrInput
                color="bg-input-purple"
                label={"¿Cuántas horas duermes actualmente?"}
                variable={"horas"}
                min={0}
                max={12}
                measure={"Horas"}
                value={hours}
                setValue={setHours}
            />
        </div>

        <div className={`w-full flex flex-col mb-5`}>
            <p className="text-xl font-bold mb-4">¿Qué tan útiles te ha sido las recomendaciones de sueño?</p>
            <FaceScale
                quality={grade}
                setQuality={(value) => {
                    setGrade(value)
                }}
            />
        </div>

      </div>

      <ButtonEvaluation 
        onClick={sendData} 
        text='Enviar'
        disabled={grade === 0 || hours === 0}
      />
    </div>
  );
};

export default SleepFeatureEvalPage;