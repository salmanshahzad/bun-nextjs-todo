"use server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { z } from "zod";

import { db } from "@/config/db";
import { logger } from "@/config/logger";
import { users } from "@/config/schema";
import type { FormState } from "@/utils/form";
import { createSession, getSession } from "@/utils/session";

const createUserSchema = z
    .object({
        username: z
            .string({ message: "Username must be a string" })
            .trim()
            .min(1, {
                message: "Username is required",
            }),
        password: z
            .string({ message: "Password must be a string" })
            .trim()
            .min(1, {
                message: "Password is required",
            }),
        confirmPassword: z
            .string({ message: "Confirm password must be a string" })
            .trim()
            .min(1, { message: "Confirm password is required" }),
    })
    .refine(
        (schema) => {
            return schema.password === schema.confirmPassword;
        },
        { message: "Passwords do not match", path: ["confirmPassword"] },
    );

export type CreateUserFormState = FormState<typeof createUserSchema>;

export async function createUser(
    _: CreateUserFormState,
    formData: FormData,
): Promise<CreateUserFormState> {
    const data = Object.fromEntries(formData);
    const payload = createUserSchema.safeParse(data);
    if (!payload.success) {
        return {
            data,
            errors: payload.error.flatten().fieldErrors,
        };
    }

    try {
        const [user] = await db
            .insert(users)
            .values({
                username: payload.data.username,
                password: await Bun.password.hash(payload.data.password),
            })
            .returning();
        if (!user) {
            throw new Error("Did not get user after inserting");
        }
        await createSession(user.id);
    } catch (err) {
        if (err instanceof postgres.PostgresError && err.code === "23505") {
            return {
                data,
                errors: {
                    username: ["Username already exists"],
                },
            };
        }

        logger.error("createUser", err);
        return {
            data,
            message: "An unexpected error occurred",
        };
    }

    redirect("/todos");
}

export async function getUser() {
    const { userId } = await getSession();
    if (!userId) {
        return undefined;
    }

    const [user] = await db
        .select({
            username: users.username,
        })
        .from(users)
        .where(eq(users.id, userId));
    return user;
}
