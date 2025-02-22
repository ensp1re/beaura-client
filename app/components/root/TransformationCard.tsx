import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart } from 'lucide-react'
import Image from "next/image"
import { useRouter } from "next/navigation"

interface TransformationCardProps {
  transformation: {
    id: string
    title: string
    image: string
    likes: number
  }
}

export function TransformationCard({ transformation }: TransformationCardProps) {

  const router = useRouter();

  return (
    <Card onClick={() => router.push(`/preview-transformation/${transformation.id}`)} className="cursor-pointer">
      <CardContent className="p-4">
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <Image
            src={transformation.image}
            alt={transformation.title}
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span className="text-sm">{transformation.likes}</span>
          </div>
        </div>
        <span className="text-sm font-medium">
          {transformation.title.length > 20 ? `${transformation.title.substring(0, 20)}...` : transformation.title}
        </span>
      </CardFooter>
    </Card>
  )
}

