import { type ThemeProviderProps } from 'next-themes'
import React, { FC, ReactElement } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }): ReactElement => {
    return (
        <NextThemesProvider {...props}>
            {children}
        </NextThemesProvider>
    )
}

export default ThemeProvider