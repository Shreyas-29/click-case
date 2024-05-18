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

    // TODO: Refactor this to use a switch statement
    let caseBgColor = "bg-slate-900";
    
    switch (color) {
        case "black":
            caseBgColor = "bg-slate-900";
            break;
        case "rose":
            caseBgColor = "bg-rose2";
            break;
        case "blue":
            caseBgColor = "bg-blue2";
            break;
        case "green":
            caseBgColor = "bg-green2";
            break;
        // add below cases for orange, red, yellow, purple, pink, brown, gray, emerald, skin, lime, sky, white, transparent
        case "orange":
            caseBgColor = "bg-orange2";
            break;
        case "red":
            caseBgColor = "bg-red2";
            break;
        case "yellow":
            caseBgColor = "bg-yellow2";
            break;
        case "purple":
            caseBgColor = "bg-purple2";
            break;
        case "pink":
            caseBgColor = "bg-pink2";
            break;
        case "brown":   
            caseBgColor = "bg-brown2";
            break;
        case "gray":
            caseBgColor = "bg-gray2";
            break;
        case "emerald":
            caseBgColor = "bg-emerald2";
            break;
        case "skin":
            caseBgColor = "bg-skin2";
            break;
        case "lime":
            caseBgColor = "bg-lime2";
            break;
        case "sky":
            caseBgColor = "bg-sky2";
            break;
        case "white":
            caseBgColor = "bg-white";
            break;
        case "transparent":
            caseBgColor = "bg-transparent";
            break;
        default:
            caseBgColor = "bg-slate-900";
            break;   
    };
    
    // if (color === "black") caseBgColor = "bg-slate-900";
    // if (color === "rose") caseBgColor = "bg-slate-100";
    // if (color === "blue") caseBgColor = "bg-primary-500";
    // if (color === "green") caseBgColor = "bg-success-500";


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
                    src="/clearphone.png"
                    alt="phone"
                    className="pointer-events-none h-full w-full antialiased rounded-md"
                />
            </div>
        </AspectRatio>
    )
};

export default PhonePreview
