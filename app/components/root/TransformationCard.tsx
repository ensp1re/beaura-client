import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Download, Heart } from 'lucide-react'
import Image from "next/image"

interface TransformationCardProps {
  transformation: {
    id: number
    title: string
    image: string
    likes: number
    downloads: number
  }
}

export function TransformationCard({ transformation }: TransformationCardProps) {
  return (
    <Card>
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
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span className="text-sm">{transformation.downloads}</span>
          </div>
        </div>
        <span className="text-sm font-medium">{transformation.title}</span>
      </CardFooter>
    </Card>
  )
}

