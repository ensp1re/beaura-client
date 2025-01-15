'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Edit, User } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'

export default function ProfilePage() {

    const name = "Sarah Johnson"
    const email = "sarah@gmail.com"

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
                <div className="grid gap-8 md:grid-cols-3">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <Avatar className="w-32 h-32 mb-4">
                                <AvatarImage src="/assets/placeholder.jpg" alt={name} />
                                <AvatarFallback>{name[0]}</AvatarFallback>
                            </Avatar>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>View and edit your profile details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Label>Name</Label>
                                        <p className="text-lg">{name}</p>
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <p className="text-lg">{email}</p>
                                    </div>
                                </div>
                                <Link href={"/settings"}>
                                    <Button variant="outline" className="mt-12">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                </Link>

                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-8 md:grid-cols-2 mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-2xl font-bold">Pro Plan</p>
                                    <p className="text-muted-foreground">$19.99/month</p>
                                </div>
                                <Badge variant="secondary" className="text-lg py-1">Active</Badge>
                            </div>
                            <Button className="mt-4" variant="outline">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Manage Subscription
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Credits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-lg">Credits Remaining</p>
                                    <p className="text-2xl font-bold">750 / 1000</p>
                                </div>
                                <Progress value={75} className="w-full" />
                                <Button className="w-full">
                                    <User className="mr-2 h-4 w-4" />
                                    Purchase More Credits
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

