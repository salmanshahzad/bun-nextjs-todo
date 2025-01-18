"use client";
import {
    type PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

export const THEMES = ["dark", "light"] as const;

export type Theme = (typeof THEMES)[number];

const ThemeContext = createContext<[Theme, (theme: Theme) => void]>([
    "dark",
    () => {},
]);

export type ThemeContextProviderProps = PropsWithChildren<{
    theme: Theme | (string & {}) | undefined;
}>;

export function ThemeContextProvider(props: ThemeContextProviderProps) {
    const initialTheme = THEMES.find((theme) => theme === props.theme);
    const [theme, _setTheme] = useState(initialTheme ?? "dark");

    useEffect(() => {
        const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        if (!initialTheme) {
            setTheme(systemTheme);
        }
    }, []);

    function setTheme(theme: Theme) {
        const [htmlElement] = document.getElementsByTagName("html");
        htmlElement?.setAttribute("data-theme", theme);
        document.cookie = `theme=${theme}; SameSite=Strict; Secure`;
        _setTheme(theme);
    }

    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
