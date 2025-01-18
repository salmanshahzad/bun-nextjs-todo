import { Suspense } from "react";

import { getTodos } from "@/lib/todo";
import { CreateTodo } from "./CreateTodo";
import { TodoItem } from "./TodoItem";

export default function () {
    const Loading = (
        <div className="flex justify-center">
            <span className="loading loading-spinner loading-md" />
        </div>
    );

    return (
        <main className="flex flex-col items-center gap-4 p-4">
            <div className="flex w-full flex-col gap-4 sm:w-1/2">
                <CreateTodo />
                <Suspense fallback={Loading}>
                    <Todos />
                </Suspense>
            </div>
        </main>
    );
}

async function Todos() {
    const todos = await getTodos();

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}
