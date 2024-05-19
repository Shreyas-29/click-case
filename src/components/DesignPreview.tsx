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
import DotsLoader from "./DotsLoader";

interface Props {
    configuration: Configuration;
}

const DesignPreview = ({ configuration }: Props) => {

    const router = useRouter();

    const { user } = useKindeBrowserClient();

    const { id, color, model, finish, material } = configuration;

    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);

    useEffect(() => setShowConfetti(true), []);

    const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.color;

    const getModelLabel = (modelValue: string): string => {
        const iPhoneModel = MODELS.iPhone.find(({ value }) => value === modelValue);
        if (iPhoneModel) {
            return iPhoneModel.label;
        }

        const samsungModel = MODELS.samsung.find(({ value }) => value === modelValue);
        if (samsungModel) {
            return samsungModel.label;
        }

        return '';
    };

    // const { label: modelLabel } = MODELS.options.find(({ value }) => value === model)!;
    const modelLabel = getModelLabel(model!)!;

    let totalPrice = BASE_PRICE;

    const SHIPPING_PRICE = 0;

    if (finish === "textured") {
        totalPrice += PRODUCT_PRICES.finish.textured;
    } else if (finish === "brushed") {
        totalPrice += PRODUCT_PRICES.finish.brushed;
    } else if (finish === "frosted") {
        totalPrice += PRODUCT_PRICES.finish.frosted;
    } else if (finish === "glossy") {
        totalPrice += PRODUCT_PRICES.finish.glossy;
    } else if (finish === "matte") {
        totalPrice += PRODUCT_PRICES.finish.matte;
    } else if (finish === "smooth") {
        totalPrice += PRODUCT_PRICES.finish.smooth;
    } else if (finish === "transparent") {
        totalPrice += PRODUCT_PRICES.finish.transparent;
    }

    if (material === "polycarbonate") {
        totalPrice += PRODUCT_PRICES.material.polycarbonate;
    } else if (material === "carbon_fiber") {
        totalPrice += PRODUCT_PRICES.material.carbon_fiber;
    } else if (material === "leather") {
        totalPrice += PRODUCT_PRICES.material.leather;
    } else if (material === "metal") {
        totalPrice += PRODUCT_PRICES.material.metal;
    } else if (material === "sillicone") {
        totalPrice += PRODUCT_PRICES.material.polycarbonate;
    }

    const handleCheckout = async () => {
        setIsPending(true);
        try {
            if (user) {
                const res = await createCheckoutSession({ configId: id });
                if (res.error) {
                    toast.error("Something went wrong", {
                        description: "There was an error processing your order. Please try again later."
                    });
                } else if (res.url) {
                    const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Clickcase' }), 2000));
                    router.push(res.url);
                    toast.promise(promise(), {
                        loading: "Redirecting you to the checkout page...",
                        success: "You're being redirected to the checkout page...",
                        error: "There was an error processing your order. Please try again later."
                    });
                }
            } else {
                localStorage.setItem("configurationId", id);
                setIsOpen(true);
            }
        } catch (error) {
            toast.error("Something went wrong", {
                description: "There was an error processing your order. Please try again later."
            });
        } finally {
            setIsPending(false);
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

            <div className="mt-20 flex flex-col items-center md:grid sm:grid-cols-12 text-sm sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
                <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
                    <Phone
                        img={configuration.croppedImageUrl!}
                        className={cn(`bg-${tw} max-w-[150px] md:max-w-full`)}
                    />
                </div>

                <div className="mt-6 sm:col-span-9 md:row-end-1">
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
                        <div className="bg-slate-50 p-6 sm:rounded-lg sm:p-8">
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
                                        <p className="text-muted-foreground capitalize">
                                            Textured finish
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {finish === "brushed" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground capitalize">
                                            Brushed finish
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.finish.brushed / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {finish === "frosted" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground capitalize">
                                            frosted finish
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.finish.frosted / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {finish === "glossy" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground capitalize">
                                            glossy finish
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.finish.glossy / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {finish === "matte" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground capitalize">
                                            matte finish
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.finish.matte / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {finish === "smooth" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground capitalize">
                                            smooth finish
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.finish.smooth / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {finish === "textured" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground capitalize">
                                            textured finish
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {finish === "transparent" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground capitalize">
                                            transparent finish
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.finish.transparent / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {material === "polycarbonate" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground capitalize">
                                            Polycarbonate material
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {material === "metal" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground capitalize">
                                            metal material
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.material.metal / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {material === "leather" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground capitalize">
                                            leather material
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.material.leather / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                {material === "carbon_fiber" ? (
                                    <div className="flex items-center justify-between py-1 mt-2">
                                        <p className="text-muted-foreground capitalize">
                                            carbon fiber material
                                        </p>
                                        <p className="font-medium">
                                            {formatPrice(PRODUCT_PRICES.material.carbon_fiber / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                <div className="flex items-center justify-between py-1 mt-2">
                                    <p className="text-muted-foreground capitalize">
                                        Shipping
                                    </p>
                                    <p className="font-medium">
                                        {formatPrice(SHIPPING_PRICE)}
                                    </p>
                                </div>

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
                                disabled={isPending}
                                onClick={() => handleCheckout()}
                                className="px-4 sm:px-6 lg:px-8 w-44"
                            >
                                {isPending ? (
                                    <DotsLoader />
                                ) : (
                                    <>
                                        Continue to Checkout
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default DesignPreview
