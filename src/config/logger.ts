import path from "node:path";

import winston from "winston";

const LOG_DIR = "log";

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    level: "info",
    transports: [
        new winston.transports.File({
            filename: path.join(LOG_DIR, "error.log"),
            level: "error",
        }),
        new winston.transports.File({
            filename: path.join(LOG_DIR, "info.log"),
        }),
        new winston.transports.Console(),
    ],
});
