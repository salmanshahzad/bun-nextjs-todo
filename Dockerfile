FROM oven/bun:1.1.45
ARG COOKIE_SECRET
ENV COOKIE_SECRET=$COOKIE_SECRET
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ARG MIGRATIONS_DIR
ENV MIGRATIONS_DIR=$MIGRATIONS_DIR
ARG REDIS_URL
ENV REDIS_URL=$REDIS_URL
WORKDIR /usr/src/app
COPY bun.lockb package.json ./
RUN bun install
COPY . .
RUN bun run build
CMD ["bun", "start"]
