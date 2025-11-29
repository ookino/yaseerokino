import { NavDock } from "@/components/NavDock";

export default function PortfolioLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative">
            {children}

            {/* Dock pinned to bottom, always above content + loader */}
            <div className="fixed inset-x-0 bottom-8 px-6 w-full flex justify-end items-center ">
                <NavDock />
            </div>
        </div>
    );
}
