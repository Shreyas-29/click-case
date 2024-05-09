import { ThankYou } from "@/components";
import React, { Suspense } from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thank You",
};

const ThankYouPage = () => {
    return (
        <Suspense>
            <ThankYou />
        </Suspense>
    )
};

export default ThankYouPage
