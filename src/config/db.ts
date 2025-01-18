import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { createClient } from "redis";

import { env } from "@/config/env";
import * as schema from "@/config/schema";

const dbConnection = postgres(env.DATABASE_URL);
export const db = drizzle(dbConnection, {
    casing: "snake_case",
    schema,
});
export const redis = await createClient({
    url: env.REDIS_URL,
}).connect();

await migrate(db, {
    migrationsFolder: env.MIGRATIONS_DIR,
});
