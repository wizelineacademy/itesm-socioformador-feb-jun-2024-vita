import postgres from "postgres";
import { drizzle as LocalDrizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import {drizzle as AWSDrizzle, type AwsDataApiPgDatabase} from "drizzle-orm/aws-data-api/pg"
import {RDSDataClient} from "@aws-sdk/client-rds-data";
import * as dotenv from "dotenv";
import { Resource } from "sst";
import config from "@/lib/environment/config";


let db: PostgresJsDatabase<Record<string, never>>
 |  AwsDataApiPgDatabase<Record<string, never>>;

if(config.nodeEnv === "production"){
    const sql = new RDSDataClient({})
    db = AWSDrizzle(sql, {
        database: Resource.MyDatabase.database,
        secretArn: Resource.MyDatabase.secretArn,
        resourceArn: Resource.MyDatabase.clusterArn,
    })
} else {
    const client = postgres(config.databaseUrl, { max: 1 })
    db = LocalDrizzle(client)
}


// { schema } is used for relational queries

export {db};