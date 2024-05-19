"use client";

import { ExtendedOrder } from "@/types/order";
import { Configuration, Order, OrderStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Phone from "../Phone";
import { formatPrice } from "@/lib/utils";

const formatModelName = (model: string) => {
    // Replace underscores with spaces, split the string by spaces, and capitalize each word
    return model
        .replace(/_/g, ' ') // Replace underscores with spaces
        .split(' ') // Split by spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join the words back into a single string
};

const formatStatus = (status: string) => {
    switch (status) {
        case "shipped":
            return "Shipped";
        case "fulfilled":
            return "C";
        case "awaiting_shipment":
            return "Waiting for Shipment";
    }
};
export type OrderColumn = ExtendedOrder & {
    id: string;
    isPaid: boolean;
    amount: number;
    configuration?: string;
    status: string;
    createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <Phone img={row.original.configuration?.url!} className="w-12 h-auto" />
                </div>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <>
                    {formatModelName(row.original.configuration?.model!)}
                </>
            )
        }
    },
    {
        accessorKey: "amount",
        header: "Price",
        cell: ({ row }) => {
            return (
                <>
                    {formatPrice(row.original.amount)}
                </>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <>
                    {formatStatus(row.original.status)}
                </>
            );
        },
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
        cell: ({ row }) => {
            return (
                <>
                    {row.original.isPaid ? "Yes" : "No"}
                </>
            );
        },
    },
    {
        accessorKey: "Review",
        header: "Review",
        cell: ({ row }) => {
            return (
                <div className="flex flex-col items-start text-left text-sm text-muted-foreground gap-2">
                    <p className="font-medium text-foreground normal-case">
                        {row.original.status === "fulfilled" ? `Delivered on ${new Date(row.original.createdAt).toDateString()}` : row.original.status === "shipped" ? `Shipped on ${new Date(row.original.createdAt).toDateString()}` : row.original.status === "awaiting_shipment" ? `Ordered on ${new Date(row.original.createdAt).toDateString()}` : `Ordered on ${new Date(row.original.createdAt).toDateString()}`}
                    </p>
                    <p>
                        {row.original.status === "awaiting_shipment" ? "Your order is being processed" : row.original.status === "fulfilled" ? "Your order has been shipped" : row.original.status === "shipped" ? "Your order has been delivered" : "Your order is being processed"}
                    </p>
                </div>
            );
        },
    },
]