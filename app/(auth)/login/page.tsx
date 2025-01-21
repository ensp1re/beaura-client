'use client';

import AlreadyLoggedIn from '@/app/components/AlreadyLoggedIn';
import LoginComponent from '@/app/components/auth/LoginComponent';
import { RootState, useAppSelector } from '@/lib/store';
import React, { FC, ReactElement, useEffect } from 'react'

const Login: FC = (): ReactElement => {


  const accessToken = useAppSelector((state: RootState) => state.auth.accessToken)
  const refreshToken = useAppSelector((state: RootState) => state.auth.refreshToken);



  useEffect(() => {
    document.title = 'Login | Beaura'
  }, [])

  if (refreshToken !== null || accessToken !== null) {
    return (
      <AlreadyLoggedIn />
    )
  }


  return (
    <LoginComponent />
  )
}

export default Login