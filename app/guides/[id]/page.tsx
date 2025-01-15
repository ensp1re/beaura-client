import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/app/components/SiteHeader"
import { SiteFooter } from "@/app/components/SiteFooter"

// This would typically come from a database or API
const getGuide = (id: string) => {
    return {
        id,
        title: "Best Styles for Round Faces",
        content: `
      <p>If you have a round face shape, you're in good company with celebrities like Selena Gomez, Chrissy Teigen, and Miranda Kerr. Round faces are characterized by soft curves and equal width and length. The key to finding the most flattering hairstyle for a round face is to create the illusion of length and to balance out the roundness. Here are some tips and styles that work well for round faces:</p>

      <h2>1. Long Layers</h2>
      <p>Long, layered cuts are ideal for round faces as they create the illusion of length and can help slim the face. Ask your stylist for long layers that start at the chin or below.</p>

      <h2>2. Side-Swept Bangs</h2>
      <p>Side-swept bangs can add angles to your face, helping to balance out the roundness. They also draw attention to your eyes and cheekbones.</p>

      <h2>3. Textured Bob</h2>
      <p>A textured bob that hits just below the chin can be very flattering for round faces. The texture adds volume at the crown, elongating the face, while the length helps to slim the cheeks.</p>

      <h2>4. High Ponytail</h2>
      <p>A high ponytail or top knot can create the illusion of a longer face shape. Plus, it's a great style for both casual and formal occasions.</p>

      <h2>5. Deep Side Part</h2>
      <p>A deep side part can create asymmetry, which helps to balance out a round face. This works well with both straight and wavy hair.</p>

      <h2>6. Voluminous Curls</h2>
      <p>If you have naturally curly hair, embrace it! Voluminous curls can add height to your look, elongating your face. Just be sure to keep the curls looser around your cheeks.</p>

      <h2>Styles to Avoid</h2>
      <p>While there are no hard and fast rules in beauty, some styles tend to accentuate the roundness of a face:</p>
      <ul>
        <li>Blunt bangs that cut straight across the forehead</li>
        <li>Very short, chin-length bobs without texture</li>
        <li>Center parts with flat, straight hair</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Remember, these are just guidelines. The most important thing is to choose a hairstyle that makes you feel confident and beautiful. Use BeauraAI to try on different styles and see what works best for you!</p>
    `,
        author: "Sarah Johnson",
        date: "June 15, 2023",
        coverImage: "/assets/placeholder.jpg"
    }
}


export default function GuidePage({ params }: { params: { id: string } }) {
    const guide = getGuide(params.id)

    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <main className="flex-1">
                <article className="max-w-3xl mx-auto px-4 py-12 md:py-20">
                    <Button variant="ghost" asChild className="mb-8">
                        <Link href="/guides">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Guides
                        </Link>
                    </Button>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">{guide.title}</h1>
                    <div className="flex items-center space-x-4 mb-8 text-sm text-muted-foreground">
                        <span>By {guide.author}</span>
                        <span>•</span>
                        <time dateTime={guide.date}>{guide.date}</time>
                    </div>
                    <div className="relative aspect-video mb-8">
                        <Image
                            src={guide.coverImage || "/assets/placeholder.jpg"}
                            alt={guide.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: guide.content }} />
                </article>
            </main>
            <SiteFooter />
        </div>
    )
}

