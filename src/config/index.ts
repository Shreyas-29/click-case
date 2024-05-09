import { Metadata } from "next";

export const PRODUCT_PRICES = {
    material: {
        sillicone: 0,
        polycarbonate: 6_00,
    },
    finish: {
        smooth: 0,
        textured: 4_00,
    },
} as const;

export const BASE_PRICE = 12_00;

export const SITE_CONFIG: Metadata = {
    title: {
        default: "SnakeCase - make your own phone case",
        template: `%s | SnakeCase`,
    },
    description: "Snakecase is a custom phone case maker that allows you to create your own phone case with your own design.",
    icons: {
        icon: [
            {
                url: "/favicon.ico",
                href: "/favicon.ico",
            }
        ],
    },
    openGraph: {
        title: "SnakeCase - make your own phone case",
        description: "Snakecase is a custom phone case maker that allows you to create your own phone case with your own design.",
        images: [
            {
                url: "/og-image.png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        creator: "@shreyassihasane",
        title: "SnakeCase - make your own phone case",
        description: "Snakecase is a custom phone case maker that allows you to create your own phone case with your own design.",
        images: [
            {
                url: "/og-image.png",
            },
        ],
    },
    metadataBase: new URL("https://snakecase.vercel.app"),
};
