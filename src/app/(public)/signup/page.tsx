"use client";
import { useActionState } from "react";

import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { createUser } from "@/lib/user";

export default function () {
    const [state, action, isPending] = useActionState(createUser, {});

    return (
        <main className="flex justify-center p-4">
            <div className="flex w-full flex-col gap-4 sm:w-1/2 lg:w-1/4">
                <h1 className="text-center text-3xl font-bold">Sign Up</h1>
                {state.message && (
                    <div className="alert alert-error">{state.message}</div>
                )}
                <form action={action}>
                    <fieldset
                        className="flex flex-col gap-4"
                        disabled={isPending}
                    >
                        <TextInput
                            defaultValue={
                                state.data?.["username"]?.toString() ?? ""
                            }
                            error={state.errors?.username?.[0]}
                            label="Username"
                            name="username"
                            type="text"
                        />
                        <TextInput
                            defaultValue={
                                state.data?.["password"]?.toString() ?? ""
                            }
                            error={state.errors?.password?.[0]}
                            label="Password"
                            name="password"
                            type="password"
                        />
                        <TextInput
                            defaultValue={
                                state.data?.["confirmPassword"]?.toString() ??
                                ""
                            }
                            error={state.errors?.confirmPassword?.[0]}
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                        />
                        <Button className="btn-primary" type="submit">
                            Sign Up
                        </Button>
                    </fieldset>
                </form>
            </div>
        </main>
    );
}
