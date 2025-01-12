// app/(main)/layout.tsx

import Fonts from "@/lib/fonts";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className={`bg-white ${Fonts.getInter()}`}>{children}</div>;
}
