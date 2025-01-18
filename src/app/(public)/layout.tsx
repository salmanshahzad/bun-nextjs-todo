import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { NavBar } from "@/components/NavBar";
import { getSession } from "@/utils/session";

export default async function (props: PropsWithChildren) {
    const { userId } = await getSession();
    if (userId) {
        redirect("/todos");
    }

    return (
        <>
            <NavBar />
            {props.children}
        </>
    );
}
