"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

const createCheckoutSession = async ({ configId }: { configId: string }) => {
    try {
        const configuration = await db.configuration.findUnique({
            where: {
                id: configId,
            },
        });

        if (!configuration) {
            throw new Error("No such configuration found");
        }

        // console.log("I am started!");

        const { getUser } = getKindeServerSession();

        const user = await getUser();

        if (!user) {
            throw new Error("User not found");
        }

        const { finish, material } = configuration;

        let price = BASE_PRICE;

        if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
        if (material === "polycarbonate") price += PRODUCT_PRICES.material.polycarbonate;

        let order: Order | undefined = undefined;

        const existingOrder = await db.order.findFirst({
            where: {
                userId: user.id,
                configurationId: configuration.id,
            },
        });

        // console.log("existing-order", existingOrder);

        if (existingOrder) {
            order = existingOrder;
        } else {
            order = await db.order.create({
                data: {
                    userId: user.id,
                    configurationId: configuration.id,
                    amount: price / 100,
                },
            });
        }

        // console.log("new-order", order);

        const product = await stripe.products.create({
            name: "Custom iPhone Case",
            images: [configuration.url],
            default_price_data: {
                currency: "USD",
                unit_amount: price,
            },
        });
        // console.log("product", product);

        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
            payment_method_types: ["card"],
            mode: "payment",
            shipping_address_collection: {
                allowed_countries: ["IN", "US"],
            },
            metadata: {
                userId: user.id,
                orderId: order.id,
            },
            line_items: [{
                price: product.default_price as string,
                quantity: 1,
            }],
        });

        // // check if the currency is INR
        // if (session.currency === "INR") {
        //     session.shipping_address_collection = {
        //         allowed_countries: ["IN"],
        //     }
        // } else {
        //     session.billing_address_collection = "auto";
        // }

        return { url: session.url };
    } catch (error: any) {
        console.error(error);
        return { error: error.message };
    }
};

export default createCheckoutSession;
