// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";
// import { z } from "zod";
// import sharp from "sharp";
// import { db } from "@/lib/db";

// const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" });

// export const ourFileRouter = {
//     imageUploader: f({ image: { maxFileSize: "4MB" } })
//         .input(z.object({ configId: z.string().optional() }))
//         .middleware(async ({ input }) => {
//             return { input };
//         })
//         .onUploadComplete(async ({ metadata, file }) => {
//             const { configId } = metadata.input;

//             const res = await fetch(file.url);
//             const buffer = await res.arrayBuffer();

//             const imgMetadata = await sharp(buffer).metadata();
//             const { width, height } = imgMetadata;

//             if (!configId) {
//                 const configuration = await db.configuration.create({
//                     data: {
//                         url: file.url,
//                         width: width || 500,
//                         height: height || 500,
//                     }
//                 });

//                 return { configId: configuration.id };
//             } else {
//                 const updatedConfiguration = await db.configuration.update({
//                     where: {
//                         id: configId,
//                     },
//                     data: {
//                         croppedImageUrl: file.url,
//                     },
//                 });

//                 return { configId: updatedConfiguration.id };
//             }
//         }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { z } from 'zod'
import sharp from 'sharp'
import { db } from "@/lib/db"

const f = createUploadthing()

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: '4MB' } })
        .input(z.object({ configId: z.string().optional() }))
        .middleware(async ({ input }) => {
            return { input }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const { configId } = metadata.input

            const res = await fetch(file.url)
            const buffer = await res.arrayBuffer()
            console.log("buffer", buffer);

            const imgMetadata = await sharp(buffer).metadata();
            console.log("imgMetadata", imgMetadata);
            const { width, height } = imgMetadata

            if (!configId) {
                const configuration = await db.configuration.create({
                    data: {
                        url: file.url,
                        height: height ?? 650,
                        width: width ?? 500,
                    },
                })

                return { configId: configuration.id }
            } else {
                const updatedConfiguration = await db.configuration.update({
                    where: {
                        id: configId,
                    },
                    data: {
                        croppedImageUrl: file.url,
                    },
                })

                return { configId: updatedConfiguration.id }
            }
        }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter