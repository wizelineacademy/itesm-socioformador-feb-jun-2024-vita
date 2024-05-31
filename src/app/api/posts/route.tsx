import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth/authOptions'
import { db } from '@/src/db/drizzle'
import { Articles } from '@/src/db/schema/schema'
import { OpenAI } from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import config from '@/src/lib/environment/config'
import { desc } from 'drizzle-orm'
import { Resource } from 'sst'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import axios from 'axios'

const openai = new OpenAI({
  apiKey: config.openApiKey,
})

const instructionMessage: ChatCompletionMessageParam = {
  role: 'system',
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
   `,
}

const createS3Url = async () => {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.MyBucket.name,
  })
  const url = await getSignedUrl(new S3Client({}), command)
  return url
}

export async function POST() {
  try {
    if (!config.openApiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 400 })
    }

    //request a OpenAI para generar el contenido del post
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        instructionMessage,
        {
          role: 'user',
          content: 'Crea un post',
        },
      ],
    })

    //Deserializar el contenido
    let message = response.choices[0].message.content

    if (!message) {
      return NextResponse.json('Error posting reminder', { status: 400 })
    }

    message = message.replaceAll('`', '')
    message = message.replace('json', '')
    const post = JSON.parse(message)

    //Request a OpenAI para generar la imagen
    const image_res = await openai.images.generate({
      model: 'dall-e-3',
      prompt: post.imagePrompt,
      n: 1,
      size: '1024x1024',
    })

    const imgUrl = image_res.data[0].url

    if (!imgUrl) {
      return NextResponse.json('Error posting reminder', { status: 400 })
    }

    //obtener imagen
    const img = await axios.get(imgUrl, {
      responseType: 'arraybuffer',
      responseEncoding: 'binary',
    })

    //objeto del insert
    const postDb = {
      name: post.name,
      description: post.description,
      imageUrl: '',
    }

    //Subir la imagen a S3
    //if(config.nodeEnv === "production"){
    const image = await fetch(await createS3Url(), {
      body: img.data,
      method: 'PUT',
      headers: {
        'Content-Type': img.headers['Content-Type']?.toString() ?? 'json',
        'Content-Length': img.data.length ?? img.headers['Content-Length'],
      },
    })
    postDb.imageUrl = image.url.split('?')[0]
    //} else {
    //  postDb.imageUrl = image_res.data[0].url ?? "";
    //}

    //Insertar en base de datos el post
    const res = await db.insert(Articles).values(postDb)

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json('Error creating post', { status: 400 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) ?? 6
    const offset = Number(searchParams.get('offset')) ?? 0

    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    const res = await db
      .select()
      .from(Articles)
      .orderBy(desc(Articles.idArticle))
      .limit(limit)
      .offset(offset * 6)

    return NextResponse.json(res, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error retrieving post', { status: 400 })
  }
}
