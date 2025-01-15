'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch } from '@/lib/store'
import { change } from '@/lib/reducers/uiSlice'

export default function CheckoutPage() {
    const searchParams = useSearchParams()
    const [plan, setPlan] = useState('')
    const [price, setPrice] = useState('')
    const [credits, setCredits] = useState('')

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(change("Pricing"))
    }, [dispatch])

    useEffect(() => {
        const planParam = searchParams.get('plan')
        if (planParam === 'free') {
            setPlan('Free Starter')
            setPrice('$0')
            setCredits('5')
        } else if (planParam === 'premium') {
            setPlan('Premium')
            setPrice('$19.99')
            setCredits('100')
        }
    }, [searchParams])

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Plan:</span>
                                <span className="font-medium">{plan}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Price:</span>
                                <span className="font-medium">{price}/month</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Credits:</span>
                                <span className="font-medium">{credits} credits/month</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Details</CardTitle>
                        <CardDescription>Enter your payment information to complete your purchase</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry-date">Expiry Date</Label>
                                    <Input id="expiry-date" placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input id="cvv" placeholder="123" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name on Card</Label>

                                <Input id="name" placeholder="John Doe" />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Complete Purchase</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

