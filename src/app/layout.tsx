import type { Metadata } from "next";
import { Inter, Rubik, Plus_Jakarta_Sans, DM_Sans, Raleway, Acme, Exo, Josefin_Sans, Quicksand, Bungee, Comfortaa, Anton } from "next/font/google";
import "@/styles/globals.css";
import { Footer, Navbar, Providers } from "@/components";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/Sonner";
import { SITE_CONFIG } from "@/config";

const font = DM_Sans({
    subsets: ["latin"],
});

export const metadata = SITE_CONFIG;
// 663a33535132614845f970e5

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(
                "min-h-screen bg-slate-50 text-slate-900 antialiased",
                font.className
            )}>
                <Navbar />
                <Toaster richColors theme="light" />
                <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
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
