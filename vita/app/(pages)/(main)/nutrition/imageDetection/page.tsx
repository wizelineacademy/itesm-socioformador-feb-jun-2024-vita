"use client"
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC1aNuMH4WNR7S3fqHShtrktR3ZVB3XyMo";

interface NutritionalInfo {
  name: string;
  calories: number;
  lipids: number;
  proteins: number;
  carbohydrates: number;
  subgroups: string[];
}

function FoodAnalysisPage() {
  const [nutritionalInfos, setNutritionalInfos] = useState<NutritionalInfo[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);

    const nutritionalInfos = await getNutritionalInfo(file);
    setNutritionalInfos(nutritionalInfos);
  };

  const getNutritionalInfo = async (file: File): Promise<NutritionalInfo[] | null> => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = `
    El usuario va a subir una imagen  plato de comida como entrada y genere una lista de objetos NutritionalInfo en formato JSON como salida. Cada objeto NutritionalInfo debe contener los siguientes atributos:
    
    name: Nombre del alimento identificado en la imagen.
    calories: Valor de las calorías del alimento (kcal).
    lipids: Valor de los lípidos totales del alimento (g).
    proteins: Valor de las proteínas totales del alimento (g).
    carbohydrates: Valor de los carbohidratos totales del alimento (g).
    subgroups: Lista de subgrupos alimenticios a los que pertenece el alimento.
    El sistema debe utilizar técnicas de aprendizaje profundo para:
    
    Reconocer y clasificar los diferentes tipos de alimentos presentes en la imagen.
    Estimar la cantidad de cada alimento en la imagen.
    Además, el sistema debe acceder a una base de datos confiable de información nutricional para obtener los valores nutricionales de cada alimento identificado.
    
    Ejemplo:
    
    Ejemplo de entrada: Imagen de un plato de sushi.
    
    Ejemplo de alida:
    
    JSON
    [
      {
        "name": "Arroz de sushi",
        "calories": 150,
        "lipids": 2,
        "proteins": 4,
        "carbohydrates": 32,
        "subgroups": ["Cereales"]
      },
      {
        "name": "Atún",
        "calories": 50,
        "lipids": 2,
        "proteins": 12,
        "carbohydrates": 0,
        "subgroups": ["Pescados y mariscos"]
      },
    ]
    El name debe estar en español de México`

    const imagePart = await fileToGenerativePart(file);

    try {
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      let text = await response.text();
      text = text.replaceAll("`", "")
      text = text.replaceAll("json", "")
      
      const nutritionalInfos: NutritionalInfo[] = JSON.parse(text);

      return nutritionalInfos;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          resolve(result.split(',')[1]);
        } else {
          resolve('');
        }
      };
      reader.readAsDataURL(file);
    });

    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  const renderNutritionalInfo = () => {
    if (!nutritionalInfos) return null;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 lg:w-3/4">
        {nutritionalInfos.map((nutritionalInfo, index) => (
          <div key={index} className="bg-decoration-nutrition-colordark rounded-lg overflow-hidden shadow-md ">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-white">{nutritionalInfo.name}</h2>
              <div className="grid grid-cols-2 gap-1">
                <p className="text-md text-white"><span className="font-semibold">Calorías:</span> {nutritionalInfo.calories}</p>
                <p className="text-md text-white"><span className="font-semibold">Lípidos:</span> {nutritionalInfo.lipids}</p>
                <p className="text-md text-white"><span className="font-semibold">Proteínas:</span> {nutritionalInfo.proteins}</p>
                <p className="text-md text-white "><span className="font-semibold">Carbohidratos:</span> {nutritionalInfo.carbohydrates}</p>
                <p className="col-span-2 text-md text-white"><span className="font-semibold">Subgrupos:</span> {nutritionalInfo.subgroups.join(", ")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold text-start mb-4 text-white">Conteo Calórico </h1>
      <div className="flex justify-start mb-4">
        <input type="file" onChange={handleImageUpload} className="px-4 py-2 bg-decoration-nutrition-colordark  text-white rounded-md cursor-pointer"/>
      </div>
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Uploaded" className="max-w-full h-auto sm:w-[500px] sm:h-[300px]" />
        </div>
      )}
      {renderNutritionalInfo()}
    </div>
  );
}

export default FoodAnalysisPage;
