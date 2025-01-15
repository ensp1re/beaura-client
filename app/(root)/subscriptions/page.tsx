/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from 'react-toastify'

const plans = [
    { id: 1, name: 'Basic Plan', price: 9.99, features: ['5 AI transformations/month', 'Basic support'] },
    { id: 2, name: 'Pro Plan', price: 19.99, features: ['20 AI transformations/month', 'Priority support'] },
    { id: 3, name: 'Enterprise Plan', price: 49.99, features: ['Unlimited AI transformations', '24/7 support'] },
]

export default function UserSubscriptions() {
    const [currentPlan, setCurrentPlan] = useState(plans[0])

    const handleChangePlan = (plan: any) => {
        setCurrentPlan(plan)
        toast.success(`You have switched to the ${plan.name} plan!`)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Manage Your Subscription</h1>
                <div className="mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                            <CardDescription>You are currently on the {currentPlan.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">${currentPlan.price}/month</p>
                            <ul className="list-disc list-inside mt-4">
                                {currentPlan.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline">Manage Payment Method</Button>
                        </CardFooter>
                    </Card>
                </div>
                <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {plans.map((plan) => (
                        <Card key={plan.id}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>${plan.price}/month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside">
                                    {plan.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                {plan.id === currentPlan.id ? (
                                    <Badge>Current Plan</Badge>
                                ) : (
                                    <Button onClick={() => handleChangePlan(plan)}>Switch to {plan.name}</Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}

