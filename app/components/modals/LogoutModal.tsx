'use client';

import React, { FC, ReactElement } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/store';
import { logout } from '@/lib/reducers/authSlice';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';


interface LogoutModalProps {
    children: React.ReactNode;
}

const LogoutModal: FC<LogoutModalProps> = ({ children }): ReactElement => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const onLogout = (): void => {
        setIsLoading(true);
        setTimeout(() => {
            dispatch(logout());
            toast.success("Logged out successfully");
            router.push("/login");
            setIsLoading(false);
        }, 1000);

    };

    return (
        <Dialog >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Logout</DialogTitle>
                <DialogDescription>Are you sure you want to logout?</DialogDescription>

                <div className='flex justify-end space-x-4'>
                    <Button variant="destructive" onClick={() => {
                        onLogout();
                    }}>
                        {
                            isLoading ? <FaSpinner className='animate-spin' /> : "Logout"
                        }
                    </Button>
                    <DialogClose asChild>
                        <Button variant='ghost'>Cancel</Button>
                    </DialogClose>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default LogoutModal;