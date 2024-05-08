import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
    try {
        const body = await request.text();

        const signature = headers().get("stripe-signature");

        if (!signature) {
            return new Response("Invalid signature", { status: 400 });
        }

        const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

        if (event.type === "checkout.session.completed") {
            if (!event.data.object.customer_details?.email) {
                throw new Error("No email found");
            }

            const session = event.data.object as Stripe.Checkout.Session;

            const { userId, orderId } = session.metadata || {
                userId: "",
                orderId: "",
            };

            if (!userId || !orderId) {
                throw new Error("No user or order found");
            }

            const billingAddress = session.customer_details!.address;
            const shippingAddress = session.shipping_details!.address;

            await db.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    isPaid: true,
                    shippingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            // city: billingAddress!.city!,
                            country: shippingAddress!.country!,
                            postalCode: shippingAddress!.postal_code!,
                            street: shippingAddress!.line1!,
                            state: shippingAddress!.state!,
                        }
                    },
                    billingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            // city: billingAddress!.city!,
                            country: shippingAddress!.country!,
                            postalCode: shippingAddress!.postal_code!,
                            street: shippingAddress!.line1!,
                            state: shippingAddress!.state!,
                        },
                    },
                },
            });
        };

        return NextResponse.json({ result: event, ok: true });

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", ok: false }, { status: 500 });
    }
};
