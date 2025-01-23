import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Book, LifeBuoy } from 'lucide-react'
import Link from "next/link"
import SiteHeader from "../components/SiteHeader"
import { SiteFooter } from "../components/SiteFooter"

export const metadata = {
    title: 'Help Center - BeauraAI',
    description: 'Get answers to your questions and learn how to make the most of BeauraAI.',
}

const faqItems = [
    {
        question: "How does BeauraAI work?",
        answer: "BeauraAI uses advanced AI algorithms to analyze your facial features and create realistic hair transformations based on your chosen styles or descriptions."
    },
    {
        question: "Is my data safe with BeauraAI?",
        answer: "Yes, we take data privacy seriously. All uploaded images are processed securely and are not shared with third parties. Please refer to our Privacy Policy for more details."
    },
    {
        question: "Can I use BeauraAI on mobile devices?",
        answer: "Yes, BeauraAI is fully responsive and works on both desktop and mobile devices. You can access it through your web browser or download our mobile app."
    },
    {
        question: "How accurate are the AI transformations?",
        answer: "Our AI models are trained on a vast dataset of hairstyles and continuously improved. While results are highly realistic, slight variations may occur. We recommend trying multiple styles for the best experience."
    },
]

export default function HelpCenterPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
                            BeauraAI Help Center
                        </h1>
                        <div className="max-w-[600px] mx-auto mb-12">
                            <div className="flex w-full items-center space-x-2">
                                <Input type="text" placeholder="Search for help..." />
                                <Button type="submit">
                                    <Search className="h-4 w-4 mr-2" />
                                    Search
                                </Button>
                            </div>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <Book className="h-5 w-5 inline-block mr-2" />
                                        Guides & Tutorials
                                    </CardTitle>
                                    <CardDescription>Learn how to use BeauraAI effectively</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" asChild className="w-full">
                                        <Link href="/guides">View Guides</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <LifeBuoy className="h-5 w-5 inline-block mr-2" />
                                        Contact Support
                                    </CardTitle>
                                    <CardDescription>Get help from our support team</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="outline" asChild className="w-full">
                                        <Link href="/contact">Contact Us</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="max-w-[800px] mx-auto">
                            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                            <Accordion type="single" collapsible>
                                {faqItems.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger>{item.question}</AccordionTrigger>
                                        <AccordionContent>{item.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}

