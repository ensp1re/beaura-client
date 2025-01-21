'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { images as filterImage } from '@/constants/constants'
import { IImageHome } from '@/interfaces/root.interface'
import { change } from '@/lib/reducers/uiSlice';
import { useAppDispatch } from '@/lib/store';
import { Filter, Heart, Search, Share } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { FC, ReactElement, useEffect } from 'react'

const Home: FC = (): ReactElement => {

    // just placeholders
    const filters = [
        "By date",
        "By likes",
        "By name",
    ]


    const [images, setImages] = React.useState<IImageHome[]>(filterImage);

    const router = useRouter();


    const dispatch = useAppDispatch();

    useEffect(() => {
        document.title = "Home | BeAura"
        dispatch(change("Home"))
    }, [dispatch])




    const handleImageLike = (id: number) => {
        // handle like
        try {
            console.log(id)
            setTimeout(() => {
                setImages((prevImages) => {
                    return prevImages.map((image) => {
                        if (image.id === id) {
                            return {
                                ...image,
                                likes: image.likes + 1
                            }
                        }
                        return image
                    })
                })
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div suppressHydrationWarning className="p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search"
                            className="pl-9"
                        />
                    </div>
                    <Select>
                        <SelectTrigger className="w-full flex items-center gap-2 sm:w-auto">
                            <Filter className="h-4 w-4" />
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem key={"all"} value="all">All</SelectItem>
                            {filters.map((filter) => (
                                <SelectItem key={filter} value={filter}>
                                    {filter}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {filters.map((filter) => (
                        <Button
                            key={filter}
                            variant="outline"
                            className="rounded-full"
                            size="sm"
                        >
                            {filter}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                {images.map((image: IImageHome) => (
                    <div
                        key={image.id}
                        onClick={
                            () => router.push(`/preview-transformation/${image.id}`)
                        }
                        className="break-inside-avoid cursor-pointer mb-4 group relative overflow-hidden rounded-lg bg-background transition-all duration-300 hover:shadow-lg"
                    >
                        <div
                            className="relative w-full"
                            style={{ height: image.height }}
                        >
                            <Image
                                src={image.src}
                                alt="Gallery image"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center gap-2" onClick={(e) => { e.stopPropagation(); router.push(`/profile/${(image.user).toLowerCase()}`); }}>
                                        <Avatar className="h-6 w-6 cursor-pointer">
                                            <AvatarImage src="/assets/placeholder.jpg" />
                                            <AvatarFallback>NT</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium cursor-pointer">{image.user}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => { e.stopPropagation(); handleImageLike(image.id as number); }}
                                            className="flex items-center w-12 gap-1 transition-transform duration-300 hover:scale-110"
                                        >
                                            <Heart className="h-2 w-2" />
                                            {image.likes}
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); }}>
                                            <Share className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Home