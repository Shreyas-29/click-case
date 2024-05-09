"use server";

import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

const updateOrderStatus = async ({ id, newStatus }: { id: string, newStatus: OrderStatus }) => {
    try {
        await db.order.update({
            where: {
                id,
            },
            data: {
                status: newStatus,
            },
        });
    } catch (error) {
        console.log("Error updating status", error);
    }
};

export default updateOrderStatus;
