import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import config from '@/src/lib/environment/config'

const openai = new OpenAI({
  apiKey: config.openApiKey,
})

const instructionMessage: ChatCompletionMessageParam = {
  role: 'system',
  content: `
    Dame un plan nutricional para un día. Te indicaré las porciones que deseo consumir en el día de frutas, verduras, leguminosas, leche, carne, cereales, azúcares, grasas y quiero que me regreses 4 recetas.
    Una para el desyuno, una para la comida, un snack y una para la cena. Contempla que las porciones que te indique deberán estar distribuidas entre las recetas del día.
    Sé creativo, dame recetas distintas, no me des solo licuados, smoothies, ensalada, hummus y salmón.
    El JSON será una lista de objetos receta. Después del último elemento de las listas de ingredients y steps no pongas coma. Cada receta debe contener los siguientes campos:    
    - name: nombre de la receta en string
    - description: descripción en una a dos líneas de la receta en string
    - ingredients: una lista con los ingredientes de la receta y cantidades de cada uno, cada elemento de la lista es un string con el ingrediente y su cantidad. 
    - steps: Una lista con los pasos de la receta, cada paso es un string
    - time: El tiempo estimado que toma hacer la receta en string
    - mealtime: Un string que puede tener uno de los siguientes valores: Desayuno, Comida, Snack, Cena 
    Te doy un ejemplo del formato que necesito, no agregues la lista dentro de una propiedad, solo devuelveme la lista:
    [
      {
        "name": "Ensalada de Quinoa y Verduras Asadas",
        "description": "Una ensalada fresca y sabrosa con quinoa y una variedad de verduras asadas.",
        "ingredients": [
          "Quinoa (cocida): 1 taza",
          "Pimientos rojos, amarillos y verdes (cortados en trozos): 1 taza",
          "Calabacín (cortado en rodajas): 1 taza",
          "Cebolla roja (cortada en trozos): 1/2 taza",
          "Aceite de oliva: 2 cucharadas",
          "Espinacas frescas: 2 tazas",
          "Tomates cherry (cortados por la mitad): 1 taza",
          "Vinagre balsámico: 2 cucharadas",
          "Sal y pimienta al gusto"
        ],
        "steps": [
          "Precalienta el horno a 200°C.",
          "En un tazón grande, mezcla las verduras cortadas con aceite de oliva, sal y pimienta.",
          "Coloca las verduras en una bandeja para hornear y ásalas en el horno durante 20-25 minutos, o hasta que estén tiernas.",
          "En un tazón grande, mezcla la quinoa cocida, las espinacas y los tomates cherry.",
          "Agrega las verduras asadas a la mezcla de quinoa y espinacas.",
          "Aliña con vinagre balsámico y mezcla bien.",
          "Sirve y disfruta esta deliciosa ensalada de quinoa y verduras asadas."
        ],
        "time": "30 minutos",
        "mealtime": "Cena"
      }
    ]
   `,
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { message } = body

    if (!message) {
      return new NextResponse('message is required', { status: 400 })
    }

    if (!config.openApiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, message],
    })

    return NextResponse.json(response.choices[0].message)
  } catch (error) {
    console.log(error)
    return NextResponse.json('Error generating recipes', { status: 500 })
  }
}
