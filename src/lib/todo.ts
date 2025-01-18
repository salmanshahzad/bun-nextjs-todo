"use server";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/config/db";
import { logger } from "@/config/logger";
import { todos } from "@/config/schema";
import type { FormState } from "@/utils/form";
import { getSession } from "@/utils/session";

const createTodoSchema = z.object({
    name: z.string({ message: "Name must be a string" }).trim().min(1, {
        message: "Name is required",
    }),
});

export type CreateTodoFormState = FormState<typeof createTodoSchema>;

export async function createTodo(
    _: CreateTodoFormState,
    formData: FormData,
): Promise<CreateTodoFormState> {
    const data = Object.fromEntries(formData);
    const payload = createTodoSchema.safeParse(data);
    if (!payload.success) {
        return {
            data,
            errors: payload.error.flatten().fieldErrors,
        };
    }

    try {
        const { userId } = await getSession();
        if (!userId) {
            throw new Error("Unauthenticated");
        }

        await db.insert(todos).values({
            name: payload.data.name,
            userId,
        });
        revalidatePath("/todos");
        return {};
    } catch (err) {
        logger.error("createTodo", err);
        return {
            data,
            message: "An unexpected error occurred",
        };
    }
}

const deleteTodoSchema = z.object({
    id: z.coerce
        .number({ message: "ID must be a number" })
        .int({ message: "ID must be an integer" })
        .min(1, {
            message: "ID must be positive",
        }),
});

export type DeleteTodoFormState = FormState<typeof deleteTodoSchema>;

export async function deleteTodo(
    _: DeleteTodoFormState,
    formData: FormData,
): Promise<DeleteTodoFormState> {
    const data = Object.fromEntries(formData);
    const payload = deleteTodoSchema.safeParse(data);
    if (!payload.success) {
        return {
            data,
            errors: payload.error.flatten().fieldErrors,
        };
    }

    try {
        const { userId } = await getSession();
        if (!userId) {
            throw new Error("Unauthenticated");
        }

        await db.delete(todos).where(eq(todos.id, payload.data.id));
        revalidatePath("/todos");
        return {};
    } catch (err) {
        logger.error("deleteTodo", err);
        return {
            data,
            message: "An unexpected error occurred",
        };
    }
}

const editTodoSchema = z.object({
    id: z.coerce
        .number({ message: "ID must be a number" })
        .int({ message: "ID must be an integer" })
        .min(1, {
            message: "ID must be positive",
        }),
    completed: z.coerce
        .boolean({ message: "Completed must be a boolean" })
        .default(false),
    name: z
        .string({ message: "Name must be a string" })
        .trim()
        .min(1, {
            message: "Name is required",
        })
        .optional(),
});

export type EditTodoFormState = FormState<typeof editTodoSchema>;

export async function editTodo(
    _: EditTodoFormState,
    formData: FormData,
): Promise<EditTodoFormState> {
    const data = Object.fromEntries(formData);
    const payload = editTodoSchema.safeParse(data);
    if (!payload.success) {
        return {
            data,
            errors: payload.error.flatten().fieldErrors,
        };
    }

    try {
        const { userId } = await getSession();
        if (!userId) {
            throw new Error("Unauthenticated");
        }

        await db
            .update(todos)
            .set({
                completed: payload.data.completed,
                name: payload.data.name,
            })
            .where(eq(todos.id, payload.data.id));
        revalidatePath("/todos");
        return {};
    } catch (err) {
        logger.error("editTodo", err);
        return {
            data,
            message: "An unexpected error occurred",
        };
    }
}

export async function getTodos() {
    const { userId } = await getSession();
    if (!userId) {
        throw new Error("Unauthenticated");
    }

    return await db
        .select()
        .from(todos)
        .where(eq(todos.userId, userId))
        .orderBy(asc(todos.id));
}
