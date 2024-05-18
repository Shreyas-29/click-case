"use client";

import { getPaymentStatus } from "@/actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from 'react'
import PhonePreview from "./PhonePreview";
import { formatPrice } from "@/lib/utils";
import { ExtendedOrder } from "@/types/order";
import generateInvoicePDF from "@/lib/generate-invoice-pdf";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { Button } from "./ui/Button";
import { Download } from "lucide-react";

interface Props {
    order: ExtendedOrder | null;
}

const ThankYou = ({ order }: Props) => {

    const searchParams = useSearchParams();

    const orderId = searchParams.get("orderId") || "";

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { data } = useQuery({
        queryKey: ["get-payment-status"],
        queryFn: async () => await getPaymentStatus(orderId),
        retry: true,
        retryDelay: 500,
    });

    // loading
    if (data === undefined) {
        return (
            <div className="flex justify-center w-full mt-48">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    <h3 className="font-semibold text-xl">
                        Loading your order...
                    </h3>
                    <p className="text-foreground">
                        Please wait a moment.
                    </p>
                </div>
            </div>
        )
    };

    // not yet paid
    if (data === false) {
        return (
            <div className="flex justify-center w-full mt-48">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    <h3 className="font-semibold text-xl">
                        Verifying your order...
                    </h3>
                    <p className="text-foreground">
                        This may take a moment.
                    </p>
                </div>
            </div>
        )
    };

    const { configuration, billingAddress, shippingAddress, amount } = data;

    const { color, croppedImageUrl } = configuration;

    const shipping_amount = 0;

    const handleDownloadInvoice = async () => {
        setIsLoading(true);

        try {
            const pdfBlob = await generateInvoicePDF(order!);

            saveAs(pdfBlob, `invoice_${orderId}.pdf`);

            toast.success("Invoice PDF generated successfully.");
        } catch (error) {
            console.log("Error generating invoice PDF", error);
            toast.error("An error occurred while generating the invoice. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background">
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="max-w-xl">
                    <span className="text-base font-medium text-primary">
                        Thank you for your purchase!
                    </span>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                        Your order is confirmed.
                    </h1>
                    <p className="text-base text-muted-foreground mt-2">
                        Your order has been successfully placed and is now being processed. You will receive an email confirmation shortly.
                    </p>

                    <div className="mt-12 text-sm font-medium">
                        <p className="text-foreground">
                            Order number
                        </p>
                        <p className="mt-2 text-muted-foreground">
                            {orderId}
                        </p>
                    </div>
                </div>

                <div className="mt-10 border-t border-border">
                    <div className="mt-10 flex flex-auto flex-col">
                        <h4 className="font-semibold">
                            You made a great choice!
                        </h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Thank you for your order! We're thrilled that you've joined the ClickCase family. Your new phone case is on its way and we can't wait for you to enjoy it. Don't forget, we stand behind our products with a 5-year print guarantee. If you're not completely satisfied, we'll replace it for free.
                        </p>
                    </div>
                </div>

                <div className="flex space-x-6 overflow-hidden mt-8 rounded-xl bg-foreground/10 ring-1 ring-inset ring-foreground/10 lg:rounded-2xl">
                    <PhonePreview croppedImageUrl={croppedImageUrl!} color={color!} />
                </div>

                <div>
                    <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                        <div>
                            <p className="font-medium">
                                Shipping address
                            </p>
                            <div className="mt-2 text-foreground/80">
                                <address className="not-italic">
                                    <span className="block">
                                        {shippingAddress?.name}
                                    </span>
                                    <span className="block">
                                        {shippingAddress?.street}
                                    </span>
                                    <span className="block">
                                        {shippingAddress?.postalCode}, {shippingAddress?.city}
                                    </span>
                                </address>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">
                                Billing address
                            </p>
                            <div className="mt-2 text-foreground/80">
                                <address className="not-italic">
                                    <span className="block">
                                        {billingAddress?.name}
                                    </span>
                                    <span className="block">
                                        {billingAddress?.street}
                                    </span>
                                    <span className="block">
                                        {billingAddress?.postalCode}, {billingAddress?.city}
                                    </span>
                                </address>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 border-t border-border py-10 text-sm">
                        <div>
                            <p className="font-medium">
                                Payment status
                            </p>
                            <p className="mt-2 text-foreground/80">
                                Paid
                            </p>
                        </div>
                        <div>
                            <p className="font-medium">
                                Shipping Method
                            </p>
                            <p className="mt-2 text-foreground/80">
                                DHL, takes 2-3 days
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 border-t border-border text-sm pt-10">
                    <div className="flex justify-between">
                        <p className="font-medium">
                            Subtotal
                        </p>
                        <p className="font-foreground/80">
                            {formatPrice(amount)}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">
                            Shipping
                        </p>
                        <p className="font-foreground/80">
                            {formatPrice(shipping_amount)}
                        </p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">
                            Total
                        </p>
                        <p className="font-foreground/80">
                            {formatPrice(amount)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end w-full pt-10">
                    <Button
                        variant="secondary"
                        disabled={isLoading}
                        onClick={handleDownloadInvoice}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download Invoice
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ThankYou
