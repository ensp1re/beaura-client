'use client';

import { useTheme } from "next-themes";
import { SiteFooter } from "../components/SiteFooter"
import SiteHeader from "../components/SiteHeader"
import { SidebarAdmin } from "./components/SibebarAdmin"

import { useCallback, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { RootState, useAppSelector } from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
        document.title = "Admin Dashboard - Beaura"
        changeTheme()
    }, [changeTheme]);

    const auth = useAppSelector((state: RootState) => state.auth)

    return (

        <ProtectedRoute>


            {
                auth.user && auth.user.role.toLowerCase() !== 'admin' ? (
                    <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-gray-100 p-6 rounded-lg shadow-lg">
                        <Image
                            width={200}
                            height={200}
                            src="/assets/unauthorized.svg"
                            alt="Unauthorized"
                            className="w-1/2 max-w-xs"
                        />
                        <h1 className="text-4xl font-bold text-gray-800">Access Denied</h1>
                        <p className="text-lg text-gray-600">You are not authorized to view this page.</p>
                        <Button
                            variant={"default"}
                            onClick={() => window.location.href = '/'}
                        >
                            Go to Home
                        </Button>
                    </div>
                ) : (
                    <div suppressContentEditableWarning suppressHydrationWarning className="flex flex-col min-h-screen">
                        <SiteHeader />
                        <div className="flex-1 flex">
                            <SidebarAdmin />
                            <main className="flex-1 p-6">{children}</main>
                        </div>
                        <SiteFooter />
                    </div>
                )}



        </ProtectedRoute>
    )
}

