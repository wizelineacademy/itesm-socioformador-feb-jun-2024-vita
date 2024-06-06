import type { Config } from 'drizzle-kit'

export default {
  dialect: 'postgresql',
  out: './src/db/migrations',
  schema: './src/db/schema/schema.ts',
} satisfies Config
