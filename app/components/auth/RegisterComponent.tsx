import Image from 'next/image';
import React, { FC, ReactElement } from 'react'
import RegisterForm from './RegisterForm';

const RegisterComponent: FC = (): ReactElement => {
    return (
        <>
            <div className="flex-1 hidden md:flex flex-col items-center justify-between h-screen w-full bg-gradient-to-br from-gray-400 to-gray-600 p-6">
                <div className="w-full flex items-center justify-center pt-8">
                    <Image
                        src="/assets/beaura.png"
                        width={50}
                        height={50}
                        alt="Beaura logo"
                        className="mr-4"
                    />
                    <h1 className="text-5xl text-white font-extrabold tracking-tight drop-shadow-lg">
                        Beaura
                    </h1>
                </div>

                <div className="flex-1 flex flex-col gap-10 items-center justify-center w-full">
                    <div className="relative w-full max-w-[600px]">
                        <Image
                            src="/assets/ai-haircuts.png"
                            layout="responsive"
                            width={800}
                            height={450}
                            alt="AI-powered haircuts"
                        />
                    </div>
                    <div className="w-full text-center">
                        <p className="text-2xl text-gray-50 font-normal leading-relaxed drop-shadow-md">
                            An <span className="text-blue-300">AI-Powered</span> tool to help find the best haircut for you.
                        </p>
                    </div>
                </div>


            </div>
            <div className='flex-1 w-full h-full flex-col items-center justify-center bg-gray-50'>
                <div className="flex items-center justify-between w-full px-4 py-4 border-b border-gray-300">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
                <div className='w-full flex bg-white items-center justify-center px-4'>
                    <RegisterForm />
                </div>
            </div>
        </>
    )
}

export default RegisterComponent;