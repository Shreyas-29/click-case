"use client";

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import Image from "next/image";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { buttonVariants } from "./ui/Button";
import { Icons } from "./Icons";

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const AuthModal = ({ isOpen, setIsOpen }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="z-[999999] max-w-sm">
                <DialogHeader className="sm:text-center">
                    <div className="relative mx-auto w-24 h-24 mb-2">
                        <Icons.man4 className="w-full h-full" />
                    </div>
                    <DialogTitle className="font-bold">
                        Login to continue
                    </DialogTitle>
                    <DialogDescription className="text-foreground">
                        <span className="font-medium">Your configuration was saved!{" "}</span>Please login or sign up to complete your order.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6 divide-x divide-border">
                    <LoginLink className={buttonVariants({ variant: "outline" })}>
                        Login
                    </LoginLink>
                    <LoginLink className={buttonVariants({ variant: "default" })}>
                        Sign up
                    </LoginLink>
                </div>
            </DialogContent>
        </Dialog>
    )
};

export default AuthModal
