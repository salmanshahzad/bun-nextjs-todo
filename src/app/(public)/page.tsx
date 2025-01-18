import Link from "next/link";

import { Button } from "@/components/Button";

export default function () {
    return (
        <main className="flex flex-col items-center gap-4 p-4">
            <div className="flex gap-4">
                <Link href="/signin">
                    <Button className="btn-primary">Sign In</Button>
                </Link>
                <Link href="/signup">
                    <Button className="btn-primary">Sign Up</Button>
                </Link>
            </div>
        </main>
    );
}
