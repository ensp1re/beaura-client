'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Edit, User } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useCallback, useEffect, useState } from "react"
import { DateRangeSelector } from "@/app/components/DataRangeSelector"
import { RootState, useAppDispatch, useAppSelector } from "@/lib/store"
import { change } from "@/lib/reducers/uiSlice"
import { toFirstCharUppercase } from "@/lib/utils"
import { planCosts, planCredits } from "@/constants/constants"



const initialCreditUsageData = [
    { date: '2023-01', credits: 100 },
    { date: '2023-02', credits: 150 },
    { date: '2023-03', credits: 200 },
    { date: '2023-04', credits: 180 },
    { date: '2023-05', credits: 220 },
    { date: '2023-06', credits: 250 },
]

const initialTransformationsData = [
    { date: '2023-01', count: 10 },
    { date: '2023-02', count: 15 },
    { date: '2023-03', count: 20 },
    { date: '2023-04', count: 18 },
    { date: '2023-05', count: 22 },
    { date: '2023-06', count: 25 },
]

export default function ProfilePage() {

    const dispatch = useAppDispatch();

    const auth = useAppSelector((state: RootState) => state.auth.user)

    const [creditUsageData, setCreditUsageData] = useState(initialCreditUsageData)
    const [transformationsData, setTransformationsData] = useState(initialTransformationsData)

    const updateCreditUsageData = useCallback((start: Date, end: Date) => {
        const filteredData = initialCreditUsageData.filter(d => {
            const date = new Date(d.date)
            return date >= start && date <= end
        })
        setCreditUsageData(filteredData)
    }, [])

    const updateTransformationsData = useCallback((start: Date, end: Date) => {
        const filteredData = initialTransformationsData.filter(d => {
            const date = new Date(d.date)
            return date >= start && date <= end
        })
        setTransformationsData(filteredData)
    }, [])

    useEffect(() => {
        document.title = "Profile | BeAura"
        dispatch(change("Profile"))
    }, [dispatch])




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
                                <AvatarImage src={`
                                    ${auth?.profilePicture}
                                    `} alt={auth?.username} />
                                <AvatarFallback>
                                    {auth?.username.split(' ').map((n: string) => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                        </CardContent>
                        <CardFooter>
                            <Button variant="default" className="w-full">
                                <Link href={`/profile/${auth?.username}`} className="flex gap-2 items-center justify-center">
                                    <User className="mr-2 h-4 w-4" />
                                    See Public Profile
                                </Link>
                            </Button>
                        </CardFooter>
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
                                        <p className="text-lg">{
                                            auth?.nickname || auth?.username
                                        }</p>
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <p className="text-lg">{
                                            auth?.email
                                        }</p>
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
                                    <p className="text-2xl font-bold">{toFirstCharUppercase(auth?.status as string)} Plan</p>
                                    <p className="text-muted-foreground">
                                        {auth?.status && planCosts[auth?.status as keyof typeof planCosts] || 0} / month
                                    </p>
                                </div>
                                <Badge variant="secondary" className="text-lg py-1">Active</Badge>
                            </div>
                            <Button className="mt-4" variant="outline">
                                <Link href="/subscriptions" className="flex gap-2 items-center justify-center">
                                    <CreditCard />
                                    Manage Subscription
                                </Link>
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
                                    <p className="text-2xl font-bold">
                                        {auth?.credits || 0} / {
                                            auth?.status && planCredits[auth?.status as keyof typeof planCredits] || 0
                                        }
                                    </p>
                                </div>
                                <Progress value={
                                    (auth?.credits || 0) / (auth?.status && planCredits[auth?.status as keyof typeof planCredits] || 0) * 100
                                } className="w-full" />
                                <Button className="w-full">
                                    <User className="mr-2 h-4 w-4" />
                                    Purchase More Credits
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-8 md:grid-cols-2 mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Credit Usage</CardTitle>
                            <DateRangeSelector onRangeChange={updateCreditUsageData} label="Select Date Range for Credit Usage" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={creditUsageData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="credits" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Transformations</CardTitle>
                            <DateRangeSelector onRangeChange={updateTransformationsData} label="Select Date Range for Transformations" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={transformationsData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

