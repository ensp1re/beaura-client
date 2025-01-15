
import { SiteFooter } from "../components/SiteFooter"
import { SiteHeader } from "../components/SiteHeader"
import { SidebarAdmin } from "./components/SibebarAdmin"


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <SiteHeader />
            <div className="flex-1 flex">
                <SidebarAdmin />
                <main className="flex-1 p-6">{children}</main>
            </div>
            <SiteFooter />
        </div>
    )
}

