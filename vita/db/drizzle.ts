import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from './schema/schema';

import * as dotenv from "dotenv";
dotenv.config();

const client = postgres(process.env.DATABASE_URL!, { max: 1 })

// { schema } is used for relational queries

export const db = drizzle(client, { schema });