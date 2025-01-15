'use client';

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Check } from 'lucide-react'
import { useAppDispatch } from '@/lib/store';
import { useEffect } from 'react';
import { change } from '@/lib/reducers/uiSlice';

export default function PricingPage() {


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(change("Pricing"))
    }, [dispatch])

    return (


        <div className="container mx-auto px-6 py-12">
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">From zero to pro.</h1>
                <p className="text-lg text-muted-foreground">
                    Designed for every stage of your journey.<br />
                    Start today, no credit card required.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {/* Free Plan */}
                <Card className="relative">
                    <CardHeader className="pb-8">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">Free</h3>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold">$0</span>
                                <span className="ml-1 text-muted-foreground text-sm">/month</span>
                            </div>
                            <p className="text-sm text-muted-foreground">For very small teams</p>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-8">
                        <ul className="space-y-2.5">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">5 credits per month</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">Basic transformations</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">Standard resolution</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Link href="/checkout?plan=free" className="w-full">
                            <Button variant="outline" className="w-full">Start for free</Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Plus Plan */}
                <Card className="relative">
                    <CardHeader className="pb-8">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">Plus</h3>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold">$9.99</span>
                                <span className="ml-1 text-muted-foreground text-sm">/month</span>
                            </div>
                            <p className="text-sm text-muted-foreground">For growing teams</p>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-8">
                        <ul className="space-y-2.5">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">25 credits per month</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">Advanced transformations</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">HD resolution output</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Link href="/checkout?plan=plus" className="w-full">
                            <Button variant="outline" className="w-full">Continue with Plus</Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="relative border-2 border-primary shadow-lg">
                    <CardHeader className="pb-8">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">Pro</h3>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold">$19.99</span>
                                <span className="ml-1 text-muted-foreground text-sm">/month</span>
                            </div>
                            <p className="text-sm text-muted-foreground">For scaling businesses</p>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-8">
                        <ul className="space-y-2.5">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">100 credits per month</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">Premium transformations</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">4K resolution output</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                <span className="text-sm">Priority support</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Link href="/checkout?plan=premium" className="w-full">
                            <Button className="w-full">Continue with Pro</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

