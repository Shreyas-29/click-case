"use client";

import { ExtendedOrder } from "@/types/order";
import React from 'react'
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Search } from "lucide-react";
import { DataTable } from "../ui/DataTable";
import { columns } from "./OrderColumn";

interface Props {
    orders: ExtendedOrder[];
}

const Orders = ({ orders }: Props) => {
    return (
        <div className="flex flex-col items-start w-full">
            <DataTable
                searchKey="name"
                // @ts-ignore
                columns={columns}
                data={orders!}
            />
        </div>
    )
};

export default Orders
