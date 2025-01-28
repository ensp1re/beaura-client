'use client'

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { ResetPasswordFormProps } from '@/interfaces/auth.interface';
import { resetPasswordScheme } from '@/lib/validations/auth.scheme';
import { useResetPasswordMutation } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, FC, ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ResetForm: FC = (): ReactElement => {

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isChanged, setIsChanged] = useState<boolean>(false);

    const [resetPassword] = useResetPasswordMutation();

    const token = useSearchParams().get('token');
    console.log(token);


    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(resetPasswordScheme),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data: ResetPasswordFormProps) => {
        setIsLoading(true);
        try {
            const response = await resetPassword({ data, token: token! });

            if (response) {
                setIsChanged(true);
                setIsLoading(false);
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
};




    return (
        <>
            {
                isChanged ? (
                    <>
                        <Image
                            src='/icons/success.svg'
                            alt='Success'
                            width={100}
                            height={100}
                        />
                        <h1 className='font-bold text-3xl self-start md:self-center text-start pt-3  text-gray-900'>
                            Password changed
                        </h1>
                        <p className='text-gray-500 self-start md:text-center pb-3'>
                            Your password has been successfully changed.
                        </p>
                        <Link className='max-w-[570px] text-white bg-gray-900 text-pretty w-full text-center p-3 rounded-xl hover:bg-gray-800 transition duration-300' href='/login'>
                            Back to login
                        </Link>
                    </>
                ) :
                    (

                        <><h1 className='font-bold text-3xl self-start md:self-center text-start  text-gray-900'>
                            Create new password
                        </h1><p className='text-gray-500 self-start md:text-center'>
                                Your new password must be unique from those previously used.
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[570px] space-y-3 pt-5 w-full mx-4 text-gray-600'>
                                <Input
                                    {...register('password')}
                                    value={password}
                                    onChange={(e: ChangeEvent) => setPassword((e.target as HTMLInputElement).value)}
                                    id='password'
                                    type='password'
                                    placeholder='New Password'
                                    className='w-full p-4 h-12 border placeholder:text-base border-gray-300 rounded-lg' />
                                {errors.password && (
                                    <p className='text-red-500 text-sm mt-1'>
                                        {errors.password.message}
                                    </p>
                                )}
                                <Input
                                    {...register('confirmPassword')}
                                    value={confirmPassword}
                                    onChange={(e: ChangeEvent) => setConfirmPassword((e.target as HTMLInputElement).value)}
                                    id='confirmPassword'
                                    type='password'
                                    placeholder='Confirm Password'
                                    className='w-full p-4 h-12 border placeholder:text-base border-gray-300 rounded-lg' />
                                {errors.confirmPassword && (
                                    <p className='text-red-500 text-sm mt-1'>
                                        {errors.confirmPassword.message}
                                    </p>
                                )}

                                <Button
                                    type='submit'
                                    disabled={!password || !confirmPassword || isLoading}
                                    className={`w-full p-4 h-12 text-base cursor-pointer rounded-lg ${!password || !confirmPassword || isLoading ? 'bg-gray-800 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900'}`}
                                >
                                    {isLoading ? <FaSpinner className='animate-spin' /> : 'Reset Password'}
                                </Button>
                            </form><p className='flex gap-2 text-gray-700'>
                                Don&apos;t have an account?
                                <Link className='text-sky-500 text-pretty' href='/register'>
                                    Sign Up
                                </Link>
                            </p>
                        </>
                    )
            }
        </>
    )
}

export default ResetForm;