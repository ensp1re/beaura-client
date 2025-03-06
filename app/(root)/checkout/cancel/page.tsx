'use client';

/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { FC, ReactElement, useEffect } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const CancelCheckout: FC = (): ReactElement => {

    useEffect(() => {
        document.title = "Cancel Checkout | Beaura";
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-5">
            <FaTimesCircle size={100} className="text-red-500" />
            <h1 className="text-2xl text-gray-800 my-5">Checkout Cancelled</h1>
            <p className="text-gray-600 mb-5 text-center max-w-xl">
                We&#39;re sorry to see you go. If you have any questions or need assistance, please contact our support team.
            </p>

            <Link href="/dashboard">
                <Button
                    variant={"default"}
                    className="px-5 py-2 text-lg text-white"
                >
                    Go to Dashboard
                </Button>
            </Link>
        </div>
    );
}

export default CancelCheckout;