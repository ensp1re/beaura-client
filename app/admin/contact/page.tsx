'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TicketDetails } from "@/app/admin/components/TicketDetails"

// This would typically come from your backend
const mockTickets = [
    { id: 1, user: 'John Doe', email: 'john@example.com', subject: 'Account Issues', status: 'Open', lastUpdated: '2023-06-15' },
    { id: 2, user: 'Jane Smith', email: 'jane@example.com', subject: 'Subscription Inquiry', status: 'In Progress', lastUpdated: '2023-06-14' },
    { id: 3, user: 'Bob Johnson', email: 'bob@example.com', subject: 'Technical Support', status: 'Closed', lastUpdated: '2023-06-13' },
]

const mockResponses = [
    { id: 1, ticketId: 1, user: 'John Doe', message: 'I\'m having trouble accessing my account. Can you help?', timestamp: '2023-06-15 10:00:00' },
    { id: 2, ticketId: 1, user: 'Support Agent', message: 'Can you please provide more details about the issue you\'re experiencing?', timestamp: '2023-06-15 10:30:00' },
    { id: 3, ticketId: 1, user: 'John Doe', message: 'When I try to log in, it says my password is incorrect, but I\'m sure it\'s right.', timestamp: '2023-06-15 11:00:00' },
]

export default function AdminContact() {
    const [selectedTicket, setSelectedTicket] = useState<number | null>(null)

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Contact Support</h1>
            <Tabs defaultValue="open">
                <TabsList>
                    <TabsTrigger value="open">Open Tickets</TabsTrigger>
                    <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
                <TabsContent value="open" className="space-y-4">
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
                            {mockTickets.filter(ticket => ticket.status === 'Open').map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell>#{ticket.id}</TableCell>
                                    <TableCell>{ticket.user}</TableCell>
                                    <TableCell>{ticket.subject}</TableCell>
                                    <TableCell><Badge>{ticket.status}</Badge></TableCell>
                                    <TableCell>{ticket.lastUpdated}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => setSelectedTicket(ticket.id)}>View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="inprogress" className="space-y-4">
                    {/* Similar table structure for in-progress tickets */}
                </TabsContent>
                <TabsContent value="closed" className="space-y-4">
                    {/* Similar table structure for closed tickets */}
                </TabsContent>
            </Tabs>

            {selectedTicket && (
                <TicketDetails
                    ticket={mockTickets.find(t => t.id === selectedTicket)!}
                    responses={mockResponses.filter(r => r.ticketId === selectedTicket)}
                />
            )}
        </div>
    )
}

