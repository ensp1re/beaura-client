'use client';

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { FC, ReactElement, useEffect } from 'react'
import { FaTimesCircle } from 'react-icons/fa'

const ErrorCheckout: FC = (): ReactElement => {


    useEffect(() => {
        document.title = "Error | Beaura";
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen  space-y-4  p-5 box-border">
            <FaTimesCircle size={100} className="text-red-500" />
            <h1 className="text-3xl font-bold mb-5 text-red-600">Oops! Something went wrong.</h1>
            <p className="text-lg mb-5 text-center text-gray-700">We encountered an error during the checkout process. Please try again later.</p>
            <Link href="/dashboard">
                <Button
                    variant={"default"}
                    className="px-6 py-3 text-lg text-white "
                >
                    Go to Dashboard
                </Button>
            </Link>
        </div>
    )
}

export default ErrorCheckout
