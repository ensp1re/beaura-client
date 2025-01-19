'use client';

import RegisterComponent from '@/app/components/auth/RegisterComponent';
import { RootState, useAppSelector } from '@/lib/store';
import React, { FC, ReactElement, useEffect } from 'react'

const Register: FC = (): ReactElement => {

  const auth = useAppSelector((state: RootState) => state.auth.user)



  useEffect(() => {
    document.title = 'Register | Beaura'

    if (auth !== null) {
      window.location.href = '/home'
    }

  }, [auth])

  return (
    <RegisterComponent />
  )
}

export default Register