'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { change } from "@/lib/reducers/uiSlice";
import { useAppDispatch } from "@/lib/store";
import { Download } from 'lucide-react'
import { useEffect } from "react"

const bills = [
    { id: 1, date: '2023-06-01', amount: 19.99, status: 'Paid', cardLast4: '4242' },
    { id: 2, date: '2023-05-01', amount: 19.99, status: 'Paid', cardLast4: '4242' },
    { id: 3, date: '2023-04-01', amount: 19.99, status: 'Paid', cardLast4: '4242' },
]

export default function BillingPage() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(change("Billing"))
        document.title = "Billing | BeAura"
    }, [dispatch])

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto px-4 py-8">
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Billing History</CardTitle>
                        <CardDescription>View and download your past invoices</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Card</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bills.map((bill) => (
                                    <TableRow key={bill.id}>
                                        <TableCell>{bill.date}</TableCell>
                                        <TableCell>${bill.amount}</TableCell>
                                        <TableCell>{bill.status}</TableCell>
                                        <TableCell>**** {bill.cardLast4}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm">
                                                <Download className="h-4 w-4 mr-2" />
                                                Download
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

