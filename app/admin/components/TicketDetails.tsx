import { ChangeEvent, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'react-toastify'
import { IMessage, ITicket, TicketStatus } from '@/interfaces/ticket.interface'

import { v4 as uuidv4 } from 'uuid'
import { useAddMessageMutation, useUpdateTicketStatusMutation } from '@/services/ticket.service'
import { RootState, useAppSelector } from '@/lib/store'
import { FaSpinner } from 'react-icons/fa'



interface TicketDetailsProps {
    ticket: ITicket 
    messages: IMessage[]
}

export function TicketDetails({ ticket, messages }: TicketDetailsProps) {
    const [newResponse, setNewResponse] = useState('')
    const [status, setStatus] = useState<TicketStatus>(ticket.status)

    const [createMessage, {
        isLoading: isCreatingMessage,
        isSuccess: isMessageSuccess,
    }] = useAddMessageMutation();

    const [
        updateTicketStatus
    ] = useUpdateTicketStatusMutation();

    const auth = useAppSelector((state: RootState) => state.auth)

    const handleSubmit = async (): Promise<void> => {
        try {
            const data = {
                id: ticket._id,
                message: {
                    userId: auth.user?._id,
                    content: newResponse
                }
            }

            const response = await createMessage(data).unwrap()

            if (!response) {
                toast.error("Error: Unable to send response.")
                return
            }

            if (isMessageSuccess) {
                toast.success("Sent response successfully.")
                setNewResponse('')
            }


        } catch (error) {
            console.error(error)
            toast.error("Error: Unable to send response.")
        }
    }

    useEffect(() => {
        const handleTicketStatusChange = (status: TicketStatus): void => {
            try {
                toast.promise(
                    updateTicketStatus({ id: ticket._id, status }),
                    {
                        pending: (
                            <span className='flex items-center'>
                                <FaSpinner className="animate-spin w-4 h-4 mr-2" />
                            </span>
                        ),
                        success: (
                            'Ticket status updated successfully.'
                        ),
                        error: 'Error: Unable to update ticket status.'
                    }
                )
            } catch (error) {
                console.error(error)
                toast.error("Error: Unable to update ticket status.")

            }
        }
        handleTicketStatusChange(status)
    }, [status, ticket._id, updateTicketStatus])

    return (
        <Card suppressHydrationWarning>
            <CardHeader>
                <CardTitle>Ticket #{ticket._id}</CardTitle>
                <CardDescription>{ticket.subject}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{ticket.userId.username}</p>
                        <p className="text-sm text-muted-foreground">{ticket.userId.email}</p>
                    </div>
                    <Select value={status} onValueChange={(value) => setStatus(value as TicketStatus)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={
                                TicketStatus.OPEN
                            }>Open</SelectItem>
                            <SelectItem value={
                                TicketStatus.IN_PROGRESS
                            }>In Progress</SelectItem>
                            <SelectItem value={
                                TicketStatus.CLOSED
                            }>Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <ScrollArea className="h-[400px] pr-4">
                    {messages.map((msg: IMessage) => (
                        <div key={uuidv4()} className="flex mb-4">
                            <Avatar className="mr-2">
                                <AvatarImage
                                    src=
                                    {
                                        msg.profilePicture || '/icons/placeholder.svg'
                                    }
                                    alt={msg.username} />
                                <AvatarFallback>{msg.username[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center mb-1">
                                    <span className="font-semibold mr-2">{msg.username}</span>
                                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                                </div>
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
                <form className="mt-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="response">Your Response</Label>
                        <Textarea
                            id="response"
                            value={newResponse}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewResponse(e.target.value)}
                            required
                            placeholder="Type your response here..."
                            className="min-h-[100px]"
                        />
                    </div>

                    {
                        ticket.status === TicketStatus.CLOSED ? (
                            <p className="text-red-500">This ticket is closed and cannot be responded to.</p>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={isCreatingMessage}
                                className={
                                    `w-full ${isCreatingMessage ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-primary text-white'}`
                                }
                                type="submit">
                                {
                                    isCreatingMessage ? (
                                        <FaSpinner className="animate-spin w-4 h-4 mr-2" />
                                    ) : 'Send Response'
                                }
                            </Button>
                        )
                    }

                </form>
            </CardContent>
        </Card >
    )
}

