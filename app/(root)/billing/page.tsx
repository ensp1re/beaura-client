'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { change } from "@/lib/reducers/uiSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/lib/store";
import { Download } from 'lucide-react'
import { useEffect, useState } from "react"
import axios from 'axios'
import toast from "react-hot-toast";


export interface IBill {
    id?: string;
    amount: number;
    currency: string;
    status: string;
    date: Date;
    invoiceId: number;
}

export default function BillingPage() {
    const dispatch = useAppDispatch();
    const [billsData, setBillsData] = useState<IBill[] | null>(null);

    const auth = useAppSelector((state: RootState) => state.auth)

    useEffect(() => {
        dispatch(change("Billing"))
        document.title = "Billing | BeAura"
    }, [dispatch])


    const downloadInvoice = async (invoiceId: number) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/payments/retrieve-invoice/${invoiceId}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                }
            });
            if (response.data) {
                window.open(response.data, "_blank")
            }
            if (!response.data) {
                console.error("No data found in the response");
                toast.error("An error occurred while downloading the invoice. Please try again later.")
                return;
            }

        } catch (error) {
            console.error("Error downloading the invoice:", error);
            toast.error("An error occurred while downloading the invoice. Please try again later.")
        }
    };

    useEffect(() => {
        const userTransactions = auth.user?.transactions;
        if (userTransactions) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const extractedTransactions = userTransactions.map((transaction: IBill[]) => {
                const { id, amount, currency, status, date, invoiceId } = transaction[0];
                return { id, amount, currency, status, date, invoiceId }
            })
            setBillsData(extractedTransactions)
        }
    }, [auth.user?.transactions])



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
                                    <TableHead>Currency</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {billsData && billsData.map((bill: IBill) => (
                                    <TableRow key={bill.id}>
                                        <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                                        <TableCell>${Number(bill.amount) / 100}</TableCell>
                                        <TableCell>
                                            <span className={`status-${bill.status.toLowerCase()} ${bill.status === 'paid' ? 'text-green-500' : bill.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                                                {bill.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>{bill.currency}</TableCell>
                                        <TableCell>
                                            <Button onClick={
                                                () => downloadInvoice(bill.invoiceId!)
                                            } variant="ghost" size="sm">
                                                <Download className="h-4 w-4 mr-2" />
                                                Download
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {
                                    !billsData && <TableRow>
                                        <TableCell colSpan={5} className="text-center">No bills found</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

