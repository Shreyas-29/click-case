"use client";

import { STEPS } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from 'react';
import { Icons } from "./Icons";


const Steps = () => {

    const pathname = usePathname();

    return (
        <ol className="rounded-md bg-background lg:flex lg:rounded-none lg:border-l lg:border-r border-border">
            {STEPS.map((step, index) => {

                const isCurrent = pathname.endsWith(step.url);
                const isCompleted = STEPS.slice(index + 1).some((step) => pathname.endsWith(step.url));
                const Icon = Icons[`man${index + 1}`];

                return (
                    <li key={step.name} className="relative overflow-hidden lg:flex-1">
                        <div>
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "absolute left-0 top-0 h-full w-1 bg-muted-foreground/60 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full",
                                    { "bg-foreground": isCurrent, "bg-primary": isCompleted }
                                )}
                            />

                            <span className={cn(
                                "flex items-center px-6 py-4 text-sm font-medium",
                                index !== 0 ? "lg:pl-9" : "",
                            )}>
                                <span className="flex-shrink-0">
                                    <Icon
                                        className={cn(
                                            "flex w-20 h-20 object-contain items-center justify-center",
                                            {
                                                "border-none": isCompleted,
                                                "border-foreground": isCurrent,
                                            }
                                        )}
                                    />
                                </span>

                                <span className="ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center">
                                    <span className={cn(
                                        "text-sm font-semibold text-foreground",
                                        {
                                            "text-foreground": isCurrent,
                                            "text-primary": isCompleted,
                                        }
                                    )}>
                                        {step.name}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {step.description}
                                    </span>
                                </span>
                            </span>

                            {index !== 0 ? (
                                <div className="absolute inset-0 hidden w-3 lg:block">
                                    <svg
                                        className='h-full w-full text-slate-300'
                                        viewBox='0 0 12 82'
                                        fill='none'
                                        preserveAspectRatio='none'>
                                        <path
                                            d='M0.5 0V31L10.5 41L0.5 51V82'
                                            stroke='currentcolor'
                                            vectorEffect='non-scaling-stroke'
                                        />
                                    </svg>
                                </div>
                            ) : null}
                        </div>
                    </li>
                )
            })}
        </ol>
    )
};

export default Steps
