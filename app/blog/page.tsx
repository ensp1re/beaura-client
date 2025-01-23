import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import SiteHeader from "../components/SiteHeader"
import { SiteFooter } from "../components/SiteFooter"

export const metadata = {
    title: 'Blog - BeauraAI',
    description: 'Stay updated with the latest hair trends, AI technology, and BeauraAI news.',
}

const blogPosts = [
    {
        id: 1,
        title: "The Future of AI in Beauty: What to Expect",
        excerpt: "Explore how AI is revolutionizing the beauty industry and what it means for you.",
        author: { name: "Emma Watson", avatar: "/placeholder.svg" },
        date: "May 15, 2023",
        readTime: "5 min read",
    },
    {
        id: 2,
        title: "5 Summer Hairstyles to Try with BeauraAI",
        excerpt: "Get ready for summer with these trendy hairstyles you can preview using our AI tool.",
        author: { name: "Chris Hemsworth", avatar: "/placeholder.svg" },
        date: "June 1, 2023",
        readTime: "4 min read",
    },
    {
        id: 3,
        title: "How to Choose the Perfect Hairstyle for Your Face Shape",
        excerpt: "Learn how to use BeauraAI to find the most flattering hairstyles for your unique features.",
        author: { name: "Zendaya", avatar: "/placeholder.svg" },
        date: "June 10, 2023",
        readTime: "6 min read",
    },
]

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
                            BeauraAI Blog
                        </h1>
                        <p className="text-xl text-muted-foreground text-center max-w-[600px] mx-auto mb-12">
                            Stay up to date with the latest trends, tips, and technology in the world of AI-powered beauty transformations.
                        </p>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {blogPosts.map((post) => (
                                <Card key={post.id} className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle>{post.title}</CardTitle>
                                        <CardDescription>{post.excerpt}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="flex items-center space-x-4">
                                            <Avatar>
                                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                                <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{post.author.name}</p>
                                                <p className="text-sm text-muted-foreground">{post.date}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between items-center">
                                        <p className="text-sm text-muted-foreground">{post.readTime}</p>
                                        <Button asChild>
                                            <Link href={`/blog/${post.id}`}>Read More</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Button variant="outline" size="lg">
                                Load More Posts
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <SiteFooter />
        </div>
    )
}

