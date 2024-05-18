"use client";

import React, { useEffect, useRef, useState, HTMLAttributes } from 'react'
import Wrapper from "./utils/Wrapper";
import Image from "next/image";
import { useInView } from "framer-motion";
import { PHONES } from "@/constants";
import { cn } from "@/lib/utils";
import Phone from "./Phone";

interface Props {

}

interface ReviewCardProps extends HTMLAttributes<HTMLDivElement> {
    img: string;
}

const Reviews: React.FC<Props> = () => {
    return (
        <Wrapper className="relative max-w-5xl">
            <Image
                src="/what-people-are-buying.svg"
                alt="people"
                aria-hidden={true}
                width={1024}
                height={1024}
                className="absolute select-none hidden xl:block -left-32 top-1/3 w-32 h-auto"
            />
            <ReviewGrid />
        </Wrapper>
    )
};

const ReviewGrid = () => {

    const containerRef = useRef<HTMLDivElement | null>(null);

    const isInView = useInView(containerRef, { once: true, amount: 0.4 });

    const columns = splitArray(PHONES, 3)
    const column1 = columns[0]
    const column2 = columns[1]
    const column3 = splitArray(columns[2], 2)

    return <div ref={containerRef} className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {isInView ? (
            <>
                <ReviewColumn
                    reviews={[...column1, ...column3.flat(), ...column2]}
                    msPerPixcel={10}
                    reviewClassName={(reviewIndex) => cn({
                        "md:hidden": reviewIndex >= column1.length + column3[0].length,
                        "lg:hidden": reviewIndex >= column1.length
                    })}
                />
                <ReviewColumn
                    reviews={[...column2, ...column3[1]]}
                    msPerPixcel={15}
                    className="hidden md:block"
                    reviewClassName={(reviewIndex) => reviewIndex >= column2.length ? "lg:hidden" : ""}
                />
                <ReviewColumn
                    reviews={column3.flat()}
                    msPerPixcel={10}
                    className="hidden md:block"
                />
            </>
        ) : null}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100"></div>
    </div>
};

const ReviewColumn = ({
    reviews,
    className,
    reviewClassName,
    msPerPixcel = 0
}: {
    reviews: string[];
    className?: string;
    reviewClassName?: (reviewIndex: number) => string;
    msPerPixcel?: number;
}) => {
    const columnRef = useRef<HTMLDivElement | null>(null);

    const [columnHeight, setColumnHeight] = useState<number>(0);

    const duration = `${columnHeight * msPerPixcel}ms`;

    useEffect(() => {
        if (!columnRef.current) return;

        const resizeObserver = new window.ResizeObserver(() => {
            setColumnHeight(columnRef.current?.offsetHeight ?? 0);
        });

        resizeObserver.observe(columnRef.current);

        return () => {
            resizeObserver.disconnect();
        }
    }, []);

    return (
        <div
            ref={columnRef}
            style={{ "--marquee-duration": duration } as React.CSSProperties}
            className={cn("animate-marquee space-y-8 py-4", className)}
        >
            {reviews.concat(reviews).map((img, reviewIndex) => (
                <ReviewCard key={reviewIndex} img={img} className={reviewClassName?.(reviewIndex % reviews.length)} />
            ))}
        </div>
    )
};

const ReviewCard = ({ img, className, ...props }: ReviewCardProps) => {

    const POSSIBLE_ANIMATION_DELAYS = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"];

    const animationDelay = POSSIBLE_ANIMATION_DELAYS[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)];

    return (
        <div
            {...props}
            style={{ animationDelay }}
            className={cn(
                "animate-fade-in rounded-3xl bg-background p-6 shadow-xl shadow-slate-900/5",
                className
            )}
        >
            <Phone img={img} />
        </div>
    )
}

function splitArray<T>(array: Array<T>, parts: number) {
    const result: Array<Array<T>> = [];

    for (let i = 0; i < array.length; i++) {
        const index = i % parts;
        if (!result[index]) {
            result[index] = [];
        }
        result[index].push(array[i]);
    };

    return result;
};

export default Reviews
