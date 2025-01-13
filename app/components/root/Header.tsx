'use client'

import { Button } from '@/components/ui/button'
import { toggle } from '@/lib/reducers/uiSlice'
import { useAppDispatch } from '@/lib/store'
import { Download, Menu, MoreHorizontal, Star } from 'lucide-react'
import Image from 'next/image'
import React, { FC, ReactElement } from 'react'

const Header: FC = (): ReactElement => {


    const dispatch = useAppDispatch();

    return (
        <div className="sticky top-0 z-40 bg-background border-b">
            <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => dispatch(toggle())}>
                    <Menu className="h-6 w-6" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold">Workspace</h1>
                    <p className="text-sm text-muted-foreground">Gallery</p>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <Star className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Download className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                    <div className="h-8 w-8 overflow-hidden rounded-full">
                        <Image
                            src="https://avatars.githubusercontent.com/u/58823075?v=4"
                            alt="Profile"
                            width={32}
                            height={32}
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header