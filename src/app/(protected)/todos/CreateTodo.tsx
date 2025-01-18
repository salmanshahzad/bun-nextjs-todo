"use client";
import { useActionState } from "react";

import { TextInput } from "@/components/TextInput";
import { createTodo } from "@/lib/todo";

export function CreateTodo() {
    const [state, action, isPending] = useActionState(createTodo, {});

    return (
        <>
            {state.message && (
                <div className="alert alert-error">{state.message}</div>
            )}
            <form action={action}>
                <TextInput
                    autoFocus={true}
                    className="w-full"
                    defaultValue={state.data?.["name"]?.toString() ?? ""}
                    disabled={isPending}
                    error={state.errors?.name?.[0]}
                    name="name"
                    placeholder="New Todo"
                />
            </form>
        </>
    );
}
