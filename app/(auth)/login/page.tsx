'use client';

import LoginComponent from '@/app/components/auth/LoginComponent';
import React, { FC, ReactElement, useEffect } from 'react'

const Login: FC = (): ReactElement => {

  useEffect(() => {
    document.title = 'Login | Beaura'
  }, [])

  return (
    <LoginComponent />
  )
}

export default Login