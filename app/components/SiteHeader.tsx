'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { FC, ReactElement, useEffect, useState } from "react"
import { RootState, useAppSelector } from "@/lib/store"


const Header: FC = (): ReactElement => {

    const [clientAccessToken, setClientAccessToken] = useState<string | null>(null);
    const accessToken = useAppSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        setClientAccessToken(accessToken);
    }, [accessToken]);

    return (
        <header className="flex sticky top-0 z-50 px-2 md:px-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex container mx-auto h-16 items-center justify-between w-full">
                <Link href={"/"} className="mr-8 flex items-center space-x-2">
                    <Image
                        src="/assets/beaura.png"
                        alt="BeauraAI"
                        width={32}
                        height={32}
                    />
                    <span className="hidden md:block text-xl font-bold">BeauraAI</span>
                </Link>
                <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm">
                    <Link href="/features" className="transition hover:text-foreground/80">
                        Features
                    </Link>
                    <Link href="/plans" className="transition hover:text-foreground/80">
                        Pricing
                    </Link>
                    <Link href={'/explore'} className="transition hover:text-foreground/80">
                        Explore
                    </Link>
                </nav>
                <div className="flex items-center space-x-4">

                    {
                        clientAccessToken !== null ? (
                            <Button variant="default" asChild>
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href="/login">Sign In</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">Get Started</Link>
                                </Button>
                            </>
                        )
                    }

                </div>
            </div>
        </header>
    )
}


export default Header;