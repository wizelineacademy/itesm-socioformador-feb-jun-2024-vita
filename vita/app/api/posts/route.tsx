import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/db/drizzle";
import { Articles } from "@/db/schema/schema"; 
import {OpenAI} from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import config from "@/lib/environment/config";

const openai = new OpenAI({
    apiKey: config.openApiKey
})

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: `
    Genera un post para una red social de posts de salud en formato JSON. 
    El post puede ser de temas variados, no hagas todos de alimentación saludable, sé creativo. 
    Considera los siguientes para generar ideas: Nutrición, Sueño, Ejercicio, Salud general 
    El JSON dene contener los siguientes campos:    
    - name: título del post, debe ser muy corto y menor a 30 caracteres, aproximadamente 3 a 5 palabras, no puede ser mayor de 30 caracteres
    - description: contenido del post, manténlo corto alrededor de un párrafo.
    - imagePrompt: un prompt para DALLE-3 indicando generar una imagen relacionada al tema de este post
    Te doy un ejemplo del formato que necesito, es un solo post, no una lista de posts:
    {
        "name": "Mejora tu sueño",
        "description": "El sueño es esencial para la salud y el bienestar. Para mejorar la calidad de tu descanso, establece una rutina de sueño regular, evita la cafeína y la pantalla antes de acostarte, y asegúrate de que tu dormitorio sea un ambiente tranquilo y oscuro.",
        "imagePrompt": "Una persona durmiendo plácidamente en una habitación acogedora y oscura, rodeada de almohadas suaves y una manta cálida."
    }
   `
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    if(!config.openApiKey){
        return new NextResponse("OpenAI API Key not configured", {status: 400})
    }

    //request a OpenAI para generar el contenido del post
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [instructionMessage, {
            role: "user",
            content: "Crea un post"
        }]
    })

    //Deserializar el contenido
    let message = response.choices[0].message.content;
    
    if(!message){
        return NextResponse.json("Error posting reminder", { status: 400 });
    }

    message = message.replaceAll("`", "");
    message = message.replace("json", "");
    const post = JSON.parse(message);

    //Request a OpenAI para generar la imagen
    const image_res = await openai.images.generate({
        model: "dall-e-3",
        prompt: post.imagePrompt,
        n: 1,
        size: "1024x1024"
    });

    const image_url = image_res.data[0].url;

    //Insertar en base de datos el post
    const res = await db.insert(Articles).values(
        {
            name: post.name,
            description: post.description,
            imageUrl: image_url
        }
    ); 

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error creating post", { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const res = await db.select()
      .from(Articles)

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error retrieving post", { status: 400 });
  }
}
