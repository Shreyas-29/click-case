import type { Metadata } from "next";
import { Inter, Rubik, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { Footer, Navbar, Providers } from "@/components";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/Sonner";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};
// 663a33535132614845f970e5

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(
                "min-h-screen bg-neutral-50 text-neutral-900 antialiased",
                font.className
            )}>
                <Navbar />
                <Toaster richColors theme="light" />
                <main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)] grainy-light">
                    <div className="flex-1 flex flex-col h-full">
                        <Providers>
                            {children}
                        </Providers>
                    </div>
                    <Footer />
                </main>
            </body>
        </html>
    );
};
