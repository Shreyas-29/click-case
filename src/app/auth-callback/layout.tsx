import { Steps, Wrapper } from "@/components";
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Redirecting...",
};

interface Props {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
    return (
        <>
            {children}
        </>
    )
};

export default AuthLayout
