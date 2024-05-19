import { Icons, Phone, Reviews, Wrapper } from "@/components";
import { Button, buttonVariants } from "@/components/ui/Button";
import { ArrowRight, BadgeCheck, Check, CircleCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from 'react'

const HomePage = () => {
    return (
        <div className="bg-slate-50">
            <section className="">
                <Wrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
                    <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
                        <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                            <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                                <Image
                                    src="/cartoons/phone-cover-change.svg"
                                    alt="snake"
                                    width={1024}
                                    height={1024}
                                    className="w-full object-cover"
                                />
                            </div>
                            <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold text-5xl !leading-tight md:text-6xl lg:text-7xl">
                                Create a <span className="bg-primary text-background rounded-md px-2">Perfect</span> Phone Case Design
                            </h1>
                            <p className="text-lg mt-8 lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                                Elevate your design with a, <span className="font-semibold">one-of-a-kind</span> phone case that reflects your personality.
                                {/* TODO: Add a trade mark to show that the user we make phone cases with unused tree trunks to reduce carbon emission ⚡ */}
                            </p>

                            <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                                <div className="space-y-2">
                                    <li className="flex gap-1.5 items-center text-left">
                                        <Check className="text-primary w-5 h-5 shrink-0" />
                                        High-quality, eco-friendly materials
                                    </li>
                                    <li className="flex gap-1.5 items-center text-left">
                                        <Check className="text-primary w-5 h-5 shrink-0" />
                                        Crystal clear, vibrant prints with lifetime guarantee
                                    </li>
                                    <li className="flex gap-1.5 items-center text-left">
                                        <Check className="text-primary w-5 h-5 shrink-0" />
                                        Wide selection of designs to match any style
                                    </li>
                                    <li className="flex gap-1.5 items-center text-left">
                                        <Check className="text-primary w-5 h-5 shrink-0" />
                                        Easy-to-use design platform
                                    </li>
                                    <li className="flex gap-1.5 items-center text-left">
                                        <Check className="text-primary w-5 h-5 shrink-0" />
                                        Fast and affordable shipping
                                    </li>
                                </div>
                            </ul>

                            <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                                <div className="flex -space-x-4">
                                    <Image
                                        src="/users/1.jpg"
                                        alt="user"
                                        width={1024}
                                        height={1024}
                                        className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                                    />
                                    <Image
                                        src="/users/2.jpg"
                                        alt="user"
                                        width={1024}
                                        height={1024}
                                        className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                                    />
                                    <Image
                                        src="/users/3.jpg"
                                        alt="user"
                                        width={1024}
                                        height={1024}
                                        className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                                    />
                                    <Image
                                        src="/users/4.jpg"
                                        alt="user"
                                        width={1024}
                                        height={1024}
                                        className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                                    />
                                    <Image
                                        src="/users/5.jpg"
                                        alt="user"
                                        width={1024}
                                        height={1024}
                                        className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                                    />
                                </div>

                                <div className="flex flex-col justify-between items-center sm:items-start">
                                    <div className="flex gap-0.5">
                                        <Star className="w-4 h-4 text-primary fill-primary" />
                                        <Star className="w-4 h-4 text-primary fill-primary" />
                                        <Star className="w-4 h-4 text-primary fill-primary" />
                                        <Star className="w-4 h-4 text-primary fill-primary" />
                                        <Star className="w-4 h-4 text-primary fill-primary" />
                                    </div>

                                    <p className="text-sm"><span className="font-semibold">2.364</span> happy customers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
                        <div className="relative md:max-w-xl">
                            <Image
                                src="/your-image.svg"
                                alt="user"
                                width={1024}
                                height={1024}
                                className="w-40 left-64 -top-20 absolute select-none hidden sm:block lg:hidden xl:block"
                            />
                            <Image
                                src="/line.png"
                                alt="user"
                                width={1024}
                                height={1024}
                                className="absolute w-20 -left-6 -bottom-6 select-none"
                            />
                            <Phone img="/testimonials/1.jpg" className="w-64" />
                        </div>
                    </div>
                </Wrapper>
            </section>

            <section className="bg-slate-100 py-24">
                <Wrapper className="flex flex-col items-center gap-16 sm:gap-32">
                    <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
                        <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl sm:text-6xl">
                            What our{" "}
                            <span className="relative px-2">
                                customers <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-primary" />
                            </span>{" "}
                            say
                        </h2>
                        <Image
                            src="/cartoons/man-6.svg"
                            alt="snake"
                            width={1024}
                            height={1024}
                            className="w-24 order-[0] lg:order-2"
                        />
                    </div>

                    <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
                        <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                            <div className="flex gap-0.5 mb-2">
                                <Star className="w-4 h-4 text-primary fill-primary" />
                                <Star className="w-4 h-4 text-primary fill-primary" />
                                <Star className="w-4 h-4 text-primary fill-primary" />
                                <Star className="w-4 h-4 text-primary fill-primary" />
                                <Star className="w-4 h-4 text-primary fill-primary" />
                            </div>
                            <div className="text-lg leading-8">
                                <p>
                                    "Absolutely love my custom phone case! The design is perfect and the print quality is top-notch. The case fits my phone perfectly and feels incredibly durable. Highly recommend!"
                                </p>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <Image
                                    src="/users/1.jpg"
                                    alt="user"
                                    width={1024}
                                    height={1024}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <p className="font-semibold">Shreyas</p>
                                    <div className="flex gap-1.5 items-center text-muted-foreground">
                                        <BadgeCheck className="w-4 h-4 text-primary" />
                                        <p className="text-sm">Verified Purchase</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                            <div className="flex gap-0.5 mb-2">
                                <Star className="w-4 h-4 text-primary fill-primary" />
                                <Star className="w-4 h-4 text-primary fill-primary" />
                                <Star className="w-4 h-4 text-primary fill-primary" />
                                <Star className="w-4 h-4 text-primary fill-primary" />
                                <Star className="w-4 h-4 text-primary fill-primary" />
                            </div>
                            <div className="text-lg leading-8">
                                <p>
                                    "Couldn't be happier with my custom phone case! The design exceeded my expectations, and the print quality is fantastic. The case feels sturdy and fits my phone perfectly. Highly recommend!"
                                </p>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <Image
                                    src="/users/2.jpg"
                                    alt="user"
                                    width={1024}
                                    height={1024}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <p className="font-semibold">Radha</p>
                                    <div className="flex gap-1.5 items-center text-muted-foreground">
                                        <BadgeCheck className="w-4 h-4 text-primary" />
                                        <p className="text-sm">Verified Purchase</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Wrapper>

                <div className="py-16">
                    <Reviews />
                </div>
            </section>

            <section className="">
                <Wrapper className="py-24">
                    <div className="mb-12 px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl sm:text-center">
                            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl sm:text-6xl">
                                Upload your photo and get{" "}
                                <span className="relative px-2 bg-primary rounded-md text-background">
                                    your own case
                                </span>{" "}
                                now
                            </h2>
                        </div>
                    </div>

                    <div className="mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
                            <div className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0 lg:pl-12">
                                <Icons.arrow className="w-28 h-auto" />
                            </div>

                            <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-muted/5 lg:rounded-2xl">
                                <Image
                                    src="/girl.jpg"
                                    alt="girl"
                                    width={2048}
                                    height={2048}
                                    className="rounded-md object-cover bg-background shadow-2xl ring-1 ring-muted/10 h-full w-full"
                                />
                            </div>

                            <div className="col-span-1 w-full mx-auto max-w-xs">
                                <Phone img="/new-girl.jpg" className="w-60" />
                            </div>
                        </div>
                    </div>

                    <ul className="mx-auto mt-12 max-w-fit sm:text-lg space-y-2 flex flex-col items-start justify-center">
                        <li className="w-fit flex items-center">
                            <CircleCheck className="w-5 h-5 text-primary inline mr-1.5" />
                            High-quality, eco-friendly materials
                        </li>
                        <li className="w-fit flex items-center">
                            <CircleCheck className="w-5 h-5 text-primary inline mr-1.5" />
                            Crystal clear, vibrant prints with lifetime guarantee
                        </li>
                        <li className="w-fit flex items-center">
                            <CircleCheck className="w-5 h-5 text-primary inline mr-1.5" />
                            Wide selection of designs to match any style
                        </li>
                        <li className="w-fit flex items-center">
                            <CircleCheck className="w-5 h-5 text-primary inline mr-1.5" />
                            Easy-to-use design platform
                        </li>
                    </ul>
                    <div className="flex justify-center pt-8">
                        <Link href="/configure/upload" className={buttonVariants({ size: "lg" })}>
                            Create your case now
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                    </div>
                </Wrapper>
            </section>
        </div>
    )
};

export default HomePage
