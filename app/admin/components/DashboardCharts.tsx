'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IAuthRedux } from "@/interfaces/auth.interface"
import { FC, ReactElement, useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DashboardChartsProps {
    users: IAuthRedux[];
};

interface IDataUserGrowth {
    date?: string;
    users?: number;
}

interface IDataRevenue {
    date?: string;
    revenue?: number;
}

const DashboardCharts: FC<DashboardChartsProps> = (
    { users }
): ReactElement => {

    const [dataUserGrowth, setDataUserGrowth] = useState<IDataUserGrowth[] | null>(null)
    const [dataRevenue, setDataRevenue] = useState<IDataRevenue[] | null>(null)

    useEffect(() => {
        if (users) {
            const currentMonth = new Date().getMonth();

            const dataUserGrowth: IDataUserGrowth[] = Array.from({ length: 12 }, (_, i) => {
                const monthIndex = (currentMonth + i) % 12;
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const monthName = monthNames[monthIndex];
                const usersInMonth = users.filter(user => {
                    const userMonth = user.createdAt ? new Date(user.createdAt).getMonth() : -1;
                    return userMonth === monthIndex;
                }).length;
                return {
                    date: monthName,
                    users: usersInMonth,
                };
            });
            setDataUserGrowth(dataUserGrowth)

            const dataRevenue: IDataRevenue[] = Array.from({ length: 12 }, (_, i) => {
                const monthIndex = (currentMonth + i) % 12;
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const monthName = monthNames[monthIndex];
                const revenueInMonth = users.reduce((sum, user) => {

                    return sum + (user.transactions?.reduce((acc, t) => {
                        /* eslint-disable @typescript-eslint/ban-ts-comment */
                        // @ts-expect-error
                        const transactionMonth = new Date(t[0].date).getMonth();
                        if (transactionMonth === monthIndex) {
                            // @ts-expect-error
                            return acc + (t[0].amount / 100);
                        }
                        return acc;
                    }, 0) || 0);
                }, 0);
                return {
                    date: monthName,
                    revenue: revenueInMonth,
                };
            });

            console.log("Revenue Data: ", dataRevenue)

            setDataRevenue(dataRevenue);
        }
    }, [users])

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dataUserGrowth || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="users" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Revenue</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dataRevenue || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardCharts;