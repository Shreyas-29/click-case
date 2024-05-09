import { DesignConfig } from "@/components";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Customize Design",
};

interface Props {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}

const DesignPage = async ({ searchParams }: Props) => {

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

    const { url, width, height } = configuration;

    return (
        <DesignConfig
            configId={configuration.id}
            url={url}
            dimensions={{
                width,
                height,
            }}
        />
    )
};

export default DesignPage
