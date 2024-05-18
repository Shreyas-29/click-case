import { ThankYou } from "@/components";
import React, { Suspense } from 'react'
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ExtendedOrder } from "@/types/order";

export const metadata: Metadata = {
    title: "Thank You",
};

interface Props {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}

const ThankYouPage = async ({ searchParams }: Props) => {

    const { orderId } = searchParams;

    console.log("id", orderId);

    // if (!id || typeof id !== "string") {
    //     return notFound();
    // };

    const order = await db.order.findFirst({
        where: {
            id: orderId as string,
        },
        include: {
            user: true,
            configuration: true,
            billingAddress: true,
            shippingAddress: true,
        },
    });

    console.log("order", order);

    return (
        <Suspense>
            <ThankYou order={order!} />
        </Suspense>
    )
};

export default ThankYouPage
