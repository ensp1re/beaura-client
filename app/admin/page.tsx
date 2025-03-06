'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, MessageSquare, Users } from 'lucide-react'
import DashboardCharts from "./components/DashboardCharts"
import { ReactElement, useEffect, useState } from "react"
import { useGetAllUsersQuery } from "@/services/users.service"
import { RootState, useAppSelector } from "@/lib/store"
import { IAuthRedux } from "@/interfaces/auth.interface";
import { useGetTicketsQuery } from "@/services/ticket.service";
import { TicketStatus } from "@/interfaces/ticket.interface";

export default function AdminDashboard(): ReactElement {

    const auth = useAppSelector((state: RootState) => state.auth)

    const [totalUsers, setTotalUsers] = useState<number>(0)
    const [totalRevenue, setTotalRevenue] = useState<number>(0)
    const [activeSubscriptions, setActiveSubscriptions] = useState<number>(0)
    const [supportTickets, setSupportTickets] = useState<number>(0)

    const { data: users, isLoading: isUsersLoading, isError: isUsersError } = useGetAllUsersQuery(undefined, {
        skip: auth.user ? auth.user.role.toLowerCase() !== 'admin' : true
    }) as { data: IAuthRedux[], isLoading: boolean, isError: boolean };


    const { data: ticketsData } = useGetTicketsQuery(TicketStatus.OPEN, {
        skip: auth.user ? auth.user.role.toLowerCase() !== 'admin' : true
    });

    console.log("Tickets: ", ticketsData)

    useEffect(() => {
        if (users) {
            setTotalUsers(users.length)


            setSupportTickets(ticketsData?.length || 0)

            const totalR = users.reduce((sum, user) =>
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                sum + (user.transactions?.reduce((acc, t) => acc + t[0].amount, 0) || 0), 0
            )
            setTotalRevenue(totalR / 100)


            const acCount = users.reduce((count, user) =>
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                count + (user.subscriptions?.filter(sub => sub[0].status === 'active').length || 0), 0
            );

            setActiveSubscriptions(acCount)


        }
    }, [ticketsData?.length, users])


    console.log(
        "Users: ",
        users,
        "isUsersLoading: ",
        isUsersLoading,
        "isUsersError: ",
        isUsersError
    )

    return (
        <div suppressContentEditableWarning suppressHydrationWarning className="space-y-6">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalUsers}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalRevenue}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{activeSubscriptions}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{supportTickets}</div>
                        </CardContent>
                    </Card>
                </div>
                <DashboardCharts users={users} />
            </div>
        </div>
    )
}

