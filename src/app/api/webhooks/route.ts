// import { db } from "@/lib/db";
// import { stripe } from "@/lib/stripe";
// import { headers } from "next/headers";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// export async function POST(request: Request) {
//     try {
//         const body = await request.text();

//         const signature = headers().get("stripe-signature");

//         if (!signature) {
//             return new Response("Invalid signature", { status: 400 });
//         }

//         const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

//         if (event.type === "checkout.session.completed") {
//             if (!event.data.object.customer_details?.email) {
//                 throw new Error("No email found");
//             }

//             const session = event.data.object as Stripe.Checkout.Session;

//             const { userId, orderId } = session.metadata || {
//                 userId: "",
//                 orderId: "",
//             };

//             if (!userId || !orderId) {
//                 throw new Error("No user or order found");
//             }

//             const billingAddress = session.customer_details!.address;
//             const shippingAddress = session.shipping_details!.address;

//             await db.order.update({
//                 where: {
//                     id: orderId,
//                 },
//                 data: {
//                     isPaid: true,
//                     shippingAddress: {
//                         create: {
//                             name: session.customer_details!.name!,
//                             // @ts-ignore
//                             city: billingAddress!.city!,
//                             country: shippingAddress!.country!,
//                             postalCode: shippingAddress!.postal_code!,
//                             street: shippingAddress!.line1!,
//                             state: shippingAddress!.state!,
//                         }
//                     },
//                     billingAddress: {
//                         create: {
//                             name: session.customer_details!.name!,
//                             // @ts-ignore
//                             city: billingAddress!.city!,
//                             country: shippingAddress!.country!,
//                             postalCode: shippingAddress!.postal_code!,
//                             street: shippingAddress!.line1!,
//                             state: shippingAddress!.state!,
//                         },
//                     },
//                 },
//             });
//         };

//         return NextResponse.json({ result: event, ok: true });

//     } catch (error) {
//         return NextResponse.json({ message: "Something went wrong", ok: false }, { status: 500 });
//     }
// };
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { OrderEmail } from '@/components';

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const body = await req.text()
        const signature = headers().get('stripe-signature')

        console.log("signature", signature);

        if (!signature) {
            return new Response('Invalid signature', { status: 400 })
        }

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
        console.log("event", event);

        if (event.type === 'checkout.session.completed') {
            if (!event.data.object.customer_details?.email) {
                throw new Error('Missing user email')
            }

            const session = event.data.object as Stripe.Checkout.Session

            const { userId, orderId } = session.metadata || {
                userId: null,
                orderId: null,
            }

            if (!userId || !orderId) {
                throw new Error('Invalid request metadata')
            }

            const billingAddress = session.customer_details!.address
            const shippingAddress = session.shipping_details!.address

            const updatedOrder = await db.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    isPaid: true,
                    shippingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: shippingAddress!.city!,
                            country: shippingAddress!.country!,
                            postalCode: shippingAddress!.postal_code!,
                            street: shippingAddress!.line1!,
                            state: shippingAddress!.state,
                        },
                    },
                    billingAddress: {
                        create: {
                            name: session.customer_details!.name!,
                            city: billingAddress!.city!,
                            country: billingAddress!.country!,
                            postalCode: billingAddress!.postal_code!,
                            street: billingAddress!.line1!,
                            state: billingAddress!.state,
                        },
                    },
                },
            })

            await resend.emails.send({
                from: 'Clickcase <sihasaneshreyas@gmail.com>',
                to: [event.data.object.customer_details.email],
                subject: 'Thanks for your order!',
                react: OrderEmail({
                    orderId,
                    orderDate: updatedOrder.createdAt.toLocaleDateString(),
                    // @ts-ignore
                    shippingAddress: {
                        name: session.customer_details!.name!,
                        city: shippingAddress!.city!,
                        country: shippingAddress!.country!,
                        postalCode: shippingAddress!.postal_code!,
                        street: shippingAddress!.line1!,
                        state: shippingAddress!.state,
                    },
                }),
            })
        };

        return NextResponse.json({ result: event, ok: true })
    } catch (err) {
        console.error(err)

        return NextResponse.json(
            { message: 'Something went wrong', ok: false },
            { status: 500 }
        )
    }
};