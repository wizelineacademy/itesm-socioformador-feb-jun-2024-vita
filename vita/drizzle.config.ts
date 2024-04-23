import type { Config } from "drizzle-kit";

export default {
  driver: 'pg',
  out: './app/db/migrations',
  schema: './app/db/schema/schema.ts'
} satisfies Config;