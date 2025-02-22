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
import { Circle, Heart } from 'lucide-react'
import { useEffect, useState } from "react"
import Link from 'next/link'
import { TransformationCard } from "@/app/components/root/TransformationCard"
import { RootState, useAppSelector } from "@/lib/store"
import { IAuthRedux } from "@/interfaces/auth.interface"
import { useGetLikedByUserTransformationsQuery } from "@/services/transformation.service"
import { v4 as uuidv4 } from 'uuid'
import { ITransformationData } from "@/interfaces/root.interface"


export interface ILikedInfo {
    id: string;
    title: string;
    image: string;
    likes: number;
}

export default function WorkspaceHeader() {
    const [activeSection, setActiveSection] = useState<string | null>(null)

    const auth = useAppSelector((state: RootState) => state.auth.user)
    const [user, setUser] = useState<IAuthRedux | null>(null);

    const [filteredLikedInfo, setFilteredLikedInfo] = useState<ILikedInfo[] | null>(null)


    const {
        data: likedTransformationsData,
        isLoading: likedTransformationsLoading,
    } = useGetLikedByUserTransformationsQuery(auth?._id || '', { skip: !auth })

    console.log(likedTransformationsData)

    useEffect(() => {
        setUser(auth);
    }, [auth])

    useEffect(() => {
        if (likedTransformationsData) {
            const newData: ILikedInfo[] = likedTransformationsData.map((item: ITransformationData) => ({
                id: item._id,
                title: item.title,
                image: item.toImage,
                likes: item.likes?.length || 0,
            }));
            setFilteredLikedInfo(newData);
        }
    }, [likedTransformationsData])


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



                        {
                            likedTransformationsLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-muted-foreground">
                                        <Circle className="animate-spin h-5 w-5 mr-2" />
                                    </p>
                                </div>
                            ) : (
                                filteredLikedInfo?.length === 0 ? (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-muted-foreground">No liked transformations</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-4 py-4">
                                        {filteredLikedInfo?.map((liked: ILikedInfo) => (
                                            <TransformationCard key={uuidv4()} transformation={liked} />
                                        ))}
                                    </div>
                                )
                            )
                        }

                    </SheetContent>
                </Sheet>



                {/* User Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={user?.profilePicture || "/icons/placeholder.jpg"}
                                    alt="Profile"
                                    onError={(e) => (e.currentTarget.src = "/icons/placeholder.jpg")}
                                />
                                <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56" onClick={() => setActiveSection(null)}>
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-2 gap-1">
                                {((user?.nickname || user?.username || 'Guest').charAt(0).toUpperCase() + (user?.nickname || user?.username || 'Guest').slice(1))}
                                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
                            <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
                            <Link href="/settings">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
                            <Link href={"/billing"}>
                                Billing
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

