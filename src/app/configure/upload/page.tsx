"use client";

import { Progress } from "@/components/ui/Progress";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { CloudUpload, ImageIcon, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { toast } from "sonner"

const UploadPage = () => {

    // const isUploading = false;

    const router = useRouter();

    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const [isPending, startTransition] = useTransition();

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configId
            startTransition(() => {
                router.push(`/configure/design?id=${configId}`)
            });
        },
        onUploadProgress(p) {
            setUploadProgress(p);
        },
    });

    const onDropAccepted = (acceptedFiles: File[]) => {
        startUpload(acceptedFiles, { configId: undefined });

        setIsDragOver(false);
    };

    const onDropRejected = (rejectedFiles: FileRejection[]) => {
        const [file] = rejectedFiles;

        setIsDragOver(false);

        toast.error("File type is not supported.", {
            description: "Please choose a PNG, JPG, or JPEG image instead."
        });
    };

    return (
        <div className={cn(
            "bg-foreground/5 p-2 border border-foreground/30 flex-1 h-full relative my-16 rounded-xl flex lg:rounded-2xl justify-center flex-col items-center border-dashed",
            isDragOver && "border-primary/25 bg-primary/10",
            (isUploading || isPending) && "cursor-auto"
        )}>
            <div className="relative flex flex-col items-center justify-center flex-1 w-full">
                <Dropzone
                    disabled={isUploading || isPending}
                    onDropRejected={onDropRejected}
                    onDropAccepted={onDropAccepted}
                    accept={{
                        "image/png": [".png"],
                        "image/jpeg": [".jpeg"],
                        "image/jpg": [".jpg"],
                    }}
                    onDragEnter={() => setIsDragOver(true)}
                    onDragLeave={() => setIsDragOver(false)}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            {...getRootProps()}
                            className="h-full w-full flex-1 flex flex-col items-center justify-center select-none cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            {isDragOver ? (
                                <MousePointerSquareDashed className="w-6 h-6 mb-2 text-muted-foreground" />
                            ) : isUploading || isPending ? (
                                <Loader2 className="w-6 h-6 mb-2 text-muted-foreground animate-spin" />
                            ) : (
                                <CloudUpload className="w-6 h-6 mb-2 text-muted-foreground" />
                            )}
                            <div className="flex flex-col mb-2 text-sm text-foreground/80">
                                {isUploading ? (
                                    <div className="flex flex-col items-center">
                                        <p className="">Uploading...</p>
                                        <Progress value={uploadProgress} className="mt-2 w-40 h-1.5 bg-slate-300" />
                                    </div>
                                ) : isPending ? (
                                    <div className="flex flex-col items-center">
                                        <p className="">Redirecting, please wait...</p>
                                    </div>
                                ) : isDragOver ? (
                                    <p>
                                        <span className="font-semibold">Drop file</span>
                                        {" "} to upload
                                    </p>
                                ) : (
                                    <p>
                                        <span className="font-semibold">Click to upload</span>
                                        {" "} or drag and drop
                                    </p>
                                )}
                            </div>

                            {isPending ? null : (
                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG, JPEG
                                </p>
                            )}
                        </div>
                    )}
                </Dropzone>
            </div>
        </div>
    )
};

export default UploadPage
