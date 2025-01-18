"use client";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

import { useTheme } from "@/hooks/useTheme";

export function ThemeSwitch() {
    const [theme, setTheme] = useTheme();

    return (
        <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? <RiSunFill /> : <RiMoonFill />}
        </button>
    );
}
