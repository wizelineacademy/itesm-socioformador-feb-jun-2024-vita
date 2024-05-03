"use client"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

// Access your API key (see "Set up your API key" above)
// Assuming you meant to use the GEMINI_API_KEY instead of NEXT_PUBLIC_GENERATIVE_AI_API_KEY
const API_KEY = process.env.GEMINI_API_KEY;

interface NutritionalInfo {
  calories: number;
  lipids: number;
  proteins: number;
  carbohydrates: number;
  subgroups: string[];
}

async function getNutritionalInfo(file: File): Promise<NutritionalInfo | null> {
  // if (!"AIzaSyC1aNuMH4WNR7S3fqHShtrktR3ZVB3XyMo") {
  //   throw new Error("Generative AI API key is not provided");
  // }

  const genAI = new GoogleGenerativeAI("AIzaSyC1aNuMH4WNR7S3fqHShtrktR3ZVB3XyMo");

  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = `
  Dime las calorías, lípidos, proteínas, carbohidratos y subgrupos alimenticios en formato JSON. El JSON será una lista de objetos NutritionalInfo. Por ejemplo:
{
  "calories": 250,
  "lipids": 10,
  "proteins": 15,
  "carbohydrates": 30,
  "subgroups": ["Frutas", "Verduras"]
}

Por favor, proporciona los valores de calorías, lípidos, proteínas, carbohidratos 
y subgrupos para un alimento, 
separados por comas y en ese orden. Esto es un ejemplo;
 250, 10, 15, 30, "Frutas, Verduras`
  ;
  const imagePart = await fileToGenerativePart(file);

  try {
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    

    // Extract the JSON data

    console.log("Respuesta de json a la conversion",JSON.parse(text))
    // Parse the JSON data
    const nutritionalInfo: NutritionalInfo = JSON.parse(text);

    return nutritionalInfo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file: File) {
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
}

export default function FoodAnalysisPage() {
  const [nutritionalInfos, setNutritionalInfos] = useState<NutritionalInfo[] | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const nutritionalInfos = await getNutritionalInfo(file);
    setNutritionalInfos(nutritionalInfos);
    console.log("Nutritional Infos:", nutritionalInfos); // Log to console
  };

  const renderNutritionalInfo = () => {
    if (!nutritionalInfos) return null;

    return (
      <div>
        {nutritionalInfos.map((nutritionalInfo, index) => (
          <div key={index} className="mt-4 p-4 bg-gray-200 rounded-md">
            <h2>Alimento {index + 1}:</h2>
            <p>Calorías: {nutritionalInfo.calories}</p>
            <p>Lípidos: {nutritionalInfo.lipids}</p>
            <p>Proteínas: {nutritionalInfo.proteins}</p>
            <p>Carbohidratos: {nutritionalInfo.carbohydrates}</p>
            <p>Subgrupos: {nutritionalInfo.subgroups.join(", ")}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-start my-4 text-white">Análisis Nutricional de Alimentos</h1>
      <div className="flex flex-col items-start">
        <input type="file" onChange={handleImageUpload} className="text-white text-2xl mt-4"/>
        {renderNutritionalInfo()}
      </div>
    </div>
  );
}
