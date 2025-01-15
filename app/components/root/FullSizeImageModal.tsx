'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface FullSizeImageModalProps {
    src: string
    alt: string
    className?: string
}

export function FullSizeImageModal({ src, alt, className }: FullSizeImageModalProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className={cn("relative cursor-pointer", className)}>
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="flex items-center justify-center bg-transparent border-0 text-white w-full h-full">
                <DialogTitle className='w-full h-full relative'></DialogTitle>
                <div className="relative w-screen h-screen" style={{ aspectRatio: '1 / 1' }}>
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-contain"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

