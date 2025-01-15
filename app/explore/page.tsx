import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2 } from 'lucide-react'
import Image from "next/image"
import { SiteHeader } from "../components/SiteHeader"
import { SiteFooter } from "../components/SiteFooter"

export const metadata = {
    title: 'Gallery - BeauraAI',
    description: 'Explore stunning AI-powered hair transformations created by BeauraAI users.',
}

const transformations = [
    { id: 1, title: "Summer Chic", image: "/assets/placeholder.jpg", likes: 1234, author: "Sarah J." },
    { id: 2, title: "Professional Look", image: "/assets/placeholder.jpg", likes: 987, author: "Mike R." },
    { id: 3, title: "Casual Cool", image: "/assets/placeholder.jpg", likes: 756, author: "Emma L." },
    { id: 4, title: "Elegant Updo", image: "/assets/placeholder.jpg", likes: 543, author: "Alex T." },
    { id: 5, title: "Beachy Waves", image: "/assets/placeholder.jpg", likes: 432, author: "Olivia P." },
    { id: 6, title: "Edgy Pixie", image: "/assets/placeholder.jpg", likes: 321, author: "Chris M." },
]

export default function GalleryPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container px-4 md:px-6">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
                            BeauraAI Transformation Gallery
                        </h1>
                        <Tabs defaultValue="trending" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto mb-8">
                                <TabsTrigger value="trending">Trending</TabsTrigger>
                                <TabsTrigger value="recent">Recent</TabsTrigger>
                                <TabsTrigger value="top">Top Rated</TabsTrigger>
                            </TabsList>
                            <TabsContent value="trending" className="space-y-4">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {transformations.map((item) => (
                                        <Card key={item.id} className="overflow-hidden">
                                            <CardContent className="p-0">
                                                <div className="relative aspect-square">
                                                    <Image
                                                        src={item.image || "/assets/placeholder.jpg"}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover transition-all hover:scale-105"
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold mb-1">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground mb-2">by {item.author}</p>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center space-x-2">
                                                            <Heart className="h-5 w-5 text-red-500" />
                                                            <span className="text-sm">{item.likes}</span>
                                                        </div>
                                                        <Button size="sm" variant="ghost">
                                                            <Share2 className="h-4 w-4 mr-2" />
                                                            Share
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="recent">
                                {/* Similar structure as "trending", with different data */}
                            </TabsContent>
                            <TabsContent value="top">
                                {/* Similar structure as "trending", with different data */}
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}

