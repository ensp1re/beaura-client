// app/(main)/layout.tsx

'use client';

import Fonts from "@/lib/fonts";
import Sidebar from "../components/root/Sidebar";
import Header from "../components/root/Header";
import ThemeProvider from "../components/root/ThemeProvider";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider attribute={'class'} defaultTheme="system" enableSystem>
            <div className={`bg-background flex h-screen overflow-hidden ${Fonts.getInter()}`}>
                <Sidebar />
                <main className="flex-1 flex flex-col overflow-hidden  lg:pl-64">
                    <Header />
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>
                </main>
            </div>
        </ThemeProvider>
    );
}
