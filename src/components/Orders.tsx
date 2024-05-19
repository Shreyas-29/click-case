"use client";

import { ExtendedOrder } from "@/types/order";
import React from 'react'
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Search } from "lucide-react";

interface Props {
    orders: ExtendedOrder[];
}

const Orders = ({ orders }: Props) => {
    return (
        <div className="flex flex-col items-start w-full pt-20">
            {/* searchbox */}
            <div className="relative w-full flex items-center bg-white border border-border rounded-lg px-4 focus:ring-0 focus:ring- focus:border-">
                <Search className="w-5 h-5 absolute top-2.5 left-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search your orders here..."
                    className="w-full pl-8 focus-visible:outline-none focus-visible:ring-0 border-none focus-visible:border-none outline-none ring-0 focus-visible:ring-transparent"
                />
            </div>

            {/* orders table */}
        </div>
    )
};

export default Orders
