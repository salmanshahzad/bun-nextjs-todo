"use client";
import classNames from "classnames";
import Link from "next/link";
import { RiUserLine } from "react-icons/ri";

import { ThemeSwitch } from "@/components/ThemeSwitch";
import { useTheme } from "@/hooks/useTheme";
import { signOut } from "@/lib/auth";

export interface NavBarProps {
    user?: { username: string };
}

export function NavBar(props: NavBarProps) {
    const [theme] = useTheme();

    return (
        <header className="flex w-full items-center justify-between px-8 py-4">
            <Link href={props.user ? "/todos" : "/"}>
                <h1 className="text-2xl font-bold">Bun + Next.js To-dos</h1>
            </Link>
            <div className="flex items-center gap-4">
                <ThemeSwitch />
                {props.user && (
                    <div className="dropdown dropdown-end">
                        <button
                            className="flex items-center gap-2"
                            type="button"
                        >
                            <RiUserLine />
                            <span>{props.user.username}</span>
                        </button>
                        <ul
                            className={classNames(
                                "menu dropdown-content mt-2 w-40 rounded-box p-2 drop-shadow-lg",
                                {
                                    "bg-gray-700": theme === "dark",
                                    "bg-gray-200": theme === "light",
                                },
                            )}
                        >
                            <li>
                                <button type="button" onClick={signOut}>
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}
