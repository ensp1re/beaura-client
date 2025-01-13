import Image from 'next/image';
import React, { FC, ReactElement } from 'react'
import LoginForm from './LoginForm';

const LoginComponent: FC = (): ReactElement => {
    return (
        <>
            <div className="grid h-screen w-full grid-cols-1 md:grid-cols-2">
                <div className="hidden flex-col items-center justify-between bg-gradient-to-br from-gray-400 to-gray-600 p-6 md:flex">
                    <div className="flex w-full items-center justify-center pt-8">
                        <Image
                            src="/assets/beaura.png"
                            width={50}
                            height={50}
                            alt="Beaura logo"
                            className="mr-4"
                        />
                        <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
                            Beaura
                        </h1>
                    </div>

                    <div className="flex w-full flex-1 flex-col items-center justify-center gap-10">
                        <div className="relative w-full max-w-[600px]">
                            <Image
                                src="/assets/ai-haircuts.png"
                                width={800}
                                height={450}
                                alt="AI-powered haircuts"
                                className="h-auto w-full object-contain"
                            />
                        </div>
                        <div className="w-full text-center">
                            <p className="text-2xl font-normal leading-relaxed text-gray-50 drop-shadow-md">
                                An <span className="text-blue-300">AI-Powered</span> tool to help find the best haircut for you.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50">
                    <div className="flex w-full items-center justify-between border-b border-gray-300 px-4 py-4">
                        <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex w-full flex-1 items-center justify-center bg-white px-4">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginComponent;