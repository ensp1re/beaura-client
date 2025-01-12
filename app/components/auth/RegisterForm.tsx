'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RegisterFormProps } from '@/interfaces/auth.interface';
import { registerScheme } from '@/lib/validations/auth.scheme';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link'
import React, { ChangeEvent, FC, ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const RegisterForm: FC = (): ReactElement => {


    const [type, setType] = useState<string>("password");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');


    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerScheme),
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = (data: RegisterFormProps) => {
        setIsLoading(true);
        setTimeout(() => {
            console.log(data);
            setIsLoading(false);
        }, 2000);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-96 space-y-4 mx-4 text-gray-600'>
            <h2 className='text-xl font-semibold text-center mb-2 mt-5'>Create an account</h2>
            <div className='flex flex-col space-y-4 mb-4'>
                <div className='flex w-full items-center justify-center gap-2 py-3 px-8 border border-gray-300 rounded-full bg-white cursor-pointer transition duration-300 hover:bg-gray-50'>
                    <FcGoogle className='text-2xl' />
                    Continue with Google
                </div>
            </div>
            <div className='flex items-center justify-center pt-1 pb-1'>
                <hr className='w-full border-gray-300' />
                <span className='px-2 text-gray-500'> OR </span>
                <hr className='w-full border-gray-300' />
            </div>
            <div className='space-y-4'>
                <div>
                    <Label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                        Email
                    </Label>
                    <Input
                        value={email}
                        {...register('email')}
                        onChange={(e: ChangeEvent) => setEmail((e.target as HTMLInputElement).value)}
                        id='email'
                        type='email'
                        placeholder='Email'
                        className='mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
                    />
                    {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
                </div>
                <div>
                    <Label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                        Username
                    </Label>
                    <Input
                        {...register('username')}
                        id='username'
                        type='text'
                        value={username}
                        onChange={(e: ChangeEvent) => setUsername((e.target as HTMLInputElement).value)}
                        placeholder='Username'
                        className='mt-1 block w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
                    />
                    {errors.username && <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>}
                </div>
                <div>
                    <Label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                        Password
                    </Label>
                    <div className='relative'>
                        <Input
                            {...register('password')}
                            value={password}
                            onChange={(e: ChangeEvent) => setPassword((e.target as HTMLInputElement).value)}
                            id={'password'}
                            type={type}
                            placeholder='Password'
                            className='mt-1 mb-2 relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
                        />
                        <span className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
                            {
                                type === 'password' ?
                                    <FaEye
                                        onClick={() => setType('text')}
                                        className='text-gray-500 cursor-pointer'
                                    />
                                    :
                                    <FaEyeSlash
                                        onClick={() => setType('password')}
                                        className='text-gray-500 cursor-pointer'
                                    />
                            }
                        </span>
                    </div>
                    {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                </div>
                <div>
                    <Label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
                        Confirm Password
                    </Label>
                    <div className='relative'>
                        <Input
                            id='confirmPassword'
                            type={type}
                            {...register('confirmPassword')}
                            value={confirmPassword}
                            onChange={(e: ChangeEvent) => setConfirmPassword((e.target as HTMLInputElement).value)}
                            placeholder='Confirm Password'
                            className='mt-1 mb-2 relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
                        />
                    </div>
                    {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
                </div>
            </div>
            <Button className={
                `w-full h-full bg-gray-800 text-white rounded-full text-center text-base font-semibold hover:bg-gray-700 ${isLoading ? 'cursor-not-allowed bg-gray-400' : ''} transition duration-300`
            }>
                {
                    isLoading ? (
                        <FaSpinner className='animate-spin m-2' />
                    ) : (
                        <span className='p-1'>Sign Up</span>
                    )
                }

            </Button>
            <hr className='w-full border-gray-300 mx-2' />

            <div className='w-full text-center'>
                <p className='pb-2 text-gray-500 text-base'>

                    Already have an account?
                </p>
                <Link
                    className='w-full inline-block bg-white border border-gray-400 rounded-full text-center text-sm font-semibold py-3 hover:bg-gray-50 transition duration-300 cursor-pointer'
                    href={'/login'}
                >
                    Log In
                </Link>
            </div>

        </form >
    )
}

export default RegisterForm;