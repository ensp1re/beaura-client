'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, ArrowLeft } from 'lucide-react'
import { FullSizeImageModal } from "@/app/components/root/FullSizeImageModal"
import { RootState, useAppDispatch, useAppSelector } from '@/lib/store'
import { change } from '@/lib/reducers/uiSlice'
import { BiBasket } from 'react-icons/bi'
import { FaDownload } from 'react-icons/fa'
import { useGetTransformationByIdQuery } from '@/services/transformation.service'
import LightWaveLoading from '../WaveLoading'
import { ITransformationData } from '@/interfaces/root.interface'

// interface GalleryItem {
//   id: string
//   type: string
//   itemToReplace: string
//   replaceWith: string
//   exampleImage: string
//   sex: string
// }


export default function PreviewTransformationComponent(): React.ReactElement {
  const params = useParams()
  const id = params.id as string
  const [isOwner, setIsOwner] = useState(false)
  const [transformation, setTransformation] = useState<ITransformationData | undefined>(undefined)

  const auth = useAppSelector((state: RootState) => state.auth.user)

  const { data, isLoading } = useGetTransformationByIdQuery(id)


  useEffect(() => {
    if (data) {
      setIsOwner(data.userId === auth?._id)
      console.log(data)
      setTransformation(data)
    }
  }, [auth?._id, data, isLoading])

  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(change("Transformation Preview"))
  }, [dispatch])


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
          {
            isLoading ? (
              <LightWaveLoading className="h-16" />
            ) : (
              <div className="flex items-center justify-between">
                <CardTitle className="capitalize">Style Preview</CardTitle>
                <Badge variant="secondary">{
                  // to add sex type womam and man
                }</Badge>
              </div>
            )
          }


        </CardHeader>
        <CardContent>

          {
            isLoading ? (
              <LightWaveLoading className="h-16" />
            ) : (
              <>
                {
                  transformation ? (
                    <><div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-2">Original Image</h3>
                        <FullSizeImageModal
                          src={transformation?.fromImage || "/assets/placeholder.jpg"}
                          alt="Original image"
                          className="aspect-square" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Original Image</h3>
                        <FullSizeImageModal
                          src={transformation?.toImage || "/assets/placeholder.jpg"}
                          alt="Original image"
                          className="aspect-square" />
                      </div>
                    </div><div className="mt-6">
                        <h3 className="font-semibold mb-2">Transformation Details</h3>
                        <p className="text-sm text-muted-foreground">{transformation?.prompt}</p>
                      </div></>
                  )
                    : (
                      <div className="text-muted-foreground text-center">
                        Failed to load transformation
                      </div>
                    )
                }

              </>

            )
          }

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
            onClick={() => router.push(`/transformation/haircut?prompt=${encodeURIComponent(transformation?.prompt || "")}`)}
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

