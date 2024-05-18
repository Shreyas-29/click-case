import { Metadata } from "next";

export const PRODUCT_PRICES = {
    material: {
        sillicone: 0,
        metal: 100,
        leather: 100,
        carbon_fiber: 150,
        polycarbonate: 50,
    },
    finish: {
        smooth: 0,
        textured: 50,
        matte: 100,
        glossy: 50,
        transparent: 75,
        frosted: 100,
        brushed: 100,
    },
} as const;

export const BASE_PRICE = 12_00;

export const SITE_CONFIG: Metadata = {
    title: {
        default: "ClickCase | Your Custom Phone Case Maker",
        template: `%s | ClickCase`,
    },
    description: "ClickCase is a custom phone case maker that allows you to create your own phone case with your own design.",
    icons: {
        icon: [
            {
                url: "/favicon.ico",
                href: "/favicon.ico",
            }
        ],
    },
    openGraph: {
        title: "ClickCase | Your Custom Phone Case Maker",
        description: "ClickCase is a custom phone case maker that allows you to create your own phone case with your own design.",
        images: [
            {
                url: "/og-image.png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        creator: "@shreyassihasane",
        title: "ClickCase - make your own phone case",
        description: "ClickCase is a custom phone case maker that allows you to create your own phone case with your own design.",
        images: [
            {
                url: "/og-image.png",
            },
        ],
    },
    metadataBase: new URL("https://clickcase.vercel.app"),
};
