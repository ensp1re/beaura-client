import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2 } from 'lucide-react'
import Image from "next/image"

// This would come from your database in a real app
const profile = {
    username: "sarahstyle",
    name: "Sarah Johnson",
    avatar: "/assets/placeholder.jpg",
    bio: "Hair transformation enthusiast | Digital Artist",
    followers: 1234,
    following: 567,
    isPrivate: true,
    transformations: [
        {
            id: 1,
            title: "Summer Makeover",
            image: "/assets/placeholder.jpg",
            likes: 423,
            isPublic: true
        },
        {
            id: 2,
            title: "Professional Look",
            image: "/assets/placeholder.jpg",
            likes: 289,
            isPublic: true
        }
    ]
}

interface PublicProfilePageProps {
    isMyProfile: boolean;
}

export default function ProfilePage({ isMyProfile }: PublicProfilePageProps) {
    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={profile.avatar} alt={profile.name} />
                            <AvatarFallback>{profile.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                                <CardTitle>{profile.name}</CardTitle>
                                <Badge>{profile.isPrivate ? "Private Profile" : "Public Profile"}</Badge>
                            </div>
                            <CardDescription className="text-base">@{profile.username}</CardDescription>
                            <p className="text-muted-foreground">{profile.bio}</p>
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
                                {profile.transformations
                                    .filter(transformation => isMyProfile || transformation.isPublic)
                                    .map((transformation) => (
                                        <Card key={transformation.id}>
                                            <CardContent className="p-0">
                                                <div className="relative aspect-square">
                                                    <Image
                                                        src={transformation.image}
                                                        alt={transformation.title}
                                                        fill
                                                        className="object-cover rounded-t-lg"
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold">{transformation.title}</h3>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Heart className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-sm text-muted-foreground">
                                                            {transformation.likes}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="liked">
                            {isMyProfile || !profile.isPrivate ? (
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
