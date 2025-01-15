'use client'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Heart } from 'lucide-react'
import { useState } from "react"
import Link from 'next/link'
import { TransformationCard } from "@/app/components/root/TransformationCard"

// Sample data (in a real app, this would come from an API)
const likedTransformations = [
    { id: 1, title: "Summer Style", image: "/placeholder.svg", likes: 234, downloads: 45 },
    { id: 2, title: "Casual Look", image: "/placeholder.svg", likes: 187, downloads: 32 },
]

const downloadedTransformations = [
    { id: 3, title: "Professional Cut", image: "/placeholder.svg", likes: 456, downloads: 89 },
    { id: 4, title: "Modern Style", image: "/placeholder.svg", likes: 321, downloads: 67 },
]

export default function WorkspaceHeader() {
    const [activeSection, setActiveSection] = useState<string | null>(null)

    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
                {/* Logo or other header content */}
            </div>
            <div className="flex items-center gap-2">
                {/* Liked Transformations */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setActiveSection('liked')}>
                            <Heart className={`h-5 w-5 ${activeSection === 'liked' ? 'fill-primary text-primary' : ''}`} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[400px] sm:w-[540px] h-full overflow-y-auto">

                        <SheetHeader>
                            <SheetTitle>Liked Transformations</SheetTitle>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            {likedTransformations.map((transform) => (
                                <TransformationCard key={transform.id} transformation={transform} />
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Downloaded Transformations */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setActiveSection('downloads')}>
                            <Download className={`h-5 w-5 ${activeSection === 'downloads' ? 'text-primary' : ''}`} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[400px] sm:w-[540px] h-full overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Downloaded Transformations</SheetTitle>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            {downloadedTransformations.map((transform) => (
                                <TransformationCard key={transform.id} transformation={transform} />
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://avatars.githubusercontent.com/u/58823075?v=4" alt="Profile" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">John Doe</p>
                                <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link href="/profile/alex">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/settings">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

