import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default {
  driver: 'pg',
  out: './db/migrations',
  schema: './db/schema/schema.ts'
} satisfies Config;