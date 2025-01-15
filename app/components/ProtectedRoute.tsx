'use client';

import { IAuthRedux } from '@/interfaces/auth.interface';
import { login } from '@/lib/reducers/authSlice';
import { useAppDispatch } from '@/lib/store';
import React, { FC, ReactElement, ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom';


interface IProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }): ReactElement => {

    const dispatch = useAppDispatch();

    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);



    useEffect(() => {

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        const data: IAuthRedux = {
            _id: "1",
            username: "test",
            email: "test@example.com",
            role: "free",
        }
        setIsAuthenticated(true);
        dispatch(login(data));
    }, [dispatch])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500">
                </div>
            </div>
        )
    }

    if (!isAuthenticated && !isLoading) {
        <Navigate to="/login" />
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute