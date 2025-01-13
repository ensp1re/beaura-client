'use client';

import { Button } from '@/components/ui/button';
import { LogOut, Star, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { FC, ReactElement } from 'react'
import { navLinks } from '@/constants/constants';
import { NavLink } from '@/interfaces/root.interface';
import Image from 'next/image';
import Link from 'next/link';
import { RootState, useAppDispatch, useAppSelector } from '@/lib/store';
import { toggle } from '@/lib/reducers/uiSlice';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

const Sidebar: FC = (): ReactElement => {

    const pathname = usePathname();

    const isOpen = useAppSelector((state: RootState) => state.ui.isOpen);


    const dispatch = useAppDispatch();

    const toggleBtn = () => {
        dispatch(toggle());
    };


    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden",
                    isOpen ? "block" : "hidden"
                )}
                onClick={toggleBtn}
            />
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:shadow-none",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between mb-6">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/assets/beaura.png"
                            alt="BeauraAI"
                            width={32}
                            height={32} />
                        <span className="text-xl font-bold">BeauraAI</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={toggleBtn} className="lg:hidden">
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                <Button variant="default" className="w-full mb-6">
                    <Star className="w-4 h-4 mr-2" />
                    Create
                </Button>

                <nav className="space-y-2">
                    {navLinks.map((item: NavLink) => {
                        const IconComponent = item.icon
                        return (
                            <Link
                                key={item.title}
                                href={item.href as string}
                                className={cn(
                                    "flex items-center px-2 py-2 rounded-md transition-colors",
                                    pathname === item.href
                                        ? "bg-accent text-accent-foreground"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <IconComponent className="w-5 h-5 mr-3" />
                                <span className="text-sm font-medium">{item.title}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <Button variant="ghost" className="w-full justify-start mb-4">
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
        </>

    )
}

export default Sidebar