"use client";

import { getAuthStatus } from "@/actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'

const AuthCallBackPage = () => {

    const router = useRouter();

    const [configId, setConfigId] = useState<string | null>(null);

    useEffect(() => {
        const configurationId = localStorage.getItem("configurationId");
        if (configurationId) setConfigId(configurationId);
    }, []);

    const { data } = useQuery({
        queryKey: ["auth-callback"],
        queryFn: async () => await getAuthStatus(),
        retry: true,
        retryDelay: 500,
    });

    console.log("configId", configId);

    if (data?.success) {
        if (configId) {
            localStorage.removeItem("configurationId");
            router.push(`/configure/preview?id=${configId}`);
        } else {
            router.push("/");
        }
    };

    return (
        <div className="w-full mt-48 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                <h3 className="text-xl font-semibold">
                    Logging you in...
                </h3>
                <p>
                    You will be redirected shortly.
                </p>
            </div>
        </div>
    )
};

export default AuthCallBackPage
