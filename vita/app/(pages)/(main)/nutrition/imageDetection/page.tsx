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
  const [loading, setLoading] = useState<boolean>(false); // Nuevo estado para indicar carga

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    setLoading(true); // Establecer el estado de carga a true

    const nutritionalInfos = await getNutritionalInfo(file);
    setNutritionalInfos(nutritionalInfos);
    setLoading(false); // Establecer el estado de carga a false cuando se completa la carga del modelo
  };

  const getNutritionalInfo = async (file: File): Promise<NutritionalInfo[] | null> => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = `
    Desarrolla un sistema de alta precisión que genere información nutricional aproximada por ingrediente en formato JSON a partir de una imagen de comida, utilizando fuentes confiables de información nutricional mediante acceso programático.

    Énfasis: Minimizar la inclusión de ingredientes falsos en la salida y garantizar la confiabilidad de la información nutricional proporcionada.
    
    Entrada:
    - Imagen:
        - Formato: JPEG o PNG
        - Tamaño máximo: 100 MB
        - Contenido: Un solo plato de comida
    
    Salida:
    - JSON:
        - Estructura: Lista de objetos NutritionalInfo
        - Objetos NutritionalInfo (solo para ingredientes identificados con alta confianza):
            - name: Nombre del ingrediente en español (México)
            - calories: Valor calórico (kcal)
            - lipids: Lípidos totales (g)
            - proteins: Proteínas totales (g)
            - carbohydrates: Carbohidratos totales (g)
            - subgroups: Lista de subgrupos alimenticios
    
    
            El sistema debe utilizar técnicas de aprendizaje profundo para:
            Reconocer y clasificar los diferentes tipos de alimentos presentes en la imagen.
            Estimar la cantidad de cada alimento en la imagen.
        
            Además, el sistema debe acceder a una base de datos confiable de información nutricional 
            para obtener los valores nutricionales de cada alimento identificado.
    
    Ejemplo de Entrada:
    - Imagen: [Imagen de una pizza]
    
    Ejemplo de Salida:
    [
      {
        "name": "Masa de pizza",
        "calories": 250,
        "lipids": 3.5,
        "proteins": 9,
        "carbohydrates": 47,
        "subgroups": ["Cereales"]
      },
      {
        "name": "Salsa de tomate",
        "calories": 30,
        "lipids": 0.2,
        "proteins": 1.5,
        "carbohydrates": 7,
        "subgroups": ["Verduras"]
      },
      {
        "name": "Queso mozzarella",
        "calories": 280,
        "lipids": 17,
        "proteins": 28,
        "carbohydrates": 3,
        "subgroups": ["Lácteos"]
      }
    ]
    
    Los valores nutricionales proporcionados son estimaciones y pueden variar en función de la receta 
    específica y los ingredientes utilizados. Ajuste las calorías y otros
     valores nutricionales según las porciones específicas observadas en la
      imagen (por ejemplo, una lamina de queso chedar que es aproximadamente 113  y el queso chedar completo que es mas de 300). 
      Se incluirán solo los ingredientes presentes en la imagen, sin añadir otros ingredientes extras o 
      supuestos.
  **Si la imagen no contiene comida, como juguetes, electrodomésticos
  u objetos de oficina, establezca 'name' en 'Invalido'.**
  `;


const imagePart = await fileToGenerativePart(file);

try {
  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  let text = await response.text();
  text = text.replaceAll("`", "")
  text = text.replaceAll("json", "")
  text = text.replaceAll("JSON", "")
  console.log(text)
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

// Calcular el total de calorías
const totalCalories = nutritionalInfos.reduce((acc, curr) => acc + curr.calories, 0);

return (
  <div>
    {totalCalories !== 0 && (
        <p className="text-xl font-bold text-white mt-4">Total de calorías: {totalCalories} aproximadas</p>
      )}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 lg:w-3/4">
      {nutritionalInfos.map((nutritionalInfo, index) => (
        nutritionalInfo.name === "Invalido" || nutritionalInfo.name === "Inválido" ? (
          <p key={index} className="text-3xl font-bold text-white">Imagen Inválida</p>
        ) : (
          <div key={index} className="bg-decoration-nutrition-colordark rounded-lg overflow-hidden shadow-md  ">
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
        )
      ))}
    </div>
  </div>
);
};

return (
<div className="container p-4">
  <h1 className="text-2xl font-bold text-start mb-4 text-white">Conteo Calórico </h1>
  <div className="flex justify-start mb-4">
    <input type="file" onChange={handleImageUpload} className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"/>
  </div>
  {loading && <p className="text-4xl font-bold text-white">Cargando...</p>}
  {imageUrl && (
    <div className="mt-4 ">
      <img src={imageUrl} alt="Uploaded" className="max-w-full h-auto sm:w-[500px] sm:h-[300px]" />
    </div>
  )}
  {renderNutritionalInfo()}
</div>
);
}

export default FoodAnalysisPage;