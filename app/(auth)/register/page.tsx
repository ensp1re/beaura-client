'use client';

import AlreadyLoggedIn from '@/app/components/AlreadyLoggedIn';
import RegisterComponent from '@/app/components/auth/RegisterComponent';
import { RootState, useAppSelector } from '@/lib/store';
import React, { FC, ReactElement, useEffect } from 'react'

const Register: FC = (): ReactElement => {

  const accessToken = useAppSelector((state: RootState) => state.auth.accessToken)
  const refreshToken = useAppSelector((state: RootState) => state.auth.refreshToken);



  useEffect(() => {
    document.title = 'Register | Beaura'
  }, [])

  if (refreshToken !== null || accessToken !== null) {
    return (
      <AlreadyLoggedIn />
    )
  }


  return (
    <RegisterComponent />
  )
}

export default Register