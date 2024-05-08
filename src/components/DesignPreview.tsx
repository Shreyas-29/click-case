"use client";

import React, { useEffect, useState } from 'react';
import Confetti from "react-dom-confetti";
import Phone from "./Phone";
import { Configuration } from "@prisma/client";
import { COLORS, FINISHES, MODELS } from "@/lib/validators/option";
import { cn, formatPrice } from "@/lib/utils";
import { ArrowRight, CircleCheck, Truck } from "lucide-react";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "@/actions";
import { toast } from "sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import AuthModal from "./AuthModal";

interface Props {
    configuration: Configuration;
}

const DesignPreview = ({ configuration }: Props) => {

    const router = useRouter();

    const { user } = useKindeBrowserClient();

    const { id, color, model, finish, material } = configuration;

    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => setShowConfetti(true), []);

    const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw;

    const { label: modelLabel } = MODELS.options.find(({ value }) => value === model)!;

    let totalPrice = BASE_PRICE;

    if (material === "polycarbonate") totalPrice += PRODUCT_PRICES.material.polycarbonate;
    if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;

    const { mutate: createPaymentSession, isPending } = useMutation({
        mutationKey: ["get-checkout-session"],
        mutationFn: createCheckoutSession,
        onError: () => {
            toast.error("Something went wrong", {
                description: "There was an error processing your order. Please try again later."
            });
        },
        onSuccess: ({ url }) => {
            if (url) router.push(url);
            else throw new Error("No checkout URL found");
        },
    });
    console.log("user", user);

    const handleCheckout = async () => {
        console.log("clicked")
        if (user) {
            const res = await createCheckoutSession({ configId: id });
            if (res.error) {
                toast.error("Something went wrong", {
                    description: "There was an error processing your order. Please try again later."
                });
            } else if (res.url) {
                router.push(res.url);
                toast.success("You are being redirected to the checkout page...");
            }
        } else {
            localStorage.setItem("configurationId", id);
            setIsOpen(true);
        }
    };

    return (
        <>
            <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute inset-0 overflow-hidden flex h-full justify-center z-30"
            >
                <Confetti
                    active={showConfetti}
                    config={{ elementCount: 250, spread: 120 }}
                />
            </div>

            <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-12 text-sm sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
                <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
                    <Phone
                        img={configuration.croppedImageUrl!}
                        className={cn(`bg-${tw}`)}
                    />
                </div>

                <div className="mt-6 sm:col-span-9 md:mt-0 md:row-end-1">
                    <h3 className="text-3xl font-bold tracking-tight">
                        Your {modelLabel} Case
                    </h3>
                    <div className="mt-3 flex items-center gap-1.5 text-base">
                        <CircleCheck className="w-4 h-4 text-primary" />
                        In stock and ready to ship
                    </div>
                </div>

                <div className="sm:col-span-12 md:col-span-9 text-base">
                    <div className="grid grid-cols-1 gap-y-8 border-b border-border py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                        <div>
                            <p className="font-medium">
                                Highlights
                            </p>
                            <ol className="mt-3 text-foreground/60 list-disc list-inside">
                                <li>
                                    Supports wireless charging
                                </li>
                                <li>
                                    Sleek and lightweight design
                                </li>
                                <li>
                                    Enhanced screen protection
                                </li>
                                <li>
                                    Precise cutouts for ports and buttons
                                </li>
                                <li>
                                    Backed by a 5-year warranty
                                </li>
                            </ol>
                        </div>
                        <div>
                            <p className="font-medium">
                                Materials
                            </p>
                            <ol className="mt-3 text-foreground/60 list-disc list-inside">
                                <li>
                                    High-quality {configuration.material} finish
                                </li>
                                <li>
                                    Thoughtful cutouts for seamless access
                                </li>
                                <li>
                                    Smooth texture for a comfortable grip
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="bg-neutral-50 p-6 sm:rounded-lg sm:p-8">
                            <div className="flow-root text-sm">
                                <div className="flex items-center justify-between py-1 mt-2">
                                    <p className="text-muted-foreground">
                                        Base price
                                    </p>
                                    <p className="font-medium">
                                        {formatPrice(BASE_PRICE / 100)}
                                    </p>
                                </div>

                                {finish === "textured" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground">
                                            Textured finish
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {material === "polycarbonate" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground">
                                            Polycarbonate material
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                <div className="my-2 h-px w-full bg-border"></div>

                                <div className="flex items-center justify-between py-1 mt-2">
                                    <p className="font-semibold">
                                        Order Total
                                    </p>
                                    <p className="font-bold">
                                        {formatPrice(totalPrice / 100)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end pb-12">
                            <Button
                                isLoading={isPending}
                                disabled={isPending}
                                loadingText="Processing"
                                onClick={() => handleCheckout()}
                                className="px-4 sm:px-6 lg:px-8"
                            >
                                Continue to Checkout
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default DesignPreview
