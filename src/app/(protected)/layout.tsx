import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { NavBar } from "@/components/NavBar";
import { getUser } from "@/lib/user";

export default async function (props: PropsWithChildren) {
    const user = await getUser();
    if (!user) {
        redirect("/");
    }

    return (
        <>
            <NavBar user={user} />
            {props.children}
        </>
    );
}
