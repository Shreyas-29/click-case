"use client";

import React, { useRef, useState } from 'react'
import { AspectRatio } from "./ui/AspectRatio";
import NextImage from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { Rnd } from "react-rnd";
import HandleComponent from "./HandleComponent";
import { ScrollArea } from "./ui/ScrollArea";
import { RadioGroup } from '@headlessui/react';
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/lib/validators/option";
import { Label } from "./ui/Label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { Button } from "./ui/Button";
import { ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { BASE_PRICE } from "@/config";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { saveConfig, SaveConfigProps } from "@/actions";
import { useRouter } from "next/navigation";
import DotsLoader from "./DotsLoader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

interface Props {
    configId: string;
    url: string;
    dimensions: {
        width: number;
        height: number;
    }
}

const DesignConfig = ({
    url,
    configId,
    dimensions,
}: Props) => {

    const router = useRouter();

    const phoneCaseRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { startUpload } = useUploadThing("imageUploader");

    const [options, setOptions] = useState<{
        color: (typeof COLORS)[number]
        model: (typeof MODELS.iPhone[number] | typeof MODELS.samsung[number])
        material: (typeof MATERIALS.options)[number]
        finish: (typeof FINISHES.options)[number]
    }>({
        color: COLORS[0],
        model: MODELS.iPhone[0],
        material: MATERIALS.options[0],
        finish: FINISHES.options[0],
    });

    const [renderedDimension, setRenderedDimension] = useState({
        width: dimensions.width / 4,
        height: dimensions.height / 4,
    });

    const [renderedPosition, setRenderedPosition] = useState({
        x: 150,
        y: 205,
    });

    const base64ToBlob = (base64: string, mimeType: string) => {
        // converting base64 into bytes
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            // getting the char code of each character
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        };

        // taking the original string and converting it into a blob
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };

    const handleSaveConfiguration = async () => {
        try {
            const { top: topLeft, left: caseLeft, width, height } = phoneCaseRef.current!.getBoundingClientRect();
            const { top: containerTop, left: containerLeft } = containerRef.current!.getBoundingClientRect();

            const leftOffset = caseLeft - containerLeft;
            const topOffset = topLeft - containerTop;

            const actualX = renderedPosition.x - leftOffset;
            const actualY = renderedPosition.y - topOffset;

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");

            const userImage = new Image();
            userImage.crossOrigin = "anonymous";
            userImage.src = url;

            // waiting if image is loaded
            await new Promise((resolve) => userImage.onload = resolve);

            // completely render and track the image
            ctx?.drawImage(
                userImage,
                actualX,
                actualY,
                renderedDimension.width,
                renderedDimension.height
            );

            // now convert the canvas to base64
            const base64 = canvas.toDataURL();
            // we need to split the base64 data from the header
            const base64Data = base64.split(",")[1];

            // now convert the base64 data to a blob
            const blob = base64ToBlob(base64Data, "image/png");
            // creating a file from the blob
            const file = new File([blob], "filename.png", { type: "image/png" });

            // we are passing the configId because we have already config so now we are updating it
            await startUpload([file], { configId });
        } catch (error) {
            toast.error("Something went wrong", {
                description: "There was an error while saving the configuration",
            });
        }
    };

    const { mutate: _saveConfig, isPending } = useMutation({
        mutationKey: ["save-config"],
        mutationFn: async (payload: SaveConfigProps) => {
            await Promise.all([handleSaveConfiguration(), saveConfig(payload)])
        },
        onError: () => {
            toast.error("Something went wrong", {
                description: "There was an error on our end while saving the configuration",
            });
        },
        onSuccess: () => {
            router.push(`/configure/preview?id=${configId}`);
        },
    });

    return (
        <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
            <div ref={containerRef} className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mb-8 lg:mb-0">
                <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
                    <AspectRatio
                        ref={phoneCaseRef}
                        ratio={896 / 1831}
                        className="pointer-events-none aspect-[896/1831] relative z-50 w-full"
                    >
                        <NextImage
                            src="/phone-template.png"
                            alt="phone-case"
                            fill
                            className="pointer-events-none z-50 select-none"
                        />
                    </AspectRatio>
                    <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]"></div>
                    <div className={cn(
                        "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
                        `bg-${options.color.color}`
                    )}></div>
                </div>

                <Rnd
                    lockAspectRatio
                    disableDragging={isPending}
                    default={{
                        x: 150,
                        y: 205,
                        width: dimensions.width / 4,
                        height: dimensions.height / 4,
                    }}
                    resizeHandleComponent={{
                        bottomRight: <HandleComponent />,
                        bottomLeft: <HandleComponent />,
                        topRight: <HandleComponent />,
                        topLeft: <HandleComponent />,
                    }}
                    onResizeStop={(_, __, ref, ___, { x, y }) => {
                        setRenderedDimension({
                            width: parseInt(ref.style.width.slice(0, -2)),
                            height: parseInt(ref.style.height.slice(0, -2)),
                        });
                        setRenderedPosition({ x, y });
                    }}
                    onDragStop={(_, data) => {
                        const { x, y } = data;
                        setRenderedPosition({ x, y });
                    }}
                    className="absolute z-20 border-[3px] border-primary disabled:opacity-50"
                >
                    <div className="relative w-full h-full cursor-grab">
                        <NextImage
                            src={url}
                            alt="your-image"
                            fill
                            className="pointer-events-none"
                        />
                    </div>
                </Rnd>
            </div>

            <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-background">
                <ScrollArea className="relative flex-1 overflow-auto">
                    <div aria-hidden="true" className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background pointer-events-none"></div>

                    <div className="px-8 pb-12 pt-8 md:pt-0">
                        <h2 className="tracking-tight font-bold text-3xl">
                            Customize your case
                        </h2>

                        <div className="w-full h-px bg-border my-6"></div>

                        <div className="relative mt-4 h-full flex flex-col justify-between">
                            <div className="flex flex-col gap-6">
                                <RadioGroup
                                    value={options.color}
                                    disabled={isPending}
                                    onChange={(val) => {
                                        setOptions((prev) => ({
                                            ...prev,
                                            color: val,
                                        }))
                                    }}
                                >
                                    <Label>
                                        Color: {options.color.label}
                                    </Label>
                                    <div className="mt-3 grid grid-cols-6 place-items-center gap-3">
                                        {COLORS.map((color) => (
                                            <RadioGroup.Option
                                                key={color.label}
                                                value={color}
                                                disabled={isPending}
                                                className={({ active, checked }) => cn(
                                                    "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                                                    {
                                                        [`border-${color.color}`]: active || checked
                                                    }
                                                )}
                                            >
                                                <span className={cn(
                                                    "w-8 h-8 rounded-full border border-foreground/10",
                                                    `bg-${color.color}`
                                                )}></span>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>

                                <div className="relative flex flex-col gap-3 w-full">
                                    <Label>Model</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild disabled={isPending}>
                                            <Button variant="outline" role="combobox" className="w-full justify-between">
                                                {options.model.label}
                                                <ChevronDown className="ml-2 w-4 h-4 shrink-0 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full">
                                            <Tabs defaultValue="iphone" className="w-full max-w-sm">
                                                <TabsList className="w-full flex">
                                                    <TabsTrigger
                                                        value="iphone"
                                                        disabled={isPending}
                                                        className="w-full flex-[0.5]"
                                                    >
                                                        iPhone
                                                    </TabsTrigger>
                                                    <TabsTrigger
                                                        value="samsung"
                                                        disabled={isPending}
                                                        className="w-full flex-[0.5]"
                                                    >
                                                        Samsung
                                                    </TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="iphone" className="grid grid-cols-2 gap-x-2 gap-y-1 w-full">
                                                    {MODELS.iPhone.map((model) => (
                                                        <DropdownMenuItem
                                                            key={model.label}
                                                            className={cn(
                                                                "flex text-sm gap-1 items-center p-1.5 cursor-pointer w-full hover:bg-slate-100 capitalize",
                                                                {
                                                                    "bg-slate-100": model.label === options.model.label
                                                                }
                                                            )}
                                                            onClick={() => {
                                                                setOptions((prev) => ({ ...prev, model }));
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "w-4 h-4 mr-2",
                                                                    model.label === options.model.label ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {model.label}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </TabsContent>
                                                <TabsContent value="samsung" className="grid grid-cols-2 gap-x-2 gap-y-1 w-full">
                                                    {MODELS.samsung.map((model) => (
                                                        <DropdownMenuItem
                                                            key={model.label}
                                                            className={cn(
                                                                "flex text-sm gap-1 items-center p-1.5 cursor-pointer w-full hover:bg-slate-100 capitalize",
                                                                {
                                                                    "bg-slate-100": model.label === options.model.label
                                                                }
                                                            )}
                                                            onClick={() => {
                                                                setOptions((prev) => ({ ...prev, model }));
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "w-4 h-4 mr-2",
                                                                    model.label === options.model.label ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {model.label}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </TabsContent>
                                            </Tabs>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {[MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
                                    <RadioGroup
                                        key={name}
                                        value={options[name]}
                                        onChange={(val) => {
                                            setOptions((prev) => ({
                                                ...prev,
                                                // name: material or finish
                                                [name]: val,
                                            }))
                                        }}
                                    >
                                        <Label>
                                            {name.slice(0, 1).toUpperCase() + name.slice(1)}
                                        </Label>
                                        <div className="mt-3 space-y-4">
                                            {selectableOptions.map((option) => (
                                                <RadioGroup.Option
                                                    key={option.value}
                                                    value={option}
                                                    disabled={isPending}
                                                    className={({ active, checked }) => cn(
                                                        "relative block cursor-pointer rounded-lg bg-background px-6 py-4 shadow-sm border-2 border-border focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between disabled:opacity-50",
                                                        {
                                                            "border-primary": active || checked
                                                        }
                                                    )}
                                                >
                                                    <span className="flex items-center">
                                                        <span className="flex flex-col text-sm">
                                                            <RadioGroup.Label as="span" className="font-medium text-foreground">
                                                                {option.label}
                                                            </RadioGroup.Label>

                                                            {option.description ? (
                                                                <RadioGroup.Description as="span" className="text-muted-foreground">
                                                                    <span className="block sm:inline">
                                                                        {option.description}
                                                                    </span>
                                                                </RadioGroup.Description>
                                                            ) : null}
                                                        </span>
                                                    </span>

                                                    <RadioGroup.Description as="span" className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
                                                        <span className="font-medium text-foreground">
                                                            {formatPrice(option.price / 100)}
                                                        </span>
                                                    </RadioGroup.Description>
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <div className="w-full px-8 h-16 bg-background">
                    <div className="h-px w-full bg-border"></div>
                    <div className="w-full h-full flex items-center justify-end">
                        <div className="w-full flex gap-6 items-center">
                            <p className="font-medium whitespace-nowrap w-16">
                                {formatPrice((BASE_PRICE + options.finish.price + options.material.price) / 100)}
                            </p>
                            <Button
                                disabled={isPending}
                                onClick={() => _saveConfig({
                                    configId,
                                    color: options.color.value,
                                    model: options.model.value,
                                    finish: options.finish.value,
                                    material: options.material.value,
                                })}
                                className="w-full flex-1"
                            >
                                {isPending ? (
                                    <DotsLoader />
                                ) : (
                                    <>
                                        Continue
                                        <ArrowRight className="w-4 h-4 ml-1.5 inline" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DesignConfig
