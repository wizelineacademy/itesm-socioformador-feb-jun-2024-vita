import postgres from "postgres";
import { drizzle as LocalDrizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import {drizzle as AWSDrizzle, type AwsDataApiPgDatabase} from "drizzle-orm/aws-data-api/pg"
import {RDSDataClient} from "@aws-sdk/client-rds-data";
import { Resource } from "sst";
import { migrate as LocalMigrate } from "drizzle-orm/postgres-js/migrator";
import { migrate as AWSMigrate } from "drizzle-orm/aws-data-api/pg/migrator"
import config from "../lib/environment/config"

let db;

export async function migrate() {

  try {

    if(config.nodeEnv === "production"){
      const sql = new RDSDataClient({})
      db = AWSDrizzle(sql, {
        database: Resource.MyDatabase.database,
        secretArn: Resource.MyDatabase.secretArn,
        resourceArn: Resource.MyDatabase.clusterArn,
      })
      await AWSMigrate(db, {migrationsFolder: "db/migrations/"}) 
    } else {
      const client = postgres(config.databaseUrl, { max: 1 })
      db = LocalDrizzle(client);
      console.log(__dirname + "/migrations/")
      await LocalMigrate(db, { migrationsFolder: __dirname + "/migrations/" });
      await client.end();
    }

  } catch(e) {
    console.error("Error running migrations");
    console.error(e);
    process.exit(1);
  } 
}

migrate().then(() => {
  console.log("Finished")
})