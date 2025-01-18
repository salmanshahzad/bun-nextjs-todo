"use server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/config/db";
import { logger } from "@/config/logger";
import { users } from "@/config/schema";
import type { FormState } from "@/utils/form";
import { createSession, destroySession } from "@/utils/session";

const signInSchema = z.object({
    username: z.string({ message: "Username must be a string" }).trim().min(1, {
        message: "Username is required",
    }),
    password: z.string({ message: "Password must be a string" }).trim().min(1, {
        message: "Password is required",
    }),
});

export type SignInFormState = FormState<typeof signInSchema>;

export async function signIn(
    _: SignInFormState,
    formData: FormData,
): Promise<SignInFormState> {
    const data = Object.fromEntries(formData);
    const payload = signInSchema.safeParse(data);
    if (!payload.success) {
        return {
            data,
            errors: payload.error.flatten().fieldErrors,
        };
    }

    try {
        const errRes = {
            data,
            errors: {
                username: ["Incorrect username and/or password"],
                password: ["Incorrect username and/or password"],
            },
        };

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.username, payload.data.username));
        if (!user) {
            return errRes;
        }

        const isValidPassword = await Bun.password.verify(
            payload.data.password,
            user.password,
        );
        if (!isValidPassword) {
            return errRes;
        }

        await createSession(user.id);
    } catch (err) {
        logger.error("signIn", err);
        return {
            data,
            message: "An unexpected error occurred",
        };
    }

    redirect("/todos");
}

export async function signOut() {
    try {
        await destroySession();
    } catch (err) {
        logger.error("signOut", err);
    }
    redirect("/");
}
