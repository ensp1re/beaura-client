import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'react-toastify'

interface Response {
    id: number
    ticketId: number
    user: string
    message: string
    timestamp: string
}

interface Ticket {
    id: number
    user: string
    email: string
    subject: string
    status: string
    lastUpdated: string
}

interface TicketDetailsProps {
    ticket: Ticket
    responses: Response[]
}

export function TicketDetails({ ticket, responses }: TicketDetailsProps) {
    const [newResponse, setNewResponse] = useState('')
    const [status, setStatus] = useState(ticket.status)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the response to your backend
        console.log('Response submitted:', { ticketId: ticket.id, response: newResponse, status })
        toast.success("Response Sent: Your response has been sent to the user.")
        setNewResponse('')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ticket #{ticket.id}</CardTitle>
                <CardDescription>{ticket.subject}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{ticket.user}</p>
                        <p className="text-sm text-muted-foreground">{ticket.email}</p>
                    </div>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <ScrollArea className="h-[400px] pr-4">
                    {responses.map((response) => (
                        <div key={response.id} className="flex mb-4">
                            <Avatar className="mr-2">
                                <AvatarImage src="/placeholder.svg" alt={response.user} />
                                <AvatarFallback>{response.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center mb-1">
                                    <span className="font-semibold mr-2">{response.user}</span>
                                    <span className="text-sm text-muted-foreground">{response.timestamp}</span>
                                </div>
                                <p>{response.message}</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="response">Your Response</Label>
                        <Textarea
                            id="response"
                            value={newResponse}
                            onChange={(e) => setNewResponse(e.target.value)}
                            required
                            placeholder="Type your response here..."
                            className="min-h-[100px]"
                        />
                    </div>
                    <Button type="submit">Send Response</Button>
                </form>
            </CardContent>
        </Card>
    )
}

