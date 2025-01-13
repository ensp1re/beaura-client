import Fonts from '@/lib/fonts'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, ReactElement } from 'react'

const NotFoundComponent: FC = (): ReactElement => {
    return (
        <div className={`grid h-screen w-full grid-cols-1 md:grid-cols-2 ${Fonts.raleway.className}`}>
            <div className='relative hidden md:flex items-center justify-center overflow-hidden'>
                <Image
                    src="/assets/seeker.png"
                    width={1920}
                    height={1080}
                    className='h-auto w-full object-contain'
                    alt="Page not found"
                />
            </div>
            <div className='flex flex-col items-center justify-center space-y-3 px-2'>
                <h1 className={`text-[200px] font-bold text-gray-800 ${Fonts.concertOne.className}`}>
                    404
                </h1>
                <p className='flex flex-col items-center justify-center text-4xl text-gray-400'>
                    <span>
                        OOOps!<br />
                    </span>
                    Page Not Found
                </p>
                <span className='pb-3 pt-3 text-center text-gray-500'>
                    This page doesn&apos;t exist or was removed!
                    <br />
                    We suggest you back to home
                </span>
                <Link href='/' className='px-28 bg-gray-900 p-3 text-center text-white transition duration-300 hover:bg-gray-800'>
                    Back to Home
                </Link>
            </div>
        </div>
    )
}

export default NotFoundComponent