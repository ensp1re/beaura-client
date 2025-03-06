'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TicketDetails } from "@/app/admin/components/TicketDetails"
import { useGetTicketsQuery } from '@/services/ticket.service'
import { RootState, useAppSelector } from '@/lib/store'
import { ITicket, TicketStatus } from '@/interfaces/ticket.interface'
import { FaSpinner } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'


export default function AdminContact() {
    const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
    const [ticketStatus, setTicketStatus] = useState<TicketStatus>(TicketStatus.OPEN)
    const [ticketTab, setTicketTab] = useState<ITicket[] | null>(null)

    const auth = useAppSelector((state: RootState) => state.auth)

    const { data: tickets, isLoading: isTicketsLoading } = useGetTicketsQuery(ticketStatus, {
        skip: !auth.user || auth.user.role.toLowerCase() !== 'admin',
    });

    useEffect(() => {
        if (tickets) {
            console.log("Tickets: ", tickets)
        }
    }, [tickets])

    useEffect(() => {
        if (tickets) {
            const filteredTickets = tickets.filter((ticket: ITicket) => ticket.status === ticketStatus)
            setTicketTab(filteredTickets)
        }
    }, [ticketStatus, tickets])

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Contact Support</h1>
            <Tabs defaultValue={TicketStatus.OPEN} onValueChange={(value) => setTicketStatus(value as TicketStatus)}>
                <TabsList>
                    <TabsTrigger value={TicketStatus.OPEN}>Open Tickets</TabsTrigger>
                    <TabsTrigger value={TicketStatus.IN_PROGRESS}>In Progress</TabsTrigger>
                    <TabsTrigger value={TicketStatus.CLOSED}>Closed Tickets</TabsTrigger>
                </TabsList>
                {isTicketsLoading ? (
                    <div className='flex items-center justify-center mt-32'>
                        <FaSpinner className="animate-spin w-6 h-6" />
                    </div>
                ) : (
                    <>
                        {tickets && tickets.length > 0 ? (
                            <>
                                <TabsContent value={TicketStatus.OPEN} className="space-y-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Ticket ID</TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Subject</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Last Updated</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {ticketTab ? ticketTab.filter(ticket => ticket.status === 'Open').map((ticket: ITicket) => (
                                                <TableRow key={uuidv4()}>
                                                    <TableCell>#{ticket._id}</TableCell>
                                                    <TableCell>{(ticket.userId as { username: string }).username}</TableCell>
                                                    <TableCell>{ticket.subject}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={ticket.status === 'Open' ? 'default' : ticket.status === 'In Progress' ? 'secondary' : 'destructive'}>
                                                            {ticket.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(ticket.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => setSelectedTicket(selectedTicket === ticket._id ? null : ticket._id)}>
                                                            {selectedTicket === ticket._id ? 'Close' : 'View'}
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )) : null
                                            }
                                        </TableBody>
                                    </Table>
                                </TabsContent>
                                <TabsContent value={TicketStatus.IN_PROGRESS} className="space-y-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Ticket ID</TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Subject</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Last Updated</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                ticketTab ? ticketTab.filter(ticket => ticket.status === 'In Progress').map((ticket: ITicket) => (
                                                    <TableRow key={uuidv4()}>
                                                        <TableCell>#{ticket._id}</TableCell>
                                                        <TableCell>{(ticket.userId as { username: string }).username}</TableCell>
                                                        <TableCell>{ticket.subject}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={ticket.status === 'Open' ? 'default' : ticket.status === 'In Progress' ? 'secondary' : 'destructive'}>
                                                                {ticket.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(ticket.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => setSelectedTicket(selectedTicket === ticket._id ? null : ticket._id)}>
                                                                {selectedTicket === ticket._id ? 'Close' : 'View'}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )) : null
                                            }
                                        </TableBody>
                                    </Table>
                                </TabsContent>
                                <TabsContent value={TicketStatus.CLOSED} className="space-y-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Ticket ID</TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Subject</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Last Updated</TableHead>
                                                <TableHead>Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                ticketTab ? ticketTab.filter(ticket => ticket.status === 'Closed').map((ticket: ITicket) => (
                                                    <TableRow key={uuidv4()}>
                                                        <TableCell>#{ticket._id}</TableCell>
                                                        <TableCell>{(ticket.userId as { username: string }).username}</TableCell>
                                                        <TableCell>{ticket.subject}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={ticket.status === 'Open' ? 'default' : ticket.status === 'In Progress' ? 'secondary' : 'destructive'}>
                                                                {ticket.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(ticket.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button onClick={() => setSelectedTicket(selectedTicket === ticket._id ? null : ticket._id)}>
                                                                {selectedTicket === ticket._id ? 'Close' : 'View'}
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )) : null
                                            }

                                        </TableBody>
                                    </Table>
                                </TabsContent>
                            </>
                        ) : (
                            <div className='flex items-center justify-center mt-32'>
                                <p>No tickets found</p>
                            </div>
                        )}
                    </>
                )}
            </Tabs>

            {
                selectedTicket && ticketTab ? (
                    <TicketDetails
                        ticket={ticketTab.find((t: ITicket) => t._id.toString() === selectedTicket) as ITicket}
                        messages={ticketTab.find((t: ITicket) => t._id.toString() === selectedTicket)?.messages || []}
                    />
                ) : null}
        </div>
    )
}

