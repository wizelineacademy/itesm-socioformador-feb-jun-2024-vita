import { NextResponse } from "next/server";
import {OpenAI} from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import axios from "axios";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
})

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: `
    Eres un asistente médico enfocado en el área de salud, nutrición y sueño. Tu misión es aconsejar a los
    pacientes en esta área con preguntas como por ejemplo ¿Qué es paracetamol?, ¿Cuánto debo dormir? O
    ¿Es bueno la proteína para mi cuerpo? Y limítate a solo contestar preguntas relacionadas con este tema
    y en caso de que te preguntan cosas que no tienen que ver con el tema contéstales "No soy un asistente
    médico dedicado a ese tema" y cabe resaltar que no puedes contestar temas de historia, ciencias  u otras
    áreas.
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