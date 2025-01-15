'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, ArrowLeft, Undo, Redo } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { FullSizeImageModal } from "@/app/components/root/FullSizeImageModal"
import { useAppDispatch } from '@/lib/store'
import { change } from '@/lib/reducers/uiSlice'

interface GalleryItem {
  id: string
  type: string
  itemToReplace: string
  replaceWith: string
  exampleImage: string
  sex: string
}

// This would typically come from an API or database
const getItemById = (id: string): GalleryItem | undefined => {
  const galleryItems: GalleryItem[] = [
    {
      id: "1",
      type: "bald",
      itemToReplace: "I need to change the haircut of the person in the photo but don't change anything except hair",
      replaceWith: "Make the person in the photo bald by removing only their hair keeping all other facial details such as skin texture tone and facial expression exactly as shown in the original Ensure the bald head looks smooth realistic and naturally blended with the face Make the bald head visually appealing and evenly textured for a polished look",
      exampleImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF-ts8ef0ULc3wXS7uMqNbMbMl0sspMzxObsJIL8tobMq1h3LyZ1GMjyUTSfljpiiiRJs&usqp=CAU",
      sex: "male",
    },
    // Add more items as needed
  ]
  return galleryItems.find(item => item.id === id)
}

export default function PreviewTransformationComponent() {
  const params = useParams()
  const id = params.id as string
  const [item, setItem] = useState<GalleryItem | undefined>(undefined)
  const [intensity, setIntensity] = useState(50)

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(change("Transformation Preview"))
    const fetchedItem = getItemById(id)
    setItem(fetchedItem)
  }, [id, dispatch])

  if (!item) {
    return <div className="container mx-auto p-6">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <Link href="/gallery" passHref>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
        </Button>
      </Link>

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="capitalize">{item.type} Style Preview</CardTitle>
            <Badge variant="secondary">{item.sex}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Original Image</h3>
              <FullSizeImageModal
                src={item.exampleImage}
                alt="Original image"
                className="aspect-square"
              />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Transformed Image</h3>
              <div className="relative aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Transformation preview would appear here</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Transformation Intensity</h3>
            <Slider
              value={[intensity]}
              onValueChange={(value) => setIntensity(value[0])}
              max={100}
              step={1}
            />
            <p className="text-sm text-muted-foreground mt-2">Intensity: {intensity}%</p>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Transformation Details</h3>
            <p className="text-sm text-muted-foreground">{item.replaceWith}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <Button variant="outline" size="sm" className="mr-2">
              <Undo className="h-4 w-4 mr-2" />
              Undo
            </Button>
            <Button variant="outline" size="sm">
              <Redo className="h-4 w-4 mr-2" />
              Redo
            </Button>
          </div>
          <Button size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download Result
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

