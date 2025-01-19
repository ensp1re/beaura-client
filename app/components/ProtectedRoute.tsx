'use client';

import { logout, updateUser } from '@/lib/reducers/authSlice';
import { RootState, useAppDispatch, useAppSelector } from '@/lib/store';
import { saveToSessionStorage } from '@/lib/utils';
// import { RootState, useAppSelector } from '@/lib/store';
import { useCheckAuthenticationQuery } from '@/services/auth.service';
import React, { FC, ReactElement, ReactNode, useEffect } from 'react'


interface IProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }): ReactElement => {

    const auth = useAppSelector((state: RootState) => state.auth.user)

    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const dispatch = useAppDispatch();


    const { data, isError, isLoading: isDataLoading, status } = useCheckAuthenticationQuery(undefined, {
        skip: auth?._id === null,
    });




    useEffect(() => {
        setIsLoading(true);
        if (data && data.data && status === "fulfilled" && !isDataLoading && !isError) {
            setIsAuthenticated(true);
            console.log(data)
            dispatch(updateUser(
                data.data
            ))
            setIsLoading(false);
            saveToSessionStorage(
                JSON.stringify(true),
                JSON.stringify(data.username),
            );
        }

        if (isError) {
            setIsLoading(false);
            setIsAuthenticated(false);
            dispatch(logout());
        }


    }, [data, dispatch, isDataLoading, isError, status]);



    if (isLoading || status === "pending") {
        return (
            <div suppressHydrationWarning className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full z-2 h-12 w-12 border-t-2 border-b-4 dark:border-gray-300">
                </div>
            </div>
        );
    }

    if (!isAuthenticated && !isLoading && !isDataLoading) {
        window.location.href = '/login';
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute