import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scissors, User, Palette } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "../components/SiteHeader"
import { SiteFooter } from "../components/SiteFooter"

export const metadata = {
    title: 'Style Guides - BeauraAI',
    description: 'Discover the perfect hairstyle for you with our comprehensive style guides.',
}

const styleCategories = [
    { id: "face-shape", name: "Face Shape", icon: User },
    { id: "hair-type", name: "Hair Type", icon: Scissors },
    { id: "color", name: "Hair Color", icon: Palette },
]

const styleGuides = [
    { id: 1, title: "Best Styles for Round Faces", image: "/assets/placeholder.jpg", category: "face-shape" },
    { id: 2, title: "Haircuts for Curly Hair", image: "/assets/placeholder.jpg", category: "hair-type" },
    { id: 3, title: "Trending Colors for Summer", image: "/assets/placeholder.jpg", category: "color" },
    { id: 4, title: "Flattering Cuts for Square Faces", image: "/assets/placeholder.jpg", category: "face-shape" },
    { id: 5, title: "Managing Fine Hair", image: "/assets/placeholder.jpg", category: "hair-type" },
    { id: 6, title: "Bold Color Transformations", image: "/assets/placeholder.jpg", category: "color" },
]

export default function StyleGuidesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container px-4 md:px-6">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
                            BeauraAI Style Guides
                        </h1>
                        <p className="text-xl text-muted-foreground text-center max-w-[600px] mx-auto mb-12">
                            Discover the perfect hairstyle for your unique features with our comprehensive style guides.
                        </p>
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="flex justify-center mb-8">
                                <TabsTrigger value="all">All Guides</TabsTrigger>
                                {styleCategories.map((category) => (
                                    <TabsTrigger key={category.id} value={category.id}>
                                        <category.icon className="w-4 h-4 mr-2" />
                                        {category.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value="all" className="space-y-4">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {styleGuides.map((guide) => (
                                        <Card key={guide.id} className="overflow-hidden">
                                            <CardContent className="p-0">
                                                <div className="relative aspect-video">
                                                    <Image
                                                        src={guide.image || "/assets/placeholder.jpg"}
                                                        alt={guide.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold mb-2">{guide.title}</h3>
                                                    <Button asChild>
                                                        <Link href={`/guides/${guide.id}`}>Read Guide</Link>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                            {styleCategories.map((category) => (
                                <TabsContent key={category.id} value={category.id} className="space-y-4">
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {styleGuides.filter(guide => guide.category === category.id).map((guide) => (
                                            <Card key={guide.id} className="overflow-hidden">
                                                <CardContent className="p-0">
                                                    <div className="relative aspect-video">
                                                        <Image
                                                            src={guide.image || "/assets/placeholder.jpg"}
                                                            alt={guide.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="font-semibold mb-2">{guide.title}</h3>
                                                        <Button asChild>
                                                            <Link href={`/guides/${guide.id}`}>Read Guide</Link>
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}

