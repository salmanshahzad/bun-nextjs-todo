"use client";
import classNames from "classnames";
import { useActionState, useEffect, useRef, useState } from "react";
import { RiDeleteBinFill, RiPencilFill, RiSaveFill } from "react-icons/ri";

import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import type { Todo } from "@/config/schema";
import { useTheme } from "@/hooks/useTheme";
import { deleteTodo, editTodo } from "@/lib/todo";

export interface TodoItemProps {
    todo: Todo;
}

export function TodoItem(props: TodoItemProps) {
    const [editState, editAction, isEditPending] = useActionState(editTodo, {});
    const [, deleteAction, isDeletePending] = useActionState(deleteTodo, {});
    const completeFormRef = useRef<HTMLFormElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [theme] = useTheme();

    useEffect(() => {
        if (!isEditPending) {
            setIsEditing(false);
        }
    }, [isEditPending]);

    return (
        <li
            className={classNames("my-4 flex gap-4", {
                "items-center": !(isEditing && editState.errors?.name?.[0]),
                "items-start": isEditing && editState.errors?.name?.[0],
            })}
        >
            <form action={editAction} className="flex" ref={completeFormRef}>
                <input
                    className="checkbox-primary checkbox h-8 w-8"
                    defaultChecked={props.todo.completed}
                    disabled={isEditPending}
                    name="completed"
                    onChange={() => completeFormRef?.current?.requestSubmit()}
                    type="checkbox"
                />
                <input name="id" type="hidden" value={props.todo.id} />
            </form>
            {isEditing && (
                <form action={editAction} className="w-full">
                    <fieldset className="flex gap-4" disabled={isEditPending}>
                        <TextInput
                            autoFocus={true}
                            className="input-sm flex-grow"
                            defaultValue={props.todo.name}
                            error={editState.errors?.["name"]?.[0]}
                            name="name"
                        />
                        <input name="id" type="hidden" value={props.todo.id} />
                        <Button
                            className="btn-square btn-secondary btn-sm text-xl"
                            type="submit"
                        >
                            <RiSaveFill
                                color={theme === "dark" ? "black" : "white"}
                            />
                        </Button>
                    </fieldset>
                </form>
            )}
            {!isEditing && (
                <>
                    <span
                        className={classNames("flex flex-grow items-center", {
                            "line-through": props.todo.completed,
                        })}
                    >
                        {props.todo.name}
                    </span>
                    <Button
                        className="btn-square btn-secondary btn-sm text-xl"
                        onClick={() => setIsEditing(true)}
                    >
                        <RiPencilFill
                            color={theme === "dark" ? "black" : "white"}
                        />
                    </Button>
                </>
            )}
            <form action={deleteAction}>
                <Button
                    className="btn-square btn-error btn-sm text-xl"
                    disabled={isDeletePending}
                    type="submit"
                >
                    <RiDeleteBinFill
                        color={theme === "dark" ? "black" : "white"}
                    />
                </Button>
                <input name="id" type="hidden" value={props.todo.id} />
            </form>
        </li>
    );
}
