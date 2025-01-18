import { cookies } from "next/headers";

import { redis } from "@/config/db";

const COOKIE_NAME = "session";
const TTL = 60 * 60 * 24 * 7;

export async function createSession(
    userId: number,
    sessionId = crypto.randomUUID(),
) {
    await redis.setEx(sessionId, TTL, userId.toString());
    const c = await cookies();
    c.set(COOKIE_NAME, sessionId, {
        httpOnly: true,
        maxAge: TTL,
        sameSite: "strict",
        secure: true,
    });
}

export async function destroySession() {
    const c = await cookies();
    const sessionId = c.get(COOKIE_NAME)?.value;
    if (sessionId) {
        await redis.del(sessionId);
    }
    c.delete(COOKIE_NAME);
}

export async function getSession() {
    const c = await cookies();
    const sessionId = c.get(COOKIE_NAME)?.value;
    const userId = Number.parseInt((await redis.get(sessionId ?? "")) ?? "");
    return {
        sessionId,
        userId: userId || undefined,
    };
}

export async function renewSession() {
    const { sessionId, userId } = await getSession();
    if (sessionId && userId) {
        await createSession(userId, sessionId);
    }
    return { sessionId, userId };
}
