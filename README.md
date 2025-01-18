# Bun + Next.js To-do

This is a to-do list web application using Bun and Next.js.

It serves as a boilerplate for the following:

- PostgreSQL database connection with Drizzle ORM
- User authentication through cookie-based sessions backed by Redis
- Styling using Tailwind CSS and Daisy UI

## Environment Variables

See `server/config/env.ts` for required environment variables

## Run in Development

```sh
bun install
bun dev
```

## Build and Run

```sh
bun install
bun run build
bun start
```

## Run with Docker

```sh
docker compose up
```
