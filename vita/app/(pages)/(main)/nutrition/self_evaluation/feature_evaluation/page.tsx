"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import FaceScale from "@/components/scales/FaceScale";
import ButtonEvaluation from "@/components/buttons/ButtonEvaluation.";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const FeatureEvaluationPage = () => {
  const features = ["generar planes nutricionales", "generar recetas", "dectectar calorías en imágenes"];
  const [grades, setGrades] = useState<number[]>([0, 0, 0])

  const router = useRouter();

  const updateArray = (index:number, newValue:number) => {
    const newGrades = [...grades];
    newGrades[index] = newValue;
    return newGrades
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
    onClick={() => {
        router.push("/nutrition")
    }} 
        text='Enviar'/>

    </div>
  );
};

export default FeatureEvaluationPage;