'use client';

import LoginComponent from '@/app/components/auth/LoginComponent';
import { RootState, useAppSelector } from '@/lib/store';
import React, { FC, ReactElement, useEffect } from 'react'

const Login: FC = (): ReactElement => {


  const auth = useAppSelector((state: RootState) => state.auth.user)



  useEffect(() => {
    document.title = 'Login | Beaura'

    if (auth !== null) {
      window.location.href = '/home'
    }

  }, [auth])

  return (
    <LoginComponent />
  )
}

export default Login