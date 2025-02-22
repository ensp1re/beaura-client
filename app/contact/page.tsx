'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react'
import { toast } from 'react-toastify'
import SiteHeader from '../components/SiteHeader'
import { SiteFooter } from '../components/SiteFooter'

export default function ContactPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', { name, email, message })
        toast.success("Message Sent: We've received your message and will get back to you soon.")
        setName('')
        setEmail('')
        setMessage('')
    }

    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container px-4 md:px-6">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
                            Contact Us
                        </h1>
                        <p className="text-xl text-muted-foreground text-center max-w-[600px] mx-auto mb-12">
                            Have questions or feedback? We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.
                        </p>
                        <div className="grid gap-8 lg:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Send Us a Message</CardTitle>
                                    <CardDescription>Fill out the form below to get in touch with our team.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                placeholder="Your name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                placeholder="Your message"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full">Send Message</Button>
                                    </form>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                    <CardDescription>You can also reach us through the following channels:</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <MailIcon className="h-6 w-6 text-primary" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <p className="text-sm text-muted-foreground">support@beaura.ai</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <PhoneIcon className="h-6 w-6 text-primary" />
                                        <div>
                                            <p className="font-medium">Phone</p>
                                            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <MapPinIcon className="h-6 w-6 text-primary" />
                                        <div>
                                            <p className="font-medium">Address</p>
                                            <p className="text-sm text-muted-foreground">123 AI Street, Tech City, TC 12345</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}

