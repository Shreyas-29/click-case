"use server";

import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const getPaymentStatus = async (orderId: string) => {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user?.id || !user.email) {
            throw new Error("You are not authenticated.");
        }

        const order = await db.order.findFirst({
            where: {
                id: orderId,
                userId: user.id,
            },
            include: {
                user: true,
                configuration: true,
                billingAddress: true,
                shippingAddress: true,
            },
        });

        if (!order) {
            throw new Error("Order not found.");
        }

        if (order.isPaid) {
            return order;
        } else {
            return false;
        }

    } catch (error) {
        console.error(error);
        return false;
    }
};

export default getPaymentStatus;
