import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { badges } from "./schema/schema";
import * as dotenv from "dotenv";
import config from "@/lib/environment/config";

const main = async () => {
	const client = new Pool({
		connectionString: config.databaseUrl,
	});
	const db = drizzle(client);

	const badgeData = [
		{
			name: "Primer recordatorio",
			description: "Crea tu primer recordatorio en la aplicación.",
		},
		{
			name: "Sigue a 5 usuarios",
			description: "Sigue a 5 usuarios diferentes.",
		},
		{
			name: "Primer lugar en reto mensual",
			description: "Llega al primer lugar en el ranking del reto mensual.",
		},
		{
			name: "Primer plan nutricional",
			description: "Crea tus porciones y genera tu primer plan nutricional.",
		},
		{
			name: "Primera publicación",
			description: "Publica tu primera entrada en la aplicación.",
		},
		{
			name: "Receta diaria por un mes",
			description: "Crea una receta diaria durante un mes.",
		},
		{
			name: "Verifica calorías diario por un mes",
			description: "Verifica las calorías de una imagen diariamente durante un mes.",
		},
		{
			name: "Rutinas para 10 áreas",
			description: "Crea rutinas para 10 áreas del cuerpo diferentes.",
		},
		{
			name: "Rutina para cada ejercicio",
			description: "Crea una rutina para cada tipo de ejercicio.",
		},
		{
			name: "Registro de sueño diario por un mes",
			description: "Registra tus horas de sueño diariamente durante un mes.",
		},
	];

	console.log("Seed start");
	await db.insert(badges).values(badgeData);
	console.log("Seed done");
};

main();
