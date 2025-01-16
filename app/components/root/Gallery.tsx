'use client'

import { useEffect, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FullSizeImageModal } from "./FullSizeImageModal"
import { useAppDispatch } from '@/lib/store'
import { change } from '@/lib/reducers/uiSlice'
import { useRouter } from 'next/navigation'

interface GalleryItem {
    id: string
    type: string
    itemToReplace: string
    replaceWith: string
    exampleImage: string
    sex: string
}

export function GalleryComponent() {
    const galleryItems: GalleryItem[] = [
        {
            id: "1",
            type: "bald",
            itemToReplace: "I need to change the haircut of the person in the photo but don't change anything except hair",
            replaceWith: "Make the person in the photo bald by removing only their hair keeping all other facial details such as skin texture tone and facial expression exactly as shown in the original Ensure the bald head looks smooth realistic and naturally blended with the face Make the bald head visually appealing and evenly textured for a polished look",
            exampleImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF-ts8ef0ULc3wXS7uMqNbMbMl0sspMzxObsJIL8tobMq1h3LyZ1GMjyUTSfljpiiiRJs&usqp=CAU",
            sex: "male",
        },
        {
            id: "2",
            type: "curly",
            itemToReplace: "I need to change the haircut of the person in the photo but don't change anything except hair",
            replaceWith: "Make the person in the photo bald by removing only their hair keeping all other facial details such as skin texture tone and facial expression exactly as shown in the original Ensure the bald head looks smooth realistic and naturally blended with the face Make the bald head visually appealing and evenly textured for a polished look",
            exampleImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF-ts8ef0ULc3wXS7uMqNbMbMl0sspMzxObsJIL8tobMq1h3LyZ1GMjyUTSfljpiiiRJs&usqp=CAU",
            sex: "male"
        },
        {
            id: "3",
            type: "straight",
            itemToReplace: "I need to change the haircut of the person in the photo but don't change anything except hair",
            replaceWith: "Make the person in the photo have straight hair by changing only their hair keeping all other facial details such as skin texture tone and facial expression exactly as shown in the original Ensure the straight hair looks smooth realistic and naturally blended with the face Make the straight hair visually appealing and evenly textured for a polished look",
            exampleImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF-ts8ef0ULc3wXS7uMqNbMbMl0sspMzxObsJIL8tobMq1h3LyZ1GMjyUTSfljpiiiRJs&usqp=CAU",
            sex: "female"
        },
        {
            id: "4",
            type: "wavy",
            itemToReplace: "I need to change the haircut of the person in the photo but don't change anything except hair",
            replaceWith: "Make the person in the photo have wavy hair by changing only their hair keeping all other facial details such as skin texture tone and facial expression exactly as shown in the original Ensure the wavy hair looks smooth realistic and naturally blended with the face Make the wavy hair visually appealing and evenly textured for a polished look",
            exampleImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF-ts8ef0ULc3wXS7uMqNbMbMl0sspMzxObsJIL8tobMq1h3LyZ1GMjyUTSfljpiiiRJs&usqp=CAU",
            sex: "female"
        },
        {
            id: "5",
            type: "buzzcut",
            itemToReplace: "I need to change the haircut of the person in the photo but don't change anything except hair",
            replaceWith: "Make the person in the photo have a buzzcut by changing only their hair keeping all other facial details such as skin texture tone and facial expression exactly as shown in the original Ensure the buzzcut looks smooth realistic and naturally blended with the face Make the buzzcut visually appealing and evenly textured for a polished look",
            exampleImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF-ts8ef0ULc3wXS7uMqNbMbMl0sspMzxObsJIL8tobMq1h3LyZ1GMjyUTSfljpiiiRJs&usqp=CAU",
            sex: "male"
        }
    ]

    const [typeFilter, setTypeFilter] = useState<string>("all")
    const [sexFilter, setSexFilter] = useState<string>("all")

    const dispatch = useAppDispatch();

    const router = useRouter();

    useEffect(() => {
        dispatch(change("Gallery"))
    }, [dispatch])

    const filteredItems = galleryItems.filter(item =>
        (typeFilter === "all" || item.type === typeFilter) &&
        (sexFilter === "all" || item.sex === sexFilter)
    )

    const uniqueTypes = Array.from(new Set(galleryItems.map(item => item.type)))

    return (
        <div className="container mx-auto p-6">
            <div className="flex gap-4 mb-6">
                <Select onValueChange={(value) => setTypeFilter(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {uniqueTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={(value) => setSexFilter(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by sex" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="capitalize">{item.type} Style</CardTitle>
                                <Badge variant="secondary">{item.sex}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <FullSizeImageModal
                                src={item.exampleImage}
                                alt={`${item.type} hairstyle example`}
                                className="aspect-square"
                            />
                            <div className="p-4">
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {item.itemToReplace}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href={`/preview-transformation/${item.id}`}>
                                <Button variant="outline" size="sm">
                                    Preview
                                </Button>
                            </Link>
                            <Button
                                onClick={() => router.push(`/transformation/haircut?prompt=${encodeURIComponent(item.replaceWith)}`)}
                                size="sm" className="gap-2">
                                <Download className="h-4 w-4" />
                                Use Template
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

