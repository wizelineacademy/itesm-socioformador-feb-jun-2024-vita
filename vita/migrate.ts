import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import * as dotenv from "dotenv";

dotenv.config();

async function main() {

  const client = postgres(process.env.DATABASE_URL!, { max: 1 })

  try {

  const db = drizzle(client);
  
  await migrate(db, { migrationsFolder: "./db/migrations" });
  console.log("Migrations finished");

  } catch(e) {
    console.error("Error running migrations");
    console.error(e);
    process.exit(1);
  } finally {
    await client.end();
  };
}

main().then(() => {
})