/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, ClockIcon, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import SiteHeader from "@/app/components/SiteHeader"
import { SiteFooter } from "@/app/components/SiteFooter"
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';


// This would typically come from a database or API
const getBlogPost = (id: string) => {

    return {
        id,
        title: "The Future of AI in Beauty: What to Expect",
        content: `
      <p>Artificial Intelligence (AI) is revolutionizing various industries, and the beauty sector is no exception. As we step into a new era of technological advancements, AI is set to transform how we approach beauty, skincare, and personal care. In this blog post, we'll explore the exciting developments in AI-powered beauty and what you can expect in the near future.</p>

      <h2>1. Personalized Skincare Recommendations</h2>
      <p>AI algorithms can analyze your skin type, concerns, and environmental factors to provide tailored skincare recommendations. Imagine a virtual skincare expert that can adjust your routine based on real-time data about your skin's condition, the weather, and your lifestyle.</p>

      <h2>2. Virtual Try-On Experiences</h2>
      <p>AI-powered augmented reality (AR) is making it possible to virtually try on makeup, hairstyles, and even skincare products. This technology allows you to see how a product or style would look on you before making a purchase or commitment to a new look.</p>

      <h2>3. Smart Beauty Devices</h2>
      <p>AI-integrated beauty devices are becoming more sophisticated. From smart mirrors that analyze your skin and provide beauty tips to AI-powered hair styling tools that adapt to your hair type, these devices are set to become your personal beauty assistants.</p>

      <h2>4. Customized Product Formulations</h2>
      <p>AI is enabling beauty brands to create personalized products tailored to individual needs. By analyzing data from skin scans, questionnaires, and even DNA tests, companies can formulate skincare and cosmetics that are uniquely suited to each customer.</p>

      <h2>5. Predictive Beauty Trends</h2>
      <p>AI algorithms can analyze social media trends, celebrity influences, and consumer behavior to predict upcoming beauty trends. This helps both consumers and businesses stay ahead of the curve in the fast-paced beauty industry.</p>

      <h2>Conclusion</h2>
      <p>The integration of AI in the beauty industry is not just a passing trend; it's a transformation that's here to stay. As AI technology continues to evolve, we can expect even more innovative solutions that will revolutionize our beauty routines and help us achieve our best looks with unprecedented ease and precision.</p>

      <p>At BeauraAI, we're at the forefront of this exciting revolution, constantly innovating to bring you the latest in AI-powered beauty transformations. Stay tuned for more updates and get ready to experience the future of beauty!</p>
    `,
        author: { name: "Emma Watson", avatar: "/assets/placeholder.jpg" },
        date: "May 15, 2023",
        readTime: "5 min read",
        coverImage: "/assets/placeholder.jpg"
    }
}


export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const [id, setId] = useState<string | null>(null);
    const [post, setPost] = useState<any | null>(null);

    useEffect(() => {
        params.then(({ id }) => {
            setId(id);
            const post = getBlogPost(id);
            setPost(post);
        });
    }, [params]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const sanitizedContent = DOMPurify.sanitize(post.content);


    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <article key={id} className="max-w-3xl mx-auto px-4 py-12 md:py-20">
                    <Button variant="ghost" asChild className="mb-8">
                        <Link href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Link>
                    </Button>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">{post.title}</h1>
                    <div className="flex items-center space-x-4 mb-8">
                        <Avatar>
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.split(' ').map((n: any[]) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">{post.author.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <CalendarIcon className="mr-1 h-3 w-3" />
                                <time dateTime={post.date}>{post.date}</time>
                                <span className="mx-1">•</span>
                                <ClockIcon className="mr-1 h-3 w-3" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-video mb-8">
                        <Image
                            src={post.coverImage || "/placeholder.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{
                        __html: sanitizedContent
                    }} />
                </article>
            </main>
            <SiteFooter />
        </div>
    )
}

