/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IAuthRedux, RegisterFormProps } from '@/interfaces/auth.interface';
import { loginWithGoogle } from '@/lib/firebase';
import { login } from '@/lib/reducers/authSlice';
import { useAppDispatch } from '@/lib/store';
import { saveToSessionStorage } from '@/lib/utils';
import { registerScheme } from '@/lib/validations/auth.scheme';
import { useGoogleLoginMutation, useSignUpMutation } from '@/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FC, ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify';

const RegisterForm: FC = (): ReactElement => {
    const [type, setType] = useState<string>("password");
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [registerMutation, { isLoading, isError, isSuccess }] = useSignUpMutation();
    const [googleMutation] = useGoogleLoginMutation();
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const router = useRouter();

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

    const onSubmit = async (data: RegisterFormProps) => {
        try {
            const { confirmPassword, ...toRegister } = data;
            const response = await registerMutation(toRegister).unwrap();

            if (response) {
                toast.success((response.message || 'Registration successful') as string);
                const user = response.user;

                if (response?.refreshToken) {
                    saveToSessionStorage(
                        JSON.stringify(true),
                        JSON.stringify(response.refreshToken)
                    );
                } else {
                    toast.error("Failed to save refresh token!");
                }

                const reduxData: IAuthRedux = {
                    _id: user?._id || null,
                    username: user?.username,
                    email: user?.email,
                    role: user?.role,
                    status: user?.status,
                };
                dispatch(login({
                    user: reduxData,
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken,
                }));

                router.push("/home");
            } else {
                toast.error("Something went wrong!");
            }
        } catch (err) {
            console.log(err);
            const error = err as { data: { message: string } };
            toast.error(`${error.data.message}`);
        }
    };


    const handleGoogleLogin = async (): Promise<void> => {
        try {
            setIsGoogleLoading(true);
            const idToken: string = await loginWithGoogle();
            const response = await googleMutation(idToken).unwrap();
            if (response) {
                toast.success((response.message || 'Login successful') as string)
                const user = response.user;
                saveToSessionStorage(
                    JSON.stringify(true),
                    JSON.stringify(user?.username)
                );
                const reduxData: IAuthRedux = {
                    _id: user?._id || null,
                    username: user?.username,
                    email: user?.email,
                    role: user?.role,
                    status: user?.status,
                }
                dispatch(login({
                    user: reduxData,
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken,
                }));

                router.push("/home")
            } else {
                toast.error("Something went wrong!")
                console.log(response)
            }

        } catch (error) {
            console.log('Login failed', error)
        } finally {
            setIsGoogleLoading(false);
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-96 space-y-3 mx-2 text-gray-600'>
            <h2 className='text-xl font-semibold text-center mb-1 mt-1'>Create an account</h2>
            <div className='flex flex-col space-y-4 mb-4'>
                <div
                    onClick={handleGoogleLogin}
                    className='flex w-full items-center justify-center gap-2 py-3 px-8 border border-gray-300 rounded-full bg-white cursor-pointer transition duration-300 hover:bg-gray-50'>

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
            <Button
                disabled={isLoading || isGoogleLoading || !email || !username || !password || !confirmPassword}
                className={
                    `w-full h-full bg-gray-800 text-white rounded-full text-center text-base font-semibold hover:bg-gray-700 ${isLoading || isGoogleLoading || !email || !username || !password || !confirmPassword ? 'cursor-not-allowed bg-gray-400' : ''} transition duration-300`
                }>
                {
                    isLoading || isGoogleLoading ? (
                        <FaSpinner className='animate-spin m-2' />
                    ) : (
                        <span className='p-1'>Sign Up</span>
                    )
                }
            </Button>
            <hr className='w-full border-gray-300 mx-2' />

            <div className='w-full text-center'>
                <p className='pb-1 text-gray-500 text-base'>

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