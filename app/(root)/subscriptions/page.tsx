/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { IPlan, plans } from '@/constants/constants'
import { RootState, useAppSelector } from '@/lib/store'
import { useCancelSubscriptionMutation, useCreateCheckoutSessionMutation, useCreatePortalSessionMutation } from '@/services/payments.service'
import { useRouter } from 'next/navigation'
import { FaSpinner } from 'react-icons/fa'


export default function UserSubscriptions() {
    const [currentPlan, setCurrentPlan] = useState<IPlan | undefined>(undefined)


    const userPlan = useAppSelector((state: RootState) => state.auth.user?.status)

    const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false)
    const [createPortalSession,
        { isLoading: isPortalLoading }
    ] = useCreatePortalSessionMutation()
    const [createCheckoutSession, {
        isLoading: isCheckoutLoading
    }] = useCreateCheckoutSessionMutation()
    const [cancelSubscription, {
        isLoading: isCancelLoading
    }] = useCancelSubscriptionMutation()

    const auth = useAppSelector((state: RootState) => state.auth)

    const router = useRouter()
    useEffect(() => {
        document.title = "Manage Subscription | Beaura"
        setCurrentPlan(plans.find((plan: IPlan) => plan.name.toLowerCase() === userPlan?.toLowerCase()) || undefined)
    }, [userPlan])

    const handleChangePlan = async (plan: any) => {
        if (plan.name.toLowerCase() === currentPlan?.name) return;
        try {

            if (!auth.user?._id) {
                toast.error("User ID is missing.");
                return;
            }
            const response = await createCheckoutSession({ userId: auth.user._id, planType: plan.name.toLowerCase() }).unwrap();
            if (response.error) {
                toast.error(response.error)
                return;
            }
            if (response.url) {
                router.push(response.url)
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred. Please try again later.")
        }

    }

    const handleCancelSubscription = async () => {
        try {
            if (!auth.user?._id) {
                toast.error("User ID is missing.");
                return;
            }
            const response = await cancelSubscription(auth.user._id).unwrap();
            if (response.error) {
                toast.error(response.error)
                return;
            }
            toast.success("Subscription cancelled successfully")
        } catch (error) {
            console.log(error)
            toast.error("An error occurred. Please try again later.")
        }
    };

    const handleManagePayment = async () => {
        try {
            const result = await createPortalSession(
                auth.user?._id as string
            ).unwrap()
            if (result.url) {
                window.location.href = result.url
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to open billing portal")
        }
    }



    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Manage Your Subscription</h1>
                <div className="mb-8">
                    <Card className="mb-6 w-full">
                        <CardHeader>
                            <CardTitle>Current Plan</CardTitle>
                            <CardDescription>You are currently on the {currentPlan?.name} plan</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold mb-4">{currentPlan?.price}</p>
                            <ul className="list-disc list-inside space-y-2">
                                {currentPlan?.credits && <li>{currentPlan.credits} credits per month</li>}
                                {currentPlan?.features.map((feature) => (
                                    <li key={uuidv4()}>{feature}</li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="flex justify-between flex-col sm:flex-row w-full gap-2">
                            <Button
                                variant="default"
                                className='w-full sm:w-auto'
                                disabled={isPortalLoading}
                                onClick={() => handleManagePayment()}
                            >
                                {isPortalLoading ? <FaSpinner className="animate-spin inline-block" /> : "Manage Payment"}
                            </Button>
                            {currentPlan?.name !== "Free" && (
                                <Button
                                    className='w-full sm:w-auto'
                                    variant="destructive" onClick={() => setShowCancelDialog(true)}>
                                    Cancel Subscription
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
                <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {plans.map((plan: IPlan) => (
                        <Card key={plan.name}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>{plan.price}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>{plan.credits} credits per month</li>
                                    {plan.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => handleChangePlan(plan)}
                                    disabled={plan.name.toLowerCase() === currentPlan?.name.toLowerCase()}
                                    className="w-full"
                                >
                                    {
                                        isCheckoutLoading && plan.name.toLowerCase() === currentPlan?.name.toLowerCase() ?
                                            <FaSpinner className="animate-spin inline-block" /> :
                                            plan.name.toLowerCase() === currentPlan?.name.toLowerCase() ? "Current Plan" : `Switch to ${plan.name}`
                                    }
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
            {
                showCancelDialog && (
                    <>
                        <div className='fixed inset-0 bg-black bg-opacity-50 z-40'></div>
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                <h2 className="text-xl font-bold mb-4">Are you sure you want to cancel your subscription?</h2>
                                <p className="mb-6">This action cannot be undone. You will lose access to premium features at the end of your current billing period.</p>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                        onClick={() => setShowCancelDialog(false)}
                                    >
                                        Cancel
                                    </button>
                                    <Button
                                        disabled={isCancelLoading}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        onClick={handleCancelSubscription}
                                    >
                                        {
                                            isCancelLoading ?
                                                (
                                                    <FaSpinner className="animate-spin inline-block" />
                                                ) : "Cancel Subscription"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>

                )}
        </div>
    )
}


