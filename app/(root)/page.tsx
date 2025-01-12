"use client";

import { useRouter } from "next/navigation";
import React, { FC, ReactElement, useEffect } from "react";

const iS_LOGGED_IN: boolean = false;

const RootPage: FC = (): ReactElement => {
    const router = useRouter();

    useEffect(() => {
        document.title = "Home | Beaura";
        if (!iS_LOGGED_IN) {
            router.push("/login");
        }
    }, [router]);

    return (
        <>
            {/* <LogoutModal  />
    <Home /> */}
            <div>
                Home
            </div>
        </>
    );
};

export default RootPage;
