"use client";

import { CaseColor } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react"
import { AspectRatio } from "./ui/AspectRatio";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
    croppedImageUrl: string;
    color: CaseColor;
}

const PhonePreview = ({ croppedImageUrl, color }: Props) => {

    const ref = useRef<HTMLDivElement>(null);

    const [renderedDimensions, setRenderedDimensions] = useState<any>({
        width: 0,
        height: 0,
    });

    let caseBgColor = "bg-neutral-900";
    if (color === "black") caseBgColor = "bg-neutral-900";
    if (color === "rose") caseBgColor = "bg-neutral-100";
    if (color === "blue") caseBgColor = "bg-primary-500";
    if (color === "green") caseBgColor = "bg-success-500";

    const handleResize = () => {
        if (!ref.current) return;
        const { width, height } = ref.current.getBoundingClientRect();
        setRenderedDimensions({ width, height });
    };

    useEffect(() => {
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [ref.current]);

    return (
        <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
            <div
                className="absolute z-20 scale-[1.0352]"
                style={{
                    left:
                        renderedDimensions.width / 2 -
                        renderedDimensions.width / (1216 / 121),
                    top: renderedDimensions.height / 6.22,
                }}>
                <img
                    width={renderedDimensions.width / (3000 / 637)}
                    className={cn(
                        "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
                        caseBgColor
                    )}
                    src={croppedImageUrl}
                />
            </div>

            <div className="relative h-full w-full z-40">
                <img
                    alt="phone"
                    src="/clearphone.png"
                    className="pointer-events-none h-full w-full antialiased rounded-md"
                />
            </div>
        </AspectRatio>
    )
};

export default PhonePreview
