'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, ArrowLeft } from 'lucide-react'
import { FullSizeImageModal } from "@/app/components/root/FullSizeImageModal"
import { useAppDispatch } from '@/lib/store'
import { change } from '@/lib/reducers/uiSlice'
import { BiBasket } from 'react-icons/bi'
import { FaDownload } from 'react-icons/fa'

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

  const [isOwner, setIsOwner] = useState(false)

  console.log(setIsOwner)

  const dispatch = useAppDispatch();

  const router = useRouter();

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
      <Button
        onClick={
          () => router.back()
        }
        variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

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
            <h3 className="font-semibold mb-2">Transformation Details</h3>
            <p className="text-sm text-muted-foreground">{item.replaceWith}</p>
          </div>
        </CardContent>
        <CardFooter className={`grid grid-cols-1 gap-4
            ${isOwner ? "md:grid-cols-3" : "md:grid-cols-2"}
          `}>
          {
            isOwner && (
              <Button variant="destructive" size="sm" className="col-span-1 md:col-span-1">
                <BiBasket className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )
          }
          <Button
            variant="outline"
            size="sm"
            className="col-span-1 md:col-span-1"
            onClick={() => router.push(`/transformation/haircut?prompt=${encodeURIComponent(item.replaceWith)}`)}
          >
            <FaDownload className="h-4 w-4 mr-2" />
            Use prompt
          </Button>
          <Button size="sm" className="col-span-1 md:col-span-1 gap-2">
            <Download className="h-4 w-4" />
            Download Result
          </Button>
        </CardFooter>
      </Card >
    </div >
  )
}

