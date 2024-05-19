"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Props {
    configuration: any;
}

const OrderCell = ({ configuration }: Props) => {

    const params = useParams();

    const router = useRouter();

    return (
        <div className="relative w-full">
            anything
        </div>
    )
}

export default OrderCell
