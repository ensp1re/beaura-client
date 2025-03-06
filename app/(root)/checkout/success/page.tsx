'use client';

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { FC, ReactElement, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const SuccessCheckout: FC = (): ReactElement => {


    useEffect(() => {
        document.title = "Success | Beaura";
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4 p-5 box-border">
            <FaCheckCircle size={100} className="text-green-500" />
            <h1 className="text-3xl font-bold mb-5 text-green-600">Success! Your order is complete.</h1>
            <p className="text-lg mb-5 text-center text-gray-700">Thank you for your purchase. Your order has been successfully processed.</p>
            <Link href="/dashboard">
                <Button
                    variant={"default"}
                    className="px-6 py-3 text-lg text-white"
                >
                    Go to Dashboard
                </Button>
            </Link>
        </div>
    )
}

export default SuccessCheckout