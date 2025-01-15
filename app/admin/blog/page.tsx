'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { X } from 'lucide-react'


// Dynamically import ReactQuill to avoid SSR issues

export default function AdminBlog() {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [error, setError] = useState<string>('')
    const fileInputRef = React.createRef<HTMLInputElement>()

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const fileSize = file.size / 1024 / 1024
            setSelectedFile(file)
            if (fileSize > 2) {
                setError('File size must be less than 2MB')
            } else {
                setError('')
            }
        }
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Blog post submitted:', { title, content })
        toast.success("Blog Post Created: Your blog post has been created.")
        setTitle('')
        setContent('')
    }

    return (
        <div className="space-y-6 min-h-screen">
            <h1 className="text-3xl font-bold">Manage Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Blog Post Title</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className='space-y-2'>
                    <>
                        <Card onClick={handleButtonClick} className="border-2 cursor-pointer border-dashed p-8">
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                className="hidden"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                            <div className="flex flex-col items-center justify-center text-center">
                                <div className="mb-4">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div className="flex text-sm text-gray-600">
                                    <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90">
                                        <span>Upload a file</span>
                                        <input type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                            </div>
                        </Card>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </>
                </div>
                <div className='space-y-2'>
                    <Card className="relative aspect-[16/9] w-full overflow-hidden border-2 border-dashed border-gray-300 rounded-lg">
                        {
                            selectedFile && (
                                <Image
                                    src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                                    alt="Blog Article Image"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            )
                        }

                        {!selectedFile && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                <svg
                                    className="w-12 h-12 mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-1h6v1a1 1 0 01-1 1z"
                                    />
                                </svg>
                                <span className="text-sm">Upload a blog article image</span>
                            </div>
                        )}
                        {selectedFile && (
                            <>
                                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                                    Blog Article
                                </div>
                                <div className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full cursor-pointer hover:bg-black/70 transition duration-300 ease-in-out" onClick={() => setSelectedFile(null)}>
                                    <X className="h-4 w-4 rounded-full" />
                                </div>
                            </>


                        )}
                    </Card>
                </div>
                <div className="space-y-2 pb-10">
                    <Label htmlFor="content">Blog Post Content</Label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        className="h-64 mb-12"
                    />
                </div>
                <Button type="submit" className=''>Create Blog Post</Button>
            </form >
        </div >
    )
}
