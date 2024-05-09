import { LoaderIcon } from "lucide-react";
import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen absolute inset-0 z-[99999999] bg-background">
            <LoaderIcon className="w-6 h-6 animate-spin" />
        </div>
    )
};

export default Loader
