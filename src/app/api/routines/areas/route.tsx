import { NextResponse } from "next/server";
import {OpenAI} from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import config from "@/src/lib/environment/config";
import { db } from "@/src/db/drizzle";

const openai = new OpenAI({
    apiKey: config.openApiKey
})

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: `
    Dame una rutina de ejercicios para realizar en un solo entrenamiento. dame al menos uno o dos ejercicios por cada área del cuerpo. 
    Si son menos de 5 áreas dame al menos 5 ejercicios. Te indicaré las áreas del cuerpo que deseo entrenar.
    El JSON será una lista de objetos ejercicio. Después del último elemento de las listas de impact_areas y precautions no pongas coma. Cada ejercicio debe contener los siguientes campos:
    - name: nombre del ejercicio en string
    - description: descripción en una a dos líneas del ejercicio y cómo realizarlo en string
    - amount: la cantidad a realizar del ejercicio en string (ej. 20 repeticiones, 10 vueltas, 5 minutos, etc.)
    - intensity: la intensidad del ejercicio en number del 1 al 10
    - impact_areas: una lista con las áreas del cuerpo a entrenar en este ejercicio, cada elemento de la lista es un string. 
    - precautions: Una lista con las precauciones a tomar en cuenta, cada una es un string
    Te doy un ejemplo del formato que necesito, no agregues la lista dentro de una propiedad, solo devuelveme la lista:
    [
        {
            "name": "Sentadillas",
            "description": "Flexiona las rodillas y baja el cuerpo como si fueras a sentarte, manteniendo la espalda recta.",
            "amount": "3 series de 15 repeticiones",
            "intensity": 7,
            "impact_areas": ["Piernas", "Glúteos"],
            "precautions": ["Mantén la espalda recta en todo momento", "No dejes que las rodillas sobrepasen los dedos de los pies"]
        },
        {
            "name": "Flexiones de brazos",
            "description": "Apoya las manos en el suelo a la altura de los hombros y baja el cuerpo flexionando los codos, luego vuelve a la posición inicial extendiendo los brazos.",
            "amount": "4 series de 12 repeticiones",
            "intensity": 8,
            "impact_areas": ["Pecho", "Brazos", "Hombros"],
            "precautions": ["Mantén el cuerpo alineado desde la cabeza hasta los pies", "Evita arquear la espalda"]
        }
    ]
    `
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { message } = body;

    if(!message){
        return new NextResponse("message is required", {status: 400})
    }

    if(!config.openApiKey){
        return new NextResponse("OpenAI API Key not configured", {status: 400})
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [instructionMessage, message]
    })

    return NextResponse.json(response.choices[0].message)
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error generating exercises", {status: 500})
  }
}