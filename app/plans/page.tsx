import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from 'lucide-react'
import SiteHeader from "../components/SiteHeader"
import { SiteFooter } from "../components/SiteFooter"

export const metadata = {
    title: 'Pricing - BeauraAI',
    description: 'Choose the perfect plan for your AI-powered hairstyle transformations with BeauraAI.',
}

const plans = [
    {
        name: "Basic",
        price: "Free",
        description: "Perfect for trying out BeauraAI",
        features: [
            "5 AI transformations per month",
            "Basic style library",
            "Standard quality renders",
            "24-hour support response time",
        ],
        cta: "Get Started",
    },
    {
        name: "Pro",
        price: "$9.99/month",
        description: "Ideal for regular style explorers",
        features: [
            "50 AI transformations per month",
            "Extended style library",
            "High-quality renders",
            "Multi-angle views",
            "12-hour support response time",
        ],
        cta: "Start Pro Plan",
    },
    {
        name: "Ultimate",
        price: "$19.99/month",
        description: "For professionals and style enthusiasts",
        features: [
            "Unlimited AI transformations",
            "Full style library access",
            "Ultra high-quality renders",
            "Advanced editing tools",
            "Priority support (4-hour response)",
        ],
        cta: "Go Ultimate",
    },
]

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
                    <div className="containe mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Simple, Transparent Pricing
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Choose the perfect plan for your style needs. No hidden fees, cancel anytime.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="px-4 md:px-6">
                        <div className="flex justify-center">
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                                {plans.map((plan) => (
                                    <Card key={plan.name} className="flex flex-col w-full max-w-sm mx-auto">
                                        <CardHeader>
                                            <CardTitle>{plan.name}</CardTitle>
                                            <CardDescription>{plan.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <div className="text-3xl font-bold">{plan.price}</div>
                                            <ul className="mt-4 space-y-2">
                                                {plan.features.map((feature) => (
                                                    <li key={feature} className="flex items-center">
                                                        <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                                                        <span className="text-sm text-muted-foreground">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full">{plan.cta}</Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Frequently Asked Questions
                                </h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Have questions? We&apos;re here to help.
                                </p>
                            </div>
                            <div className="w-full max-w-2xl space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Can I change plans at any time?</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will be reflected in your next billing cycle.
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>What payment methods do you accept?</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        We accept all major credit cards, PayPal, and Apple Pay for seamless transactions.
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Is there a money-back guarantee?</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        We offer a 14-day money-back guarantee for all paid plans. If you&apos;re not satisfied, simply contact our support team for a full refund.
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}

