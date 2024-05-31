"use client"

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FaceScale from "@/src/components/scales/FaceScale";
import ButtonEvaluation from "@/src/components/buttons/ButtonEvaluation.";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import AutoevaluationContext from "@/src/context/autoevaluation";
import { Autoevaluation } from "@/src/data/datatypes/autoeval";

const FeatureEvaluationPage = () => {
  const features = ["generar planes nutricionales", "generar recetas", "dectectar calorías en imágenes"];
  const [grades, setGrades] = useState<number[]>([0, 0, 0])
  const {state, setState} = useContext(AutoevaluationContext);

  const router = useRouter();

  const updateArray = (index:number, newValue:number) => {
    const newGrades = [...grades];
    newGrades[index] = newValue;
    return newGrades
  }

  //verify if all questions have been asnswered
  const verifyData = () : boolean => {
    if(grades.includes(0)){
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
          name: "nutritional_plans",
          value: grades[0]
        }, 
        {
          name: "receipes",
          value: grades[1]
        }, 
        {
          name: "image_calories",
          value: grades[2]
        }
      ]
    }

    setState(newState)

    return newState;
    
  }

  const sendData = async () => {

    const evaluationData = storeData()

    if(evaluationData){

      try {

        if(evaluationData.goalMetrics.length === 0 || 
          evaluationData.featureMetrics.length === 0 || 
          evaluationData.records.length === 0){
          throw Error("Incomplete data")
        }

        const goalsRes = await axios.post("/api/goal_evaluations", {
          evaluations: evaluationData.goalMetrics
        })
        const featsRes = await axios.post("/api/feature_evaluations", {
          evaluations: evaluationData.featureMetrics
        })
        const recordsRes = await axios.post("/api/records", {
          records: evaluationData.records
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
                router.push("/nutrition")
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

        {features.map((feature, index) => (
            <div key={feature} className={`w-full flex flex-col ${index === features.length-1 ? "mb-5" : ""}`}>
                <p className="text-xl font-bold mb-4">¿Qué tan útil te ha sido la función de {feature}?</p>
                <FaceScale
                    quality={grades[index]}
                    setQuality={(value) => {
                        setGrades(updateArray(index, value))
                    }}
                />
            </div>
        ))}

    </div>

    <ButtonEvaluation 
      onClick={sendData} 
        text='Enviar'/>
    </div>
  );
};

export default FeatureEvaluationPage;