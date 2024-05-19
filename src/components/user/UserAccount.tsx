"use client";

import Link from "next/link";
import { FC } from "react";
import UserAvatar from "./UserAvatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

interface Props {
    user: KindeUser;
}

const UserAccount = ({ user }: Props) => {

    const isAdmin = user?.email === process.env.ADMIN_EMAIL;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none">
                <UserAvatar />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="z-[100] rounded-xl min-w-64 px-3 py-2">
                <div className="space-y-0.5 px-3 py-1.5">
                    {user?.given_name &&
                        <p className="font-medium capitalize">
                            {user.given_name}
                        </p>
                    }
                    {user?.email &&
                        <p className="w-48 text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    }
                </div>

                <DropdownMenuSeparator />

                {isAdmin && (
                    <DropdownMenuItem asChild className="px-4 py-2">
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild className="px-4 py-2">
                    <Link href="/orders">
                        Orders
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="px-4 py-2 text-destructive hover:text-destructive hover:bg-destructive/5">
                    <Link href="/api/auth/logout" className="w-full">
                        Sign out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserAccount;
