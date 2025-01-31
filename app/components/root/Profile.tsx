/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { change } from "@/lib/reducers/uiSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/lib/store"
import { useGetUserByUsernameQuery } from "@/services/users.service";
import { Heart, Share2 } from 'lucide-react'
import Image from "next/image"
import { useParams, useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import LightWaveLoading from "../WaveLoading";
import { ITransformationData } from "@/interfaces/root.interface";
import { v4 as uuidv4 } from 'uuid'
import { useGetLikedByUserTransformationsQuery } from "@/services/transformation.service";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";




export default function ProfilePage(): ReactElement {

    const [isMyProfile, setIsMyProfile] = useState<boolean>(false)
    const [transformations, setTransformations] = useState<ITransformationData[]>([])
    const [userLikedTransformations, setUserLikedTransformations] = useState<ITransformationData[]>([])
    const [dataUser, setDataUser] = useState<any | null>(null);
    const [isSharing, setIsSharing] = useState<boolean>(false);

    const router = useRouter();

    const { username } = useParams()

    console.log(username)

    const auth = useAppSelector((state: RootState) => state.auth.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (dataUser) {
            document.title = `${dataUser?.username.charAt(0).toUpperCase() + dataUser?.username.slice(1)} | Beaura`;
        } else if (!dataUser && !isLoading) {
            document.title = "Not Found | Beaura";
        }
        dispatch(change("Profile"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUser, dispatch]);


    const { data: user, isLoading } = useGetUserByUsernameQuery(username as string)

    const { data: likedTransformations, isLoading: isLikedDataLoading } = useGetLikedByUserTransformationsQuery(dataUser?._id, {
        skip: !dataUser?._id
    })



    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filterTransformations = (transformations: ITransformationData[]): ITransformationData[] => {
        if (isMyProfile) {
            return transformations;
        } else {
            return transformations.filter(transformation => transformation.isPublic);
        }
    };

    useEffect(() => {
        if (user) {
            setDataUser(user)
            setTransformations(filterTransformations(user.transformations))
        }
    }, [filterTransformations, user])

    useEffect(() => {
        if (likedTransformations) {
            setUserLikedTransformations(likedTransformations)
        }
    }, [likedTransformations])



    useEffect(() => {
        if (username) {
            setIsMyProfile(username === auth?.username)
        }
    }, [auth?.username, username])


    const handleShareProfile = async (): Promise<void> => {
        try {
            setIsSharing(true)
            setTimeout(() => {
                navigator.clipboard.writeText(`${window.location.origin}/profile/${dataUser?.username}`)
                toast.success("Url copied to clipboard")
                setIsSharing(false)
            }, 1000)

        } catch (error) {
            console.error(error)
            toast.error("Error sharing profile")
            setIsSharing(false)
        }
    };


    return (
        <div className={`container mx-auto p-4 ${`${!dataUser && !isLoading ? "h-full" : ""}`}`}>
            <Card className={
                `${!dataUser && !isLoading ? "flex justify-center items-center h-full" : ""}`
            }>

                {
                    !dataUser && !isLoading ? (
                        <div className="text-center py-12 text-muted-foreground">
                            User not found
                        </div>
                    ) : (
                        <>
                            <CardHeader className="">
                                {isLoading ? (
                                    <LightWaveLoading className="h-48 rounded-t-lg" />
                                ) : (
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                        <Avatar className="w-24 h-24">
                                            <AvatarImage
                                                src={dataUser?.profilePicture ? dataUser.profilePicture : "/icons/placeholder.jpg"}
                                                alt={dataUser?.username}
                                            />
                                            <AvatarFallback>{dataUser?.nickname || dataUser?.username.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <CardTitle>{dataUser?.nickname || dataUser?.username}</CardTitle>
                                                <Badge>{dataUser?.isPrivate ? "Private Profile" : "Public Profile"}</Badge>
                                            </div>
                                            <CardDescription className="text-base">@{dataUser?.username}</CardDescription>
                                            <p className="text-muted-foreground">{dataUser?.bio}</p>
                                        </div>
                                        <Button
                                            disabled={isSharing}
                                            onClick={handleShareProfile}
                                            variant="outline" size="icon">

                                            {
                                                isSharing ? (
                                                    <FaSpinner className="animate-spin h-4 w-4" />
                                                ) : (
                                                    <Share2 className="h-4 w-4" />
                                                )
                                            }
                                        </Button>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="h-full">
                                <Tabs defaultValue="transformations">
                                    <TabsList>
                                        <TabsTrigger value="transformations">Transformations</TabsTrigger>
                                        <TabsTrigger value="liked">Liked</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="transformations" className="mt-6 h-full">
                                        {isLoading ? (
                                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                                {[...Array(6)].map((_, index) => (
                                                    <LightWaveLoading key={index} className="h-64 rounded-lg" />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                                {transformations ?
                                                    transformations
                                                        .filter((transformation) => isMyProfile || transformation.isPublic)
                                                        .map((transformation) => (
                                                            <Card
                                                                onClick={() => router.push(`/preview-transformation/${transformation._id}`)}
                                                                className="cursor-pointer"
                                                                key={uuidv4()}>
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
                                                        )) :
                                                    (
                                                        <div className="text-center py-12 text-muted-foreground">
                                                            No transformations found
                                                        </div>
                                                    )

                                                }
                                            </div>
                                        )}
                                    </TabsContent>
                                    <TabsContent value="liked" className="mt-6 h-full">
                                        {isLikedDataLoading ? (
                                            <LightWaveLoading className="h-48 rounded-lg" />
                                        ) : userLikedTransformations.length > 0 ? (
                                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 h-full">
                                                {userLikedTransformations ?
                                                    userLikedTransformations
                                                        .filter((transformation) => isMyProfile || transformation.isPublic)
                                                        .map((transformation) => (
                                                            <Card
                                                                onClick={() => router.push(`/preview-transformation/${transformation._id}`)}
                                                                className="cursor-pointer"
                                                                key={uuidv4()}>
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
                                                        )) :
                                                    (
                                                        <div className="text-center py-12 text-muted-foreground">
                                                            No Liked Transformations found
                                                        </div>
                                                    )

                                                }
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 text-muted-foreground">
                                                No liked transformations found
                                            </div>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </>
                    )
                }


            </Card>
        </div>
    )
}
