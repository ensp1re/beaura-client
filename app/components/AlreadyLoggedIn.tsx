'use client';


import React from 'react'
import { Button } from "../../components/ui/button"
import { useRouter } from 'next/navigation';

const AlreadyLoggedIn: React.FC = () => {

    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">User already Logged In</h1>
            <Button
                variant={'default'}
                onClick={() => router.push('/home')}
                className="bg-gray-800 text-white px-4 py-2 rounded">
                Go to Home</Button>
        </div>
    )
}

export default AlreadyLoggedIn;