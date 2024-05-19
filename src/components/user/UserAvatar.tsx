"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { User } from "lucide-react";

const UserAvatar = () => {

    const { user } = useKindeBrowserClient();

    return (
        <Avatar className="w-9 h-9">
            {user?.picture ? (
                <div className="relative aspect-square h-full w-full">
                    <Image
                        src={user?.picture!}
                        alt={user?.given_name!}
                        referrerPolicy="no-referrer"
                        unoptimized
                        fill
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span className="sr-only">
                        {user?.given_name}
                    </span>
                    <User className="w-4 h-4" />
                </AvatarFallback>
            )}
        </Avatar>
    );
}

export default UserAvatar;
