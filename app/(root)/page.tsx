"use client";

import { useRouter } from "next/navigation";
import React, { FC, ReactElement, useEffect } from "react";
import Home from "../components/root/Home";

const iS_LOGGED_IN: boolean = true;

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
            {/* <LogoutModal /> */}
            <Home />
        </>
    );
};

export default RootPage;
