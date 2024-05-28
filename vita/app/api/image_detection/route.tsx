import { NutritionalInfo } from "@/data/datatypes/nutritionalInfo";
import config from "@/lib/environment/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

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
      supuestos. No regreses un objeto con una propiedad NutritionalInfo, regresa el arrego simplemente.
  **Si la imagen no contiene comida, como juguetes, electrodomésticos
  u objetos de oficina, establezca 'name' en 'Invalido'.**
  `;




export async function POST(request: Request) {
    
    const body = await request.json();
    const { imagePart } = body;

    try {

        const genAI = new GoogleGenerativeAI(config.geminiApiKey!);
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const result = await model.generateContent([prompt, imagePart]);
        const response = result.response;
        let text = response.text();
        text = text.replaceAll("`", "")
        text = text.replaceAll("json", "")
        text = text.replaceAll("JSON", "")
        const nutritionalInfos: NutritionalInfo[] = JSON.parse(text);

        return NextResponse.json(nutritionalInfos, {status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json("Error detecting image", {status: 400})
    }
}
