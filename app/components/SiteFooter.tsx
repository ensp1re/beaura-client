import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
    return (
        <footer className="px-[75px] border-t bg-background">
            <div className="container py-12 md:py-16 lg:py-20">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Image
                                src="/assets/beaura.png"
                                alt="BeauraAI"
                                width={32}
                                height={32}
                            />
                            <span className="text-xl font-bold">BeauraAI</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Transform your look with AI-powered haircut visualizations. Try different hairstyles instantly.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Product</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/features" className="text-muted-foreground hover:text-foreground">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/plans" className="text-muted-foreground hover:text-foreground">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore" className="text-muted-foreground hover:text-foreground">
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/guides" className="text-muted-foreground hover:text-foreground">
                                    Style Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8">
                    <p className="text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} BeauraAI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

