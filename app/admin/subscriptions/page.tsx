'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from 'react-toastify'

const mockSubscriptions = [
    { id: 1, name: 'Basic Plan', price: 9.99, features: ['5 AI transformations/month', 'Basic support'] },
    { id: 2, name: 'Pro Plan', price: 19.99, features: ['20 AI transformations/month', 'Priority support'] },
    { id: 3, name: 'Enterprise Plan', price: 49.99, features: ['Unlimited AI transformations', '24/7 support'] },
]

export default function AdminSubscriptions() {
    const [subscriptions, setSubscriptions] = useState(mockSubscriptions)
    const [newPlan, setNewPlan] = useState({ name: '', price: 0, features: [''] })

    const handleAddPlan = () => {
        setSubscriptions([...subscriptions, { ...newPlan, id: subscriptions.length + 1 }])
        setNewPlan({ name: '', price: 0, features: [''] })
        toast.success('New subscription plan added!')
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Manage Subscriptions</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Current Subscription Plans</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Features</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscriptions.map((sub) => (
                                <TableRow key={sub.id}>
                                    <TableCell>{sub.name}</TableCell>
                                    <TableCell>${sub.price}</TableCell>
                                    <TableCell>
                                        <ul className="list-disc list-inside">
                                            {sub.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outline">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add New Plan</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Subscription Plan</DialogTitle>
                        <DialogDescription>
                            Create a new subscription plan for your users.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newPlan.name}
                                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={newPlan.price}
                                onChange={(e) => setNewPlan({ ...newPlan, price: parseFloat(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="features" className="text-right">
                                Features
                            </Label>
                            <Input
                                id="features"
                                value={newPlan.features.join(', ')}
                                onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value.split(', ') })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAddPlan}>Add Plan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

