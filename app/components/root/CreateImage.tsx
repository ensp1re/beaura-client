'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Plus } from 'lucide-react'
import { FaUpload } from "react-icons/fa"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { ITransformationData } from "@/interfaces/root.interface"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { aspectRatioOptions } from "@/constants/constants"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppDispatch } from "@/lib/store"
import { change } from "@/lib/reducers/uiSlice"



export default function ImageTransformer() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showInput, setShowInput] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(change("Change Haircut"))
    }, [dispatch])

    const [data, setData] = useState<ITransformationData>({
        title: "",
        prompt: "",
        tags: [],
        selectedImage: "",
    });


    const addToData = (key: string, value: string) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    console.log(data, addToData);


    const handleFileChange = () => {
        try {
            const file = fileInputRef.current?.files?.[0];
            if (!file) {
                return;
            }
            const validTypes = ["image/png", "image/jpg", "image/jpeg"];
            if (!validTypes.includes(file.type)) {
                setError("Invalid file type. Please upload a PNG, JPG, or JPEG file.");
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
            setError(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click(); // Programmatically open the file input dialog
    };






    return (
        <div className="container mx-auto p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Preview Section */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="relative aspect-[3/4] w-full overflow-hidden">
                            <Image
                                src={
                                    selectedFile
                                        ? URL.createObjectURL(selectedFile)
                                        : "https://plus.unsplash.com/premium_photo-1669138512601-e3f00b684edc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                }
                                alt="Original Image"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                                Original
                            </div>
                        </Card>
                        <Card className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                            <div className="absolute  inset-0 flex items-center flex-col gap-2 justify-center text-muted-foreground">
                                <FaUpload className="h-8 w-8 mr-2" />
                                Transformed Image
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <div className="space-y-6 mb-4">
                            {/* Keyword Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    placeholder="My new haircut"
                                    className="w-full"
                                    value={data.title}
                                    onChange={(e: ChangeEvent) => addToData("title", (e.target as HTMLInputElement).value)}
                                />
                            </div>

                            {/* Genres */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Prompt</label>
                                <div className="flex flex-wrap gap-2">
                                    <Input
                                        placeholder="Make my hair bald..."
                                        className="w-full mb-2"
                                        value={data.prompt}
                                        onChange={(e: ChangeEvent) => addToData("prompt", (e.target as HTMLInputElement).value)}
                                    />
                                </div>
                            </div>
                            <div className="spa ce-y-2">
                                <h2 className="text-sm font-medium">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.tags && data.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary" className="flex items-center">
                                            {tag}
                                            <button
                                                type="button"
                                                className="ml-2 text-red-500"
                                                onClick={() => {
                                                    const newTags = data.tags && data.tags.filter((_, i) => i !== index);
                                                    setData((prev) => ({
                                                        ...prev,
                                                        tags: newTags,
                                                    }));
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </Badge>
                                    ))}
                                    {data.tags && data.tags.length < 5 && (
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setShowInput(true);
                                                }}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                            {showInput && (
                                                <Input
                                                    placeholder="Enter new tag"
                                                    className="w-full"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            const newTag = (e.target as HTMLInputElement).value;
                                                            if (newTag) {
                                                                setData((prev) => ({
                                                                    ...prev,
                                                                    tags: [...prev.tags!, newTag],
                                                                }));
                                                                (e.target as HTMLInputElement).value = '';
                                                                setShowInput(false);
                                                            }
                                                        }
                                                    }}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Size <span className="text-yellow-500">★</span></label>
                                <Select
                                    onValueChange={(value) => addToData("aspectRation", value)}
                                    defaultValue="1:1"
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(aspectRatioOptions).map((option) => (
                                            <SelectItem key={option.aspectRatio} value={option.aspectRatio}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* Add better quality */}
                            <div className="space-y-2">
                                <Label className="flex items-center space-x-2 cursor-pointer">
                                    <Checkbox
                                        className="form-checkbox h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                                        onChange={(e) => addToData("premiumQuality", (e.target as HTMLInputElement).checked ? "true" : "false")}
                                    />
                                    <span className="text-sm font-medium text-gray-700">Improve Quality <span className="text-yellow-500">★</span></span>
                                </Label>
                            </div>
                        </div>

                        {/* Size */}


                        {/* Sample Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Sample</label>
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
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {/* Create Button */}
                        <Button className="w-full">Create</Button>
                    </Card>
                </div>
            </div >
        </div >
    )
}

