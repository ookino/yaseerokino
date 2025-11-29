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
        <html lang="en" suppressHydrationWarning>
            <body className={`${fontVariables} antialiased`}>
                {" "}
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
