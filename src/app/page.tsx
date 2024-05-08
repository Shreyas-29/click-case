import { Icons, Phone, Reviews, Wrapper } from "@/components";
import { Button } from "@/components/ui/Button";
import { ArrowRight, BadgeCheck, Check, CircleCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from 'react'

const HomePage = () => {
    return (
        <div className="bg-neutral-50">
            <section className="">
                <Wrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
                    <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
                        <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
                            <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                                <Image
                                    src="/snake-1.png"
                                    alt="snake"
                                    width={1024}
                                    height={1024}
                                    className="w-full object-cover"
                                />
                            </div>
                            <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold text-5xl !leading-tight md:text-6xl lg:text-7xl">
                                Your Image on a <span className="bg-primary text-background rounded-md px-2">Custom</span> Phone Case
                            </h1>
                            <p className="text-lg mt-8 lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                                Capture your favorite memories with your own, <span className="font-semibold">one-of-one</span> phone case.
                            </p>

                            <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                                <div className="space-y-2">
                                    <li className="flex gap-1.5 items-center text-left">
                                        <Check className="text-primary w-5 h-5 shrink-0" />
                                        High-quality, durable material
                                    </li>
                                    <li className="flex gap-1.5 items-center text-left">
                                        <Check className="text-primary w-5 h-5 shrink-0" />
                                        5 year print guarantee
                                    </li>
                                    <li className="flex gap-1.5 items-center text-left">
                                        <Check className="text-primary w-5 h-5 shrink-0" />
                                        Modern iPhone models supported
                                    </li>
                                </div>
                            </ul>

                            <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                                <div className="flex -space-x-4">
                                    <Image
                                        src="/users/user-1.png"
                                        alt="user"
                                        width={1024}
                                        height={1024}
                                        className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                                    />
                                    <Image
                                        src="/users/user-2.png"
                                        alt="user"
                                        width={1024}
                                        height={1024}
                                        className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                                    />
                                    <Image
                                        src="/users/user-3.png"
                                        alt="user"
                                        width={1024}
                                        height={1024}
                                        className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                                    />
                                    <Image
                                        src="/users/user-4.jpg"
                                        alt="user"
                                        width={1024}
                                        height={1024}
                                        className="w-10 h-10 inline-block rounded-full ring-2 ring-muted object-cover"
                                    />
                                    <Image
                                        src="/users/user-5.jpg"
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

                                    <p className="text-sm"><span className="font-semibold">1.268</span> happy customers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
                        <div className="relative md:max-w-xl">
                            <Image
                                src="/your-image.png"
                                alt="user"
                                width={1024}
                                height={1024}
                                className="w-40 lg:w-52 left-56 -top-20 absolute select-none hidden sm:block lg:hidden xl:block"
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

            <section className="bg-neutral-100 py-24">
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
                            src="/snake-2.png"
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
                                <p className="">
                                    "The case feels durable and I love the design. The print quality is amazing and the case fits my phone perfectly. I would definitely recommend this to anyone looking for a custom phone case."
                                </p>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <Image
                                    src="/users/user-1.png"
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
                                <p className="">
                                    "I love the case! The print quality is amazing and the case feels very durable. The case fits my phone perfectly and I love the design. I would definitely recommend this custom phone case."
                                </p>
                            </div>
                            <div className="flex gap-4 mt-2">
                                <Image
                                    src="/users/user-2.png"
                                    alt="user"
                                    width={1024}
                                    height={1024}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <p className="font-semibold">Varun</p>
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
                                <Image
                                    src="/arrow.png"
                                    alt="arrow"
                                    width={1024}
                                    height={1024}
                                    className="w-32 h-auto"
                                />
                            </div>

                            <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-muted/5 lg:rounded-2xl">
                                <Image
                                    src="/horse.jpg"
                                    alt="horse"
                                    width={1024}
                                    height={1024}
                                    className="rounded-md object-cover bg-background shadow-2xl ring-1 ring-muted/10 h-full w-full"
                                />
                            </div>

                            <div className="col-span-1 w-full mx-auto max-w-xs">
                                <Phone img="/horse_phone.jpg" className="w-60" />
                            </div>
                        </div>
                    </div>

                    <ul className="mx-auto mt-12 max-w-fit sm:text-lg space-y-2 flex flex-col items-start justify-center">
                        <li className="w-fit flex items-center">
                            <CircleCheck className="w-5 h-5 text-primary inline mr-1.5" />
                            High-quality silicone material
                        </li>
                        <li className="w-fit flex items-center">
                            <CircleCheck className="w-5 h-5 text-primary inline mr-1.5" />
                            Scratch and fingerprint resistant coating
                        </li>
                        <li className="w-fit flex items-center">
                            <CircleCheck className="w-5 h-5 text-primary inline mr-1.5" />
                            Wireless charging compatible
                        </li>
                        <li className="w-fit flex items-center">
                            <CircleCheck className="w-5 h-5 text-primary inline mr-1.5" />
                            5 year print warranty
                        </li>
                    </ul>
                    <div className="flex justify-center pt-8">
                        <Button size="lg">
                            <Link href="/configure/upload">
                                Create your case now
                                <ArrowRight className="w-4 h-4 ml-1.5" />
                            </Link>
                        </Button>
                    </div>
                </Wrapper>
            </section>
        </div>
    )
};

export default HomePage
