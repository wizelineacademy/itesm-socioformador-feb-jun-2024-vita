import { db } from '@/db/drizzle';
import { user } from '@/db/schema/schema';
import config from '@/lib/environment/config';
import axios from 'axios';
import { eq } from 'drizzle-orm';
import { NextResponse, type NextRequest } from 'next/server'
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({
    apiKey: config.openApiKey
})

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: `
    Eres un asistente médico enfocado en el área de salud, nutrición y sueño. Tu misión es aconsejar a los
    pacientes en esta área con preguntas como por ejemplo ¿Qué es paracetamol?, ¿Cuánto debo dormir? O
    ¿Es bueno la proteína para mi cuerpo? Y limítate a solo contestar preguntas relacionadas con este tema
    y en caso de que te preguntan cosas que no tienen que ver con el tema contéstales "No soy un asistente
    médico dedicado a ese tema" y cabe resaltar que no puedes contestar temas de historia,fisica
    artes, ciencias, leyes cientificas  u otras áreas.
    `
}

export async function POST(request: Request) {

    try {
        const body = await request.json();

        // check if the webhook request contains a message
        const message = body.entry?.[0]?.changes[0]?.value?.messages?.[0];
        if(!message){
            return NextResponse.json("Message is required", {status: 400})
        }

        if(!config.openApiKey){
            return new NextResponse("OpenAI API Key not configured", {status: 400})
        }

        // check if the incoming message contains text
        if (message?.type === "text") {
            // extract the business number to send the reply from it
            const business_phone_number_id = body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
            const countryCode = message.from.slice(0, 2);
            const phoneNumber = message.from.slice(3, 13);
            const fullNumber = countryCode + phoneNumber;  //get user number

            const phoneUser = await db.select()
            .from(user)
            .where(eq(user.phoneNumber, phoneNumber)) 
            .limit(1)      

            if(phoneUser.length === 0){
                return NextResponse.json("Invalid number", {status: 401})
            }
            
            //send request to OPENAI
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [instructionMessage, {
                    role: "user",
                    content: message.text.body
                }]
            })         
            
            // send a reply message to Whatsapp
            await axios.post(`https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`, 
                {
                    messaging_product: "whatsapp",
                    to: fullNumber,
                    text: { body: response.choices[0].message.content },
                    context: {
                        message_id: message.id, // shows the message as a reply to the original user message
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${config.graphApiToken}`,
                    }
                }
            );

            // mark incoming message as read
            await axios.post(`https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`, 
                {
                    messaging_product: "whatsapp",
                    status: "read",
                    message_id: message.id,                
                },
                {
                    headers: {
                        Authorization: `Bearer ${config.graphApiToken}`,
                    }
                }
            );

            //add record    
            const usageRecords = [{
                name: "chat_message",
                detail: "whatsapp"
            }];
            await axios.post("/api/feature_usage", { usageRecords });
                
        }

    return NextResponse.json("OK", {status: 200})

    } catch(error){
        console.log(error);
        return NextResponse.json("Error", {status: 400})
    }

}

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
export async function GET(request: NextRequest){
    try {
        const searchParams = request.nextUrl.searchParams;
        const mode = searchParams.get("hub.mode");
        const token = searchParams.get("hub.verify_token");
        const challenge = searchParams.get("hub.challenge");

        // check the mode and token sent are correct
    if (mode === "subscribe" && token === config.webhookVerifyToken) {
        // respond with 200 OK and challenge token from the request
        console.log("Webhook verified successfully")

        return new Response(challenge, {
            status: 200
        })

    } else {
        // respond with '403 Forbidden' if verify tokens do not match
        return NextResponse.json("Forbidden", {status: 403})
    }
    } catch(error){
        console.log(error)
        return NextResponse.json("Error", {status: 400})
    }

}