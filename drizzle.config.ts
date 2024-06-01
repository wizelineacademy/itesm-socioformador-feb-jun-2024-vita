import type { Config } from "drizzle-kit";

export default {
  driver: 'pg',
  out: './src/db/migrations',
  schema: './src/db/schema/schema.ts'
} satisfies Config;