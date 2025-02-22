'use client';

import { useTheme } from "next-themes";
import { SiteFooter } from "../components/SiteFooter"
import SiteHeader from "../components/SiteHeader"
import { SidebarAdmin } from "./components/SibebarAdmin"

import { useCallback, useEffect } from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setTheme } = useTheme()

    const changeTheme = useCallback(() => {
        setTheme("light")
    }, [setTheme]);

    useEffect(() => {
        changeTheme()
    }, [changeTheme]);

    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <div className="flex-1 flex">
                <SidebarAdmin />
                <main className="flex-1 p-6">{children}</main>
            </div>
            <SiteFooter />
        </div>
    )
}

