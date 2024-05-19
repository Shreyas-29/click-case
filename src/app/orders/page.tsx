import React from 'react'
import type { Metadata } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Orders, Wrapper } from "@/components";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Dashboard",
};

const OrdersPage = async () => {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const orders = await db.order.findMany({
        where: {
            userId: user?.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: true,
            configuration: true,
            billingAddress: true,
            shippingAddress: true,
        },
    });

    if (!user) {
        return notFound();
    }

    if (orders === undefined) {
        return (
            <div className="flex items-center justify-center h-screen pt-20">
                <Loader2 className="w-5 h-5 text-muted-foreground" />
                <p className="text-lg mt-2 font-semibold text-foreground">
                    Getting your orders...
                </p>
            </div>
        )
    };

    if (!orders) {
        return (
            <div className="flex items-center justify-center h-screen pt-20">
                <p className="text-2xl font-semibold text-muted-foreground">No orders found</p>
            </div>
        )
    };

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <Wrapper>
                <div className="w-full flex flex-col sm:gap-4 sm:py-8">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Your Orders
                    </h1>
                </div>

                <Orders orders={orders} />

            </Wrapper>
        </div>
    )
};

export default OrdersPage
