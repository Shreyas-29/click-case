import { Steps, Wrapper } from "@/components";
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upload Image",
};

interface Props {
    children: React.ReactNode;
}

const UploadLayout = ({ children }: Props) => {
    return (
        <>
            {children}
        </>
    )
};

export default UploadLayout
