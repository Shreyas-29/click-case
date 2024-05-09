"use client";

import { OrderStatus } from "@prisma/client";
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/DropdownMenu";
import { Button } from "./ui/Button";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { updateOrderStatus } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
    id: string;
    orderStatus: OrderStatus;
}

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
    shipped: "Shipped",
    fulfilled: "Fulfilled",
    awaiting_shipment: "Awaiting Shipment",
};

const StatusDropdown = ({ id, orderStatus }: Props) => {

    const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationKey: ["change-order-status"],
        mutationFn: updateOrderStatus,
        onSuccess: () => {
            router.refresh();
            toast.success("Order status updated!");
        },
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="w-52 flex justify-between items-center">
                    {LABEL_MAP[orderStatus]}
                    <ChevronsUpDown className="w-4 h-4 ml-2 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {Object.keys(OrderStatus).map((status) => (
                    <DropdownMenuItem
                        key={status}
                        onClick={() => mutate({ id, newStatus: status as OrderStatus })}
                        className={cn(
                            "cursor-pointer w-48", { "bg-foreground/10": orderStatus === status }
                        )}
                    >
                        {isPending ? (
                            <Loader2
                                className={cn(
                                    "w-4 h-4 animate-spin",
                                    orderStatus === status ? "opacity-100" : "opacity-0"
                                )}
                            />
                        ) : (
                            <Check
                                className={cn(
                                    "w-4 h-4 mr-2 text-primary",
                                    orderStatus === status ? "opacity-100" : "opacity-0"
                                )}
                            />
                        )}
                        {LABEL_MAP[status as keyof typeof OrderStatus]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default StatusDropdown
