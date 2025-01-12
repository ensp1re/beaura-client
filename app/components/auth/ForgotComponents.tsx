import React, { FC, ReactElement } from 'react'
import ForgotForm from './ForgotForm'
import Link from 'next/link'

const ForgotComponents: FC = (): ReactElement => {
    return (
        <div className='flex flex-col items-center justify-center space-y-3 px-3'>
            <h1 className='font-bold text-3xl self-start md:self-center text-start  text-gray-900'>
                Forgot Password?
            </h1>
            <p className='text-gray-500 self-start md:text-center'>
                Don&apos;t worry! It occurs. Please enter the email address linked with your account.
            </p>
            <ForgotForm />
            <p className='flex gap-2 text-gray-700'>
                Remember your password?
                <Link className='text-sky-500 text-pretty' href='/login'>
                    Login
                </Link>
            </p>
        </div>
    )
}

export default ForgotComponents