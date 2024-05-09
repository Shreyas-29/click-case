import React, { HTMLAttributes } from 'react';
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props extends HTMLAttributes<HTMLDivElement> {
    img: string;
    dark?: boolean;
}

const Phone: React.FC<Props> = ({ img, className, dark = false, ...props }) => {
    return (
        <div className={cn(
            "relative pointer-events-none z-50 overflow-hidden",
            className
        )}>
            <Image
                src={dark ? "/phone-template-dark-edges.png" : "/phone-template-white-edges.png"}
                alt="phone"
                width={2024}
                height={2024}
                className="pointer-events-none z-50 select-none"
            />
            <div className="absolute -z-10 inset-0">
                <Image
                    src={img}
                    alt="phone"
                    width={2024}
                    height={2024}
                    className="object-cover min-w-full min-h-full"
                />
            </div>
        </div>
    )
};

export default Phone
