"use client"

import { useState } from "react"
import { Check, Copy, Facebook, Link, Twitter } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"

export function ShareDialog({
    transformationId,
}: {
    transformationId: string
}) {
    const [copied, setCopied] = useState(false)
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/preview-transformation/${transformationId}` : ""

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            toast(
                "Copied to clipboard. The link has been copied to your clipboard.",
            )
            setTimeout(() => setCopied(false), 2000)
        } catch {
            toast("Failed to copy to clipboard. Please try again.")
        }
    }

    const shareToSocial = (platform: string) => {
        const urls = {
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        }
        window.open(urls[platform as keyof typeof urls], "_blank")
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    style={{ backgroundColor: "transparent" }}
                    variant="ghost" size="icon" className="transform hover:scale-110 transition duration-300 cursor-pointer text-white hover:text-white"
                    onMouseDown={(e) => e.preventDefault()}>
                    <Link className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Input value={shareUrl} readOnly className="w-full" />
                    </div>
                    <Button type="submit" size="icon" onClick={copyToClipboard} className="px-3">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy</span>
                    </Button>
                </div>
                <div className="flex justify-center space-x-2 mt-4">
                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => shareToSocial("twitter")}>
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Share on Twitter</span>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full" onClick={() => shareToSocial("facebook")}>
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Share on Facebook</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default ShareDialog;