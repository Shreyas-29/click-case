// bg-foreground border-foreground
// bg-blue2 border-blue2
// bg-rose2 border-rose2
// bg-green2 border-green2
// bg-orange2 border-orange2
// bg-red2 border-red2
// bg-yellow2 border-yellow2
// bg-purple2 border-purple2
// bg-white2 border-white2
// bg-pink2 border-pink2
// bg-brown2 border-brown2
// bg-gray2 border-gray2
// bg-emerald2 border-emerald2
// bg-skin2 border-skin2
// bg-lime2 border-lime2
// bg-sky2 border-sky2
// bg-transparent2 border-transparent2

import { PRODUCT_PRICES } from "@/config";

export const COLORS = [
    {
        label: "Black",
        value: "black",
        color: "foreground"
    },
    {
        label: "Blue",
        value: "blue",
        color: "blue2"
    },
    {
        label: "Rose",
        value: "rose",
        color: "rose2"
    },
    {
        label: "Green",
        value: "green",
        color: "green2"
    },
    {
        label: "Orange",
        value: "orange",
        color: "orange2"
    },
    {
        label: "Red",
        value: "red",
        color: "red2"
    },
    {
        label: "Yellow",
        value: "yellow",
        color: "yellow2"
    },
    {
        label: "Purple",
        value: "purple",
        color: "purple2"
    },
    {
        label: "Pink",
        value: "pink",
        color: "pink2"
    },
    {
        label: "Brown",
        value: "brown",
        color: "brown2"
    },
    {
        label: "Gray",
        value: "gray",
        color: "gray2"
    },
    {
        label: "Emerald",
        value: "emerald",
        color: "emerald2"
    },
    {
        label: "Skin",
        value: "skin",
        color: "skin2"
    },
    {
        label: "Lime",
        value: "lime",
        color: "lime2"
    },
    {
        label: "Sky",
        value: "sky",
        color: "sky2"
    },
    {
        label: "White",
        value: "white",
        color: "white2"
    },
    {
        label: "Transparent",
        value: "transparent",
        color: "transparent2"
    },
] as const;
// Above color comments are necessary

export const MODELS = {
    name: "models",
    iPhone: [
        {
            label: "iPhone X",
            value: "iphonex",
        },
        {
            label: "iPhone 11",
            value: "iphone11",
        },
        {
            label: "iPhone 12",
            value: "iphone12",
        },
        {
            label: "iPhone 12 mini",
            value: "iphone12_mini",
        },
        {
            label: "iPhone 12 pro",
            value: "iphone12_pro",
        },
        {
            label: "iPhone 12 pro max",
            value: "iphone12_pro_max",
        },
        {
            label: "iPhone 13",
            value: "iphone13",
        },
        {
            label: "iPhone 13 mini",
            value: "iphone13_mini",
        },
        {
            label: "iPhone 13 pro",
            value: "iphone13_pro",
        },
        {
            label: "iPhone 13 pro max",
            value: "iphone13_pro_max",
        },
        {
            label: "iPhone 14",
            value: "iphone14",
        },
        {
            label: "iPhone 14 plus",
            value: "iphone14_plus",
        },
        {
            label: "iPhone 14 pro",
            value: "iphone14_pro",
        },
        {
            label: "iPhone 14 pro max",
            value: "iphone14_pro_max",
        },
        {
            label: "iPhone 15",
            value: "iphone15",
        },
    ],
    samsung: [
        {
            label: "samsung s21",
            value: "samsung_s21"
        },
        {
            label: "samsung s21 plus",
            value: "samsung_s21_plus"
        },
        {
            label: "samsung s21 ultra",
            value: "samsung_s21_ultra"
        },
        {
            label: "samsung s22",
            value: "samsung_s22"
        },
        {
            label: "samsung s22 plus",
            value: "samsung_s22_plus"
        },
        {
            label: "samsung s22 ultra",
            value: "samsung_s22_ultra"
        },
        {
            label: "samsung s23",
            value: "samsung_s23"
        },
        {
            label: "samsung s23 plus",
            value: "samsung_s23_plus"
        },
        {
            label: "samsung s23 ultra",
            value: "samsung_s23_ultra"
        },
        {
            label: "samsung s24",
            value: "samsung_s24"
        },
        {
            label: "samsung s24 plus",
            value: "samsung_s24_plus"
        },
        {
            label: "samsung s24 ultra",
            value: "samsung_s24_ultra"
        },
    ]
} as const;

export const MATERIALS = {
    name: "material",
    options: [
        {
            label: "Sillicone",
            value: "sillicone",
            description: undefined,
            price: PRODUCT_PRICES.material.sillicone,
        },
        {
            label: "Soft Polycarbonate",
            value: "polycarbonate",
            description: "Scratch-resistant coating",
            price: PRODUCT_PRICES.material.polycarbonate,
        },
        {
            label: "Metal",
            value: "metal",
            description: "Premium metal finish",
            price: PRODUCT_PRICES.material.metal,
        },
        {
            label: "Leather",
            value: "leather",
            description: "Luxurious leather texture",
            price: PRODUCT_PRICES.material.leather,
        },
        {
            label: "Carbon Fiber",
            value: "carbon_fiber",
            description: "High-tech carbon fiber",
            price: PRODUCT_PRICES.material.carbon_fiber,
        },
    ],
} as const;

export const FINISHES = {
    name: "finish",
    options: [
        {
            label: "Smooth Finish",
            value: "smooth",
            description: undefined,
            price: PRODUCT_PRICES.finish.smooth,
        },
        {
            label: "Textured Finish",
            value: "textured",
            description: "Soft grippy texture",
            price: PRODUCT_PRICES.finish.textured,
        },
        {
            label: "Matte Finish",
            value: "matte",
            description: "Elegant matte texture",
            price: PRODUCT_PRICES.finish.matte,
        },
        {
            label: "Glossy Finish",
            value: "glossy",
            description: "Shiny glossy surface",
            price: PRODUCT_PRICES.finish.glossy,
        },
        {
            label: "Transparent Finish",
            value: "transparent",
            description: "See-through transparent",
            price: PRODUCT_PRICES.finish.transparent,
        },
        {
            label: "Frosted Finish",
            value: "frosted",
            description: "Frosted matte texture",
            price: PRODUCT_PRICES.finish.frosted,
        },
        {
            label: "Brushed Finish",
            value: "brushed",
            description: "Brushed metal texture",
            price: PRODUCT_PRICES.finish.brushed,
        },
    ],
} as const;
