import type { Config } from "drizzle-kit";

export default {
  driver: 'pg',
  out: './db/migrations',
  schema: './db/schema/schema.ts'
} satisfies Config;