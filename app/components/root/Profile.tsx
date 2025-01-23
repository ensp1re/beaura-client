'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { change } from "@/lib/reducers/uiSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/lib/store"
import { Heart, Share2 } from 'lucide-react'
import Image from "next/image"
import { useEffect } from "react";


interface PublicProfilePageProps {
    isMyProfile: boolean;
}

export default function ProfilePage({ isMyProfile }: PublicProfilePageProps) {

    const auth = useAppSelector((state: RootState) => state.auth.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        document.title = `${auth?.nickname || auth?.username} | Beaura`;
        dispatch(change("Profile"))
    }, [auth, dispatch])

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={
                                auth?.profilePicture
                                    ? auth.profilePicture
                                    : "/icons/placeholder.jpg"
                            } alt={
                                auth?.username
                            } />
                            <AvatarFallback>{
                                auth?.nickname || auth?.username.charAt(0).toUpperCase()
                            }</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                                <CardTitle>{
                                    auth?.nickname || auth?.username
                                }</CardTitle>
                                <Badge>{auth?.isPrivate ? "Private Profile" : "Public Profile"}</Badge>
                            </div>
                            <CardDescription className="text-base">@{auth?.username}</CardDescription>
                            <p className="text-muted-foreground">{auth?.bio}</p>
                        </div>
                        <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="transformations">
                        <TabsList>
                            <TabsTrigger value="transformations">Transformations</TabsTrigger>
                            <TabsTrigger value="liked">Liked</TabsTrigger>
                        </TabsList>
                        <TabsContent value="transformations" className="mt-6">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {auth?.transformations && auth.transformations
                                    .filter(transformation => isMyProfile || transformation.isPublic)
                                    .map((transformation) => (
                                        <Card key={transformation.id}>
                                            <CardContent className="p-0">
                                                <div className="relative aspect-square">
                                                    <Image
                                                        src={transformation.toImage || "/icons/placeholder.jpg"}
                                                        alt={transformation.title || "Transformation"}
                                                        fill
                                                        className="object-cover rounded-t-lg"
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold">{transformation.title}</h3>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Heart className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-sm text-muted-foreground">
                                                            {transformation.likes?.length || 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="liked">
                            {isMyProfile || !auth?.isPrivate ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    Liked transformations are private
                                </div>
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    This profile is private
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
