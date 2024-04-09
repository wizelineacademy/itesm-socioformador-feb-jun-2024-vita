import { NextResponse } from "next/server";
import {OpenAI} from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
})

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: `
    Dame algunas ideas de recetas saludables. Te indicaré la cantidad de calorias que deseo consumir y cómo quiero que esté divida mi alimentación en proporciones de lípidos, carbohidratos y proteínas.
    El JSON debe contener los siguientes campos:
    - name: nombre de la receta en string
    - description: descripción en una a dos líneas de la receta en string
    - ingredients: una lista con los ingredientes de la receta y cantidades de cada uno, cada elemento de la lista es un string con el ingrediente y su cantidad. 
    - steps: Una lista con los pasos de la receta, cada paso es un string
    - time: El tiempo estimado que toma hacer la receta en string
    Dame al menos 5 recetas.
    `
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { message } = body;

    if(!message){
        return new NextResponse("message is required", {status: 400})
    }

    if(!process.env.OPEN_API_KEY){
        return new NextResponse("OpenAI API Key not configured", {status: 400})
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [instructionMessage, message]
    })

    return NextResponse.json(response.choices[0].message)
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error generating recipes", {status: 500})
  }
}