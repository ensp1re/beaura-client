'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SiteHeader from "@/app/components/SiteHeader"
import { SiteFooter } from "@/app/components/SiteFooter"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ImageIcon, MessageSquare, Wand2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { reviews } from "@/constants/constants"
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from "react";



export const metadata = {
    title: 'BeauraAI - AI-Powered Haircut Transformations',
    description: 'Transform your look with AI-powered haircut visualizations. Try different hairstyles instantly and find your perfect look with BeauraAI.',
    keywords: ['AI haircut', 'virtual hairstyle', 'hair transformation', 'AI beauty', 'virtual makeover'],
    openGraph: {
        title: 'BeauraAI - AI-Powered Haircut Transformations',
        description: 'Transform your look with AI-powered haircut visualizations',
        images: [{ url: '/assets/placeholder.jpg', width: 1200, height: 630 }],
    },
}


export default function Index() {

    useEffect(() => {
        document.title = metadata.title
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="px-4 py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid gap-8 md:grid-cols-2 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold">
                                    <span className="text-primary">✨ New:</span>
                                    <span className="ml-2">Advanced Style Customization</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter dark:text-white">
                                    Transform Your Look with AI Magic
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    Visualize your perfect hairstyle instantly with our AI-powered transformation tool.
                                    No more guessing – see your new look before making the change.
                                </p>
                                <div className="flex gap-4">
                                    <Button size="lg" asChild>
                                        <Link href="/change-haircut">
                                            Try Now <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="/explore">View Gallery</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative aspect-square">
                                <Image
                                    src="/assets/placeholder.jpg"
                                    alt="BeauraAI Transformation Example"
                                    fill
                                    className="object-cover rounded-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-4 py-20 bg-gray-50">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Three simple steps to visualize your new hairstyle with our AI-powered platform.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                                        <ImageIcon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
                                    <p className="text-muted-foreground">
                                        Start by uploading a clear photo of yourself. Our AI works best with front-facing photos in good lighting.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                                        <MessageSquare className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Describe Your Style</h3>
                                    <p className="text-muted-foreground">
                                        Tell us about the hairstyle you want to try. Use natural language or choose from our preset styles.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                                        <Wand2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">See the Magic</h3>
                                    <p className="text-muted-foreground">
                                        Our AI will generate a realistic preview of your new hairstyle in seconds. Try multiple styles!
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="px-4 py-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid gap-12 md:grid-cols-2 items-center">
                            <div className="space-y-8">
                                <h2 className="text-3xl font-bold">Why Choose BeauraAI?</h2>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold mb-1">Realistic Previews</h3>
                                            <p className="text-muted-foreground">
                                                Our AI generates highly realistic transformations that show exactly how you&apos;ll look.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold mb-1">Instant Results</h3>
                                            <p className="text-muted-foreground">
                                                Get your transformation in seconds, not minutes. Try multiple styles quickly.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold mb-1">Style Library</h3>
                                            <p className="text-muted-foreground">
                                                Access thousands of preset styles or create your own custom look.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                                        <Image
                                            alt="Before transformation"
                                            fill
                                            className="object-cover"
                                            loading="lazy"
                                            src={"/assets/ava1.jpg"}
                                        />
                                    </div>
                                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                                        <Image
                                            alt="After transformation"
                                            fill
                                            className="object-cover"
                                            loading="lazy"
                                            src={"/assets/ava2.jpg"}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                                        <Image
                                            alt="Before transformation"
                                            fill
                                            className="object-cover"
                                            loading="lazy"
                                            src={"/assets/ava3.jpg"}
                                        />
                                    </div>
                                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                                        <Image
                                            alt="After transformation"
                                            fill
                                            className="object-cover"
                                            loading="lazy"
                                            src={"/assets/ava4.jpg"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="px-4 py-20 bg-gray-50">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Join thousands of satisfied users who have found their perfect hairstyle with BeauraAI.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {reviews.map((review) => (
                                <Card key={uuidv4()}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage
                                                    src={review.image}
                                                />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{review.nickname}</p>
                                                <p className="text-sm text-muted-foreground">@{review.username}</p>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground">
                                            {review.review}!&quot;
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-4 py-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="relative rounded-3xl bg-primary p-8 md:p-12 lg:p-16 overflow-hidden">
                            <div className="relative z-10 max-w-2xl">
                                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                                    Ready to Transform Your Look?
                                </h2>
                                <p className="text-xl text-primary-foreground/90 mb-8">
                                    Join thousands of users who have discovered their perfect hairstyle with BeauraAI.
                                </p>
                                <Button size="lg" variant="secondary" asChild>
                                    <Link href="/transformation/haircut">
                                        Try BeauraAI Now <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary-foreground/10" />
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}

