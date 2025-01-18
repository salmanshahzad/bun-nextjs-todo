import { z } from "zod";

export const env = z
    .object({
        COOKIE_SECRET: z.string(),
        DATABASE_URL: z.string().url(),
        MIGRATIONS_DIR: z.string(),
        REDIS_URL: z.string().url(),
    })
    .parse(process.env);
