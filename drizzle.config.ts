import path from "node:path";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
    casing: "snake_case",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env["DATABASE_URL"] ?? "",
    },
    out: "drizzle",
    schema: path.join("src", "config", "schema.ts"),
});
