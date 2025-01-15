import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"


export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 px-2 md:px-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between w-full">
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
                    <Button variant="ghost" asChild>
                        <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Get Started</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}

