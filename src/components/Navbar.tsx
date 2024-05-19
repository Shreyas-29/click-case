import React from 'react'
import Wrapper from "./utils/Wrapper"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/Button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserAccount from "./user/UserAccount";

interface Props {

}

const Navbar: React.FC<Props> = async () => {

    const { getUser } = getKindeServerSession()

    const user = await getUser()

    const isAdmin = user?.email === process.env.ADMIN_EMAIL;

    return (
        <header className="sticky z-[80] h-14 inset-x-0 top-0 w-full border-b border-border bg-white/50 backdrop-blur-lg transition-all">
            <Wrapper>
                <div className="flex h-14 items-center justify-between border-b border-border">
                    <Link href="/" className="flex z-40 font-semibold">
                        click <span className="text-primary">case</span>
                    </Link>

                    <div className="flex items-center space-x-4 h-full">
                        {user ? (
                            <>
                                {/* <Link href="/api/auth/logout" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                    Sign out
                                </Link> */}
                                {isAdmin && (
                                    <Link href="/dashboard" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                        Dashboard ⚡
                                    </Link>
                                )}
                                <Link href="/configure/upload" className={buttonVariants({ size: "sm", className: "hidden sm:flex items-center gap-1" })}>
                                    Create case
                                    <ArrowRight className="w-5 h-5 ml-1.5" />
                                </Link>
                                <UserAccount user={user} />
                            </>
                        ) : (
                            <>
                                <Link href="/api/auth/register" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                    Sign up
                                </Link>
                                <Link href="/api/auth/login" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                    Login
                                </Link>
                                <div className="h-6 w-px bg-border"></div>
                                <Link href="/configure/upload" className={buttonVariants({ size: "sm", className: "hidden sm:flex items-center gap-1" })}>
                                    Create case
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Wrapper>
        </header>
    )
}

export default Navbar
