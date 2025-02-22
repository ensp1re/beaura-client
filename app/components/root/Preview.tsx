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
import { useDeleteTransformationMutation, useGetTransformationByIdQuery } from '@/services/transformation.service'
import LightWaveLoading from '../WaveLoading'
import { ITransformationData } from '@/interfaces/root.interface'
import toast from 'react-hot-toast'

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


  const [deleteTRansformation, {
    isLoading: isDeleting,
  }] = useDeleteTransformationMutation()

  useEffect(() => {
    if (data) {
      setIsOwner(data.userId._id === auth?._id)
      console.log(data)
      setTransformation(data)
    }
  }, [auth?._id, data, isLoading])

  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(change("Transformation Preview"))
  }, [dispatch])


  const handleDelete = async () => {
    try {
      const response = await deleteTRansformation(id).unwrap();
      if (response) {
        toast.success("Transformation deleted successfully")
        router.push("/dashboard")
      } else {
        toast.error("Failed to delete transformation")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to delete transformation")
    }
  };


  const downloadSelectedTransformation = async () => {
    try {
      const selectedImage = transformation?.toImage;
      if (!selectedImage) {
        return;
      }
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `t_${transformation._id}.jpg`;
      a.click();
      window.URL.revokeObjectURL(url);


    } catch (error) {
      console.log(error)
      toast.error("Failed to download transformation")

    }
  };


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
        <CardContent className=''>
          {
            isLoading ? (
              <LightWaveLoading className="h-full" />
            ) : (
              <>
                {
                  !data ? (
                    <div className="text-muted-foreground text-center min-h-[300px] flex items-center justify-center">
                      Cannot find this transformation: <span className='font-semibold'>
                        {id}
                      </span>
                    </div>
                  ) : transformation ? (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-2">Original Image</h3>
                          <FullSizeImageModal
                            src={transformation?.fromImage || "/assets/placeholder.jpg"}
                            alt="Original image"
                            className="aspect-square" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Transformed Image</h3>
                          <FullSizeImageModal
                            src={transformation?.toImage || "/assets/placeholder.jpg"}
                            alt="Transformed image"
                            className="aspect-square" />
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Transformation Details</h3>
                        <p className="text-sm text-muted-foreground">{transformation?.prompt}</p>
                      </div>
                    </>
                  ) : (
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
              <Button
                onClick={handleDelete}
                variant="destructive" size="sm" className="col-span-1 md:col-span-1">
                {
                  isDeleting ? (
                    <LightWaveLoading className="h-4" />
                  ) : (
                    <>
                      <BiBasket className="h-4 w-4 mr-2" />
                      Delete Transformation
                    </>

                  )
                }

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
          <Button size="sm" className="col-span-1 md:col-span-1 gap-2" onClick={downloadSelectedTransformation}>
            <Download className="h-4 w-4" />
            Download Result
          </Button>
        </CardFooter>
      </Card >
    </div >
  )
}

