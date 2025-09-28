import { ModeToggle } from "@/components/ModeToggle";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import { fontVariables, metadata } from "@/lib";
export { metadata };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${fontVariables} antialiased`}>
                {" "}
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="absolute top-4 right-4">
                        <ModeToggle />
                    </div>

                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
