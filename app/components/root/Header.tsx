'use client'

import { Button } from '@/components/ui/button'
import { toggle } from '@/lib/reducers/uiSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/lib/store'
import { Menu } from 'lucide-react'
import React, { FC, ReactElement } from 'react'
import WorkspaceHeader from './sheets/HeaderSheets'

const Header: FC = (): ReactElement => {


    const dispatch = useAppDispatch();

    const header = useAppSelector((state: RootState) => state.ui.headerName);

    return (
        <div className="sticky top-0 z-40 p-3 bg-background border-b">
            <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => dispatch(toggle())}>
                    <Menu className="h-6 w-6" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-base md:text-2xl font-semibold">{header}</h1>
                </div>

                <div className="flex items-center gap-4">
                    <WorkspaceHeader />
                </div>
            </div>
        </div>
    )
}

export default Header