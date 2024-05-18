import { DesignPreview } from "@/components";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Review & Confirm",
};

interface Props {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}

const PreviewPage = async ({ searchParams }: Props) => {

    const { id } = searchParams;

    if (!id || typeof id !== "string") {
        return notFound();
    };

    const configuration = await db.configuration.findUnique({
        where: {
            id,
        },
    });

    if (!configuration) {
        return notFound();
    };

    return (
        <DesignPreview configuration={configuration} />
    );
};

export default PreviewPage
