import { db } from "@/db/drizzle";
import { monthlyChallenge, user } from "@/db/schema/schema";
import config from "@/lib/environment/config";
import axios from "axios";
import { and, eq, isNotNull } from "drizzle-orm";
import { NextResponse } from "next/server";

const getUsersWithNumber = async () => {
    const users = await db.select()
    .from(user)
    .where(isNotNull(user.phoneNumber))
    return users;
}

const sendMessageWp = async (challenge: { name: string, description: string }) => {
    try {

        const users = await getUsersWithNumber();

        if(!challenge){
            return NextResponse.json("A challenge is required", { status: 200 });
        }

        const promises = users.map(user => 
            axios.post(
              `https://graph.facebook.com/v18.0/248211301718489/messages`,
              {
                messaging_product: "whatsapp",
                to: "52" + user.phoneNumber,
                text: { body: `Hay un nuevo desafío disponible:\n${challenge.name}\n${challenge.description}`}
              },
              {
                headers: {
                  Authorization: `Bearer ${config.graphApiToken}`,
                }
              }
            )
        );

        await Promise.all(promises);
    } catch(error){
      console.log(error);
    }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, description, month, year } = body;

    // Calcula las fechas de inicio y fin del mes
    const startDate = new Date(year, month - 1, 1); // month - 1 porque los meses en JavaScript son 0-indexed
    const endDate = new Date(year, month, 0); // 0 significa el último día del mes anterior

    // Convertimos las fechas a formato string "YYYY-MM-DD"
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    // Verificamos si ya existe un reto para el mismo mes y año
    const existingChallenge = await db.select()
      .from(monthlyChallenge)
      .where(eq(monthlyChallenge.startDate, startDateString));

    if (existingChallenge.length > 0) {
      // Si ya existe un reto para el mismo mes y año, devolvemos un mensaje de error
      return NextResponse.json("Ya existe un reto para este mes y año", { status: 409 });
    }

    // Insertamos el nuevo reto mensual
    const newChallenge = await db.insert(monthlyChallenge).values({
      name,
      description,
      startDate: startDateString, // Formato YYYY-MM-DD
      endDate: endDateString, // Formato YYYY-MM-DD
      createdAt: new Date().toISOString()
    });
    const newBadge = await db.insert(badges).values({
      name,
      description,
    });

    await sendMessageWp({ name, description });

    return NextResponse.json({ message: "Reto creado exitosamente", data: newChallenge }, { status: 201 });
  } catch (error) {
    console.error('Error al crear el reto:', error);
    return NextResponse.json("Error al crear el reto", { status: 500 });
  }
}

export async function GET() {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; 
      const currentYear = currentDate.getFullYear();
  
      const startDate = new Date(currentYear, currentMonth - 1, 1); // Primer día del mes actual
      const endDate = new Date(currentYear, currentMonth, 0); // Último día del mes actual
      const existingChallenge = await db.select()
        .from(monthlyChallenge)
        .where(
          and(
            eq(monthlyChallenge.startDate, startDate.toISOString().split('T')[0]),
            eq(monthlyChallenge.endDate, endDate.toISOString().split('T')[0])
          )
        );
  
      if (existingChallenge.length > 0) {
        const { name, description, startDate, endDate } = existingChallenge[0];
        return NextResponse.json({ name, description, startDate, endDate });
      } else {
        return NextResponse.json(null);
      }
    } catch (error) {
      console.error('Error al obtener el reto del mes actual:', error);
      
    }
  }