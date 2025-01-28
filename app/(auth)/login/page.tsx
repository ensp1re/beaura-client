'use client';

import AlreadyLoggedIn from '@/app/components/AlreadyLoggedIn';
import LoginComponent from '@/app/components/auth/LoginComponent';
import { RootState, useAppSelector } from '@/lib/store';
import React, { FC, ReactElement, useEffect } from 'react'

const Login: FC = (): ReactElement => {


  const accessToken = useAppSelector((state: RootState) => state.auth.accessToken)
  const refreshToken = useAppSelector((state: RootState) => state.auth.refreshToken);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);


  useEffect(() => {

    document.addEventListener('DOMContentLoaded', () => {
      setIsLoading(false);
    });

    document.title = 'Login | Beaura'
  }, [])

  if (refreshToken !== null || accessToken !== null || !isLoading) {
    return (
      <AlreadyLoggedIn />
    )
  }


  return (
    <LoginComponent />
  )
}

export default Login