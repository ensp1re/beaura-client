'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { ChangeEvent, FC, ReactElement, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { forgotPasswordScheme } from '@/lib/validations/auth.scheme';
import { yupResolver } from '@hookform/resolvers/yup';

interface ForgotFormProps {
    email: string;
}

const ForgotForm: FC = (): ReactElement => {

    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = (data: ForgotFormProps) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            console.log(data);
            toast.success('Successfully');
        }, 2000);
    };

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(forgotPasswordScheme),
        defaultValues: {
            email: ''
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-[570px] pt-5 w-full space-y-6 mx-4 text-gray-600'>
            <Input
                {...register('email')}
                value={email}
                onChange={(e: ChangeEvent) => setEmail((e.target as HTMLInputElement).value)}
                id='email'
                type='email'
                placeholder='Email'
                className='w-full p-4 h-12 border placeholder:text-base border-gray-300 rounded-lg'
            />
            {errors.email && (
                <p className='text-red-500 text-sm mt-1'>
                    {errors.email.message}
                </p>
            )}
            <Button
                type='submit'
                disabled={!email || isLoading}
                className={`w-full p-4 h-12 text-base cursor-pointer rounded-lg ${!email ? 'bg-gray-800 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-900'}`}
            >
                {
                    isLoading ? <FaSpinner className='animate-spin' /> : 'Send'
                }
            </Button>
        </form>
    )
}

export default ForgotForm;