import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, LayoutDashboard } from 'lucide-react'

export function SidebarAdmin() {
  return (
    <div className="w-64 bg-gray-100 p-4 space-y-4">
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/admin">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/admin/blog">
          <FileText className="mr-2 h-4 w-4" />
          Manage Blog
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/admin/contact">
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Support
        </Link>
      </Button>
    </div>
  )
}

