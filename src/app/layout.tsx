import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";

import { ThemeContextProvider } from "@/hooks/useTheme";

import "./globals.css";

export const metadata: Metadata = {
    title: "Bun + Next.js To-dos",
};

export default async function (props: PropsWithChildren) {
    const c = await cookies();
    const theme = c.get("theme")?.value;

    return (
        <html data-theme={theme} lang="en-CA">
            <body>
                <ThemeContextProvider theme={theme}>
                    {props.children}
                </ThemeContextProvider>
            </body>
        </html>
    );
}
